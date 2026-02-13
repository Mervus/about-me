export function hash(x, y) {
    let n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return n - Math.floor(n);
}

export function smoothNoise(x, y) {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    // Smoothstep
    const ux = fx * fx * (3 - 2 * fx);
    const uy = fy * fy * (3 - 2 * fy);

    const a = hash(ix, iy);
    const b = hash(ix + 1, iy);
    const c = hash(ix, iy + 1);
    const d = hash(ix + 1, iy + 1);

    return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

export function fbm(x, y, octaves) {
    let val = 0;
    let amp = 1;
    let freq = 1;
    let max = 0;
    for (let i = 0; i < octaves; i++) {
        val += smoothNoise(x * freq, y * freq) * amp;
        max += amp;
        amp *= 0.5;
        freq *= 2.0;
    }
    return val / max;
}

// Store base heights for wave animation
let baseHeights = [];
let hoverDisplacements = [];
let edgeFades = [];

export function staticTerrain(vertexCount, posAttr, gridSize = 7.5, segW = 25, segH = 25) {
    const hillCenterX = gridSize * 0.6;  // Top right
    const hillCenterZ = -gridSize * 0.6;
    const hillRadius = 5;
    const hillHeight = 3.5;

    baseHeights = [];
    hoverDisplacements = new Array(vertexCount).fill(0);

    // Precompute edge fade: 0 at edges, 1 toward center
    const edgeMargin = 3; // how many cells from edge to fully fade in
    edgeFades = [];
    for (let i = 0; i < vertexCount; i++) {
        const col = i % (segW + 1);
        const row = Math.floor(i / (segW + 1));
        const fromEdge = Math.min(col, segW - col, row, segH - row);
        edgeFades.push(Math.min(1, fromEdge / edgeMargin));
    }

    for (let i = 0; i < vertexCount; i++) {
        const x = posAttr.getX(i);
        const z = posAttr.getZ(i);

        // Base terrain noise - subtle variation across flat areas
        const baseNoise = fbm(x * 0.15, z * 0.15, 3) * 0.4;

        // Small ripples for texture
        const ripple = Math.sin(x * 0.8) * Math.sin(z * 0.8) * 0.15;

        // Distance from hill center
        const dx = x - hillCenterX;
        const dz = z - hillCenterZ;
        const dist = Math.sqrt(dx * dx + dz * dz);

        // Hill with noise detail
        let hill = 0;
        if (dist < hillRadius) {
            // Smoother ease-in using smoothstep curve
            const t = 1 - dist / hillRadius;
            const falloff = t * t * t * (t * (t * 6 - 15) + 10); // Smootherstep
            // Add noise that's stronger near the peak
            const hillNoise = fbm(x * 0.3 + 10, z * 0.3 + 10, 4) * falloff * 1.2;
            // Ridges on the hill
            const ridges = Math.abs(Math.sin(x * 0.5 + z * 0.3)) * falloff * 0.6;
            hill = falloff * hillHeight + hillNoise + ridges;
        }

        const y = baseNoise + ripple + hill;
        baseHeights.push(y);
        posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
}

export function waveStaticTerrain(vertexCount, posAttr, time, delta, hoverPoint, hoverRadius, hoverLift) {
    const lerpSpeed = 4 * delta;

    for (let i = 0; i < vertexCount; i++) {
        const x = posAttr.getX(i);
        const z = posAttr.getZ(i);

        // Gentle wave on top of static terrain
        const wave = Math.sin(x * 0.3 + time * 0.5) * Math.cos(z * 0.2 + time * 0.3) * 0.25;

        // Target hover displacement for this vertex
        let target = 0;
        if (hoverPoint) {
            const dx = x - hoverPoint.x;
            const dz = z - hoverPoint.z;
            const dist = Math.sqrt(dx * dx + dz * dz);
            if (dist < hoverRadius) {
                const t = 1 - dist / hoverRadius;
                target = t * t * (3 - 2 * t) * hoverLift;
            }
        }

        // Smooth lerp toward target, scaled by edge fade
        target *= edgeFades[i];
        hoverDisplacements[i] += (target - hoverDisplacements[i]) * lerpSpeed;

        posAttr.setY(i, baseHeights[i] + wave + hoverDisplacements[i]);
    }
    posAttr.needsUpdate = true;
}

export function updateTerrain(vertexCount, posAttr, time) {
    for (let i = 0; i < vertexCount; i++) {
        const x = posAttr.getX(i);
        const z = posAttr.getZ(i);

        // Distance from center - corners are further away
        const distFromCenter = Math.sqrt(x * x + z * z);

        // Wave 1: flat uniform wave across X
        const wave1 = Math.sin(x * 0.2 + time) * 0.5;

        // Wave 2: radial wave - corners lag behind center
        // Phase offset by distance creates the delay effect
        const wave2 = Math.sin(time * 0.8 - (distFromCenter / 1.8) * 0.25) * 2;

        // Combine waves
        const y = wave1 + wave2;

        posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
}

