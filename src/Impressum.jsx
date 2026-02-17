import { useTranslation } from 'react-i18next'

export default function Impressum() {
    const { t, i18n } = useTranslation()

    const toggleLanguage = () => {
        const next = i18n.language === 'de' ? 'en' : 'de'
        i18n.changeLanguage(next)
        localStorage.setItem('lang', next)
    }

    return (
        <div className="min-h-screen flex flex-col">
            <button
                onClick={toggleLanguage}
                className="fixed top-4 right-4 z-50 px-3 py-1 rounded border border-zinc-700 text-sm hover:bg-red-500 duration-300"
            >
                {i18n.language === 'de' ? 'EN' : 'DE'}
            </button>

            <div className="flex-1 max-w-3xl mx-auto px-6 py-16">
                <a href="/" className="text-red-500 hover:underline text-sm">&larr; {t('impressum.back')}</a>

                <h1 className="text-3xl font-bold mt-6 mb-8">{t('impressum.title')}</h1>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-red-500 mb-2">{t('impressum.infoTitle')}</h2>
                    <p>Marvin Mergili</p>
                    <p>{t('impressum.address')}</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-red-500 mb-2">{t('impressum.contactTitle')}</h2>
                    <p>E-Mail: {t('impressum.email')}</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-red-500 mb-2">{t('impressum.disclaimerTitle')}</h2>
                    <p className="text-zinc-400">{t('impressum.disclaimerText')}</p>
                </section>
            </div>

            <footer className="bg-black/75 w-full py-6 text-center text-sm text-zinc-400">
                <a href="/" className="hover:text-red-500 duration-300">&larr; {t('impressum.back')}</a>
            </footer>
        </div>
    )
}
