import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/i18n.js'
import './style.css'
import Impressum from './Impressum.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Impressum />
    </StrictMode>
)
