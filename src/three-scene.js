import {fbm, staticTerrain, updateTerrain, waveStaticTerrain} from "./PerspectiveMesh.js";

// TODO: Fallback if performance not enough.
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 200);
const canvas = document.getElementById('canvas');
let renderer;
try {
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        powerPreference: 'default',       // don't demand high-performance GPU
        failIfMajorPerformanceCaveat: false, // allow software rendering
        alpha: true,
    });
} catch (e) {
    // Fallback: show a static CSS gradient background instead
    document.getElementById('bottom').classList.remove('bg-black/75');
    document.getElementById('bottom').classList.add('bg-transparnet');
    console.warn('WebGL not available, using CSS fallback');
    // Stop execution of the rest of the Three.js code
    throw new Error('WebGL unavailable');
}

const clock = new THREE.Clock();
let time = 0;
let mouseX = 0;
let mouseY = 0;
let targetCamX = 0;
let targetCamY = 8;
let rotationDir = 1;

// Hover state
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isHovered = false;
let hoverPoint = new THREE.Vector3(); // intersection in local space
const HOVER_RADIUS = 3;
const HOVER_LIFT = 1.2;

// Rotation speed in radians per second
const ROTATION_SPEED = 0.04;

const segW = 25;
const segH = 25;

const planeGeo = new THREE.PlaneGeometry(15, 15, segW, segH);
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xef4444, //##006400
    wireframe: true,
    opacity: 1,
    side: THREE.DoubleSide,
});
const terrain = new THREE.Mesh(planeGeo, wireMat);
const posAttr = planeGeo.attributes.position;
const vertexCount = posAttr.count;

const bgGeo = new THREE.PlaneGeometry(120, 80, 80, 80);
const bgPos = bgGeo.attributes.position;
const bgMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.06,
});
const bgMesh = new THREE.Mesh(bgGeo, bgMat);


function setupThreeJs() {
    //scene.background = new THREE.Color(0x18181b); // Needs to match Page zinc-900
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.035);

    camera.position.set(0, 33, 22);
    camera.lookAt(0, 0, 0);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    terrain.position.y = -3;

    scene.add(terrain);
    scene.add(bgMesh);

    bgMesh.position.set(0, 12, -40);
    planeGeo.rotateX(1.5);

    for (let i = 0; i < bgPos.count; i++) {
        const x = bgPos.getX(i);
        const z = bgPos.getZ(i);
        const y = fbm(x * 0.04 + 10, z * 0.04 + 10, 4) * 6;
        bgPos.setY(i, y);
    }

    staticTerrain(vertexCount, posAttr, 7.5, segW, segH)

    // Large bounding sphere so raycaster broad-phase never rejects
    // (vertices shift every frame, stale auto-computed sphere misses hits)
    planeGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 50);
}

function render() {
    requestAnimationFrame(render);
    const delta = Math.min(clock.getDelta(), 0.1);
    time += delta;

    //updateTerrain(vertexCount, posAttr, time);

    // Hover raycast
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(terrain);
    isHovered = intersects.length > 0;

    if (isHovered) {
        // Convert world-space hit to local mesh space
        hoverPoint.copy(intersects[0].point);
        terrain.worldToLocal(hoverPoint);
    }

    waveStaticTerrain(vertexCount, posAttr, time, delta, isHovered ? hoverPoint : null, HOVER_RADIUS, HOVER_LIFT);
    if (terrain.rotation.y >= 1.4 || terrain.rotation.y <= -0.1) {
        rotationDir *= -1;
    }

    terrain.rotation.y += ROTATION_SPEED * delta * rotationDir;

    // Smooth camera follow
    //targetCamX = mouseX * 6;
    //targetCamY = 8 - mouseY * 3;
    camera.position.x += (targetCamX - camera.position.x) * 0.03;
    camera.position.y += (targetCamY - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

setupThreeJs();
render();
