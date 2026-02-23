import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Removed StrictMode for 3D stability
createRoot(document.getElementById('root')).render(
    <App />
)
