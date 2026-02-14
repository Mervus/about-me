import { useEffect } from 'react'

function calculateAge() {
    const bDate = Date.parse("2006-03-27")
    const ageDifMs = Date.now() - bDate
    const ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export default function App() {
    const age = calculateAge()

    useEffect(() => {
        window.hljs?.highlightAll()
        import('./three-scene.js')
    }, [])

    return (
        <>
            <div className="w-full flex flex-row justify-between">
                <div className="flex flex-col p-15 xl:p-25">
                    <div className="flex flex-col w-fit p-4">
                        <div><span className="text-red-500">Anwendungs</span>entwickler</div>
                        <div className="text-3xl">Marvin Mergili <span className="text-sm">{!isNaN(age) ? age : "2006"}</span></div>
                        <div>Fachinformatiker für Anwendungsentwicklung mit Erfahrung in <br /> Full-Stack-Entwicklung, API-Integration und Cloud-Lösungen.</div>
                    </div>
                    <div className="mt-6 ml-4">
                        <a href="https://github.com/Mervus" className="w-fit p-2 rounded border border-zinc-800 flex space-x-1.5 duration-300 ease-in-out hover:-translate-y-1 hover:bg-red-500">
                            <img className="w-6" src="./assets/github-mark-white.svg" />
                            <div>Github</div>
                        </a>
                    </div>
                </div>
                {/* Needs to be formatted badly to work correctly. */}
                <div className="!hidden invisible sm:hidden md:block md:visible sm:p-0 xl:pl-45 xl:p-25 pt-10"><pre><code className="language-cpp">{`void main()
{
    Terrain* terrain = Terrain::CreateTerrain();
    terrain->load();
}`}</code></pre>
                </div>
            </div>
            <div className="w-full flex flex-row justify-end">
                <div className="flex flex-col p-15 xl:p-25">
                    <div className="flex flex-col w-fit p-4 text-end">
                        <div>Berufs<span className="text-red-500">erfahrung</span></div>
                        <div className="space-y-1.5">
                            <div className="p-2 pr-0">Jan 2025 - Jan 2026 <br /> <span>Anwendungsentwickler</span>, OMTEC Vertriebs GmbH <br /> </div>
                            <div className="p-2 pr-0">Aug 2021 - Jan 2025 <br /> Ausbildung zum <span>Fachinformatiker</span>, OMTEC Vertriebs GmbH </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Spacer */}
            <div className="h-20"></div>
            <div className="bg-black/75 w-full flex flex-col items-center">
                <div className="mb-8 mt-5 text-2xl">APIs</div>
                <p className="text-zinc-400 max-w-2xl text-center px-4 mb-10">
                    Erfahrung mit der Integration verschiedener APIs mittels OAuth2-Authentifizierung in Laravel-Anwendungen.
                </p>
                <div className="flex md:flex-row flex-col items-start">
                    <pre>
                        <code className="language-cpp">{`class GoogleAds;
class eBay;
class Shopware;
class OpenAi;
class DHL;
class UPS;`}</code>
                    </pre>
                </div>
            </div>

            <div id="bottom" className="bg-black/75 bottom-0 w-full flex flex-col items-center pb-16">
                <div className="mt-20 mb-8 text-2xl">
                    Frameworks
                </div>
                <p className="text-zinc-400 max-w-2xl text-center px-4 mb-10">
                    Erfahrung mit verschiedenen Frameworks
                </p>
                <div>
                    <div className="flex flex-wrap gap-5">
                        <div className="group text-center">
                            <span className="invisible group-hover:visible group-hover:ease-in group-hover:duration-300">Laravel</span>
                            <a href="https://laravel.com/">
                                <img className="w-24 filter" src="https://cdn.worldvectorlogo.com/logos/laravel-2.svg" alt="" />
                            </a>
                        </div>
                        <div className="group text-center">
                            <span className="invisible group-hover:visible group-hover:ease-in group-hover:duration-300">ReactJs</span>
                            <a href="https://react.dev/" className="items-center">
                                <img className="w-24 filter" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" />
                            </a>
                        </div>
                        <div className="group text-center">
                            <span className="invisible group-hover:visible group-hover:ease-in group-hover:duration-300">TailwindCSS</span>
                            <a href="https://tailwindcss.com/" className="items-center">
                                <img className="w-24 filter" src="./assets/tailwindcss.svg" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <canvas id="canvas"></canvas>
        </>
    )
}
