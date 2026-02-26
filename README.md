# Portfolio - Marvin Mergili

A personal portfolio website showcasing my background as an Application Developer (Fachinformatiker für Anwendungsentwicklung). Built with React, Vite, and Tailwind CSS, featuring an interactive Three.js terrain background and full DE/EN internationalization.

## Live

[marvin.mergili.de](https://marvin.mergili.de)

## Features

- **Interactive 3D Background** - Procedurally generated wireframe terrain rendered with Three.js (r128). Responds to mouse movement and includes hover-based vertex displacement. Falls back gracefully when WebGL is unavailable.
- **Bilingual (DE / EN)** - Language toggle powered by i18next with persistent selection via `localStorage`.
- **Sections** - Hero with code snippet, About Me with work history, API integrations showcase, and frameworks gallery.
- **Impressum** - Separate legal notice page with its own entry point (multi-page Vite build).
- **Syntax Highlighting** - Decorative C++ snippets highlighted with highlight.js.

## Tech Stack

| Layer        | Technology                            |
| ------------ | ------------------------------------- |
| Framework    | React 19                              |
| Build Tool   | Vite 6                                |
| Styling      | Tailwind CSS 4                        |
| 3D Graphics  | Three.js r128                         |
| i18n         | i18next + react-i18next               |
| Highlighting | highlight.js                          |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Mervus/portfolio-web.git
cd portfolio-web

# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
├── index.html                 # Main entry point
├── impressum/
│   └── index.html             # Legal notice entry point
├── src/
│   ├── main.jsx               # React root (main page)
│   ├── impressum-main.jsx     # React root (impressum page)
│   ├── App.jsx                # Main portfolio component
│   ├── Impressum.jsx          # Legal notice component
│   ├── three-scene.js         # Three.js terrain setup & animation
│   ├── PerspectiveMesh.js     # FBM noise & terrain generation helpers
│   ├── style.css              # Global styles & Tailwind imports
│   └── i18n/
│       ├── i18n.js            # i18next configuration
│       ├── de.json            # German translations
│       └── en.json            # English translations
├── assets/                    # Static assets (SVGs, images)
├── vite.config.js             # Vite config with multi-page setup
└── package.json
```

## License

This is a personal portfolio project. Feel free to use it as inspiration for your own site.
