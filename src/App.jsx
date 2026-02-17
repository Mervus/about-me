import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * @param {number}start
 */
function calculateAgeDiff(start) {
    const difMs = Date.now() - start
    const rDate = new Date(difMs)
    return Math.abs(rDate.getUTCFullYear() - 1970)
}

function getAgeInYears() {
    return calculateAgeDiff(Date.parse("2006-03-27"))
}

export default function App() {
    const _age = getAgeInYears()
    const { t, i18n } = useTranslation()

    const toggleLanguage = () => {
        const next = i18n.language === 'de' ? 'en' : 'de'
        i18n.changeLanguage(next)
        localStorage.setItem('lang', next)
    }

    useEffect(() => {
        window.hljs?.highlightAll()
        import('./three-scene.js')
    }, [])

    return (
        <>
            <button
                onClick={toggleLanguage}
                className="fixed top-4 right-4 z-50 px-3 py-1 rounded border border-zinc-700 text-sm hover:bg-red-500 duration-300"
            >
                {i18n.language === 'de' ? 'EN' : 'DE'}
            </button>

            <div className="w-full flex flex-row justify-between">
                <div className="flex flex-col p-15 xl:p-25">
                    <div className="flex flex-col w-fit p-4">
                        <div><span className="text-red-500">{t('hero.titleHighlight')}</span>{t('hero.titleRest')}</div>
                        <div className="text-3xl">Marvin Mergili <span className="text-sm">{!isNaN(_age) ? _age : "2006"}</span></div>
                        <div className={"md:w-1/2"}>{t('hero.description')}</div>
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
                <div className="flex flex-col md:w-1/2 p-15 xl:p-25">
                    <div className="flex flex-col p-4 text-end">
                        <div>{t('aboutMe.labelStart')}<span className="text-red-500">{t('aboutMe.labelHighlight')}</span></div>
                        <div>
                            <div className="p-2 pr-0">{t('aboutMe.info1')} <br /> {t('aboutMe.info2')} <br /> </div>
                            <div className="p-2 pr-0">{t('aboutMe.job1')} <br /> <span>{t('aboutMe.job1Role')}</span>, {t('aboutMe.job1Company')} </div>
                            <div className="p-2 pr-0">{t('aboutMe.job2')} <br /> <span>{t('aboutMe.job2Role')}</span>, {t('aboutMe.job2Company')} </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Spacer */}
            <div className="h-20"></div>
            <div className="bg-black/75 w-full flex flex-col items-center">
                <div className="mb-8 mt-5 text-2xl">{t('apis.title')}</div>
                <p className="text-zinc-400 max-w-2xl text-center px-4 mb-10">
                    {t('apis.description')}
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
                    {t('frameworks.title')}
                </div>
                <p className="text-zinc-400 max-w-2xl text-center px-4 mb-10">
                    {t('frameworks.description')}
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

            <footer className="bg-black/75 w-full py-6 text-center text-sm text-zinc-400">
                <a href="/impressum/" className="hover:text-red-500 duration-300">Impressum</a>
            </footer>

            <canvas id="canvas"></canvas>
        </>
    )
}
