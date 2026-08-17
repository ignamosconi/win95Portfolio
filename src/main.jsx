import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const NOT_SO_SECRET = 'F2cv6cOt1IwbUM7vp0EX0ceXDZ1aRm2Lc86rtY1CUAPXRGYtdfzLMasfPTSAAQMh'; // igual que en generador.html

async function verifyHMAC(payload, sig, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign']
  );
  const fullSig = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  const fullHex = Array.from(new Uint8Array(fullSig))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  return fullHex.slice(0, 16) === sig;
}

const params = new URLSearchParams(window.location.search);
const lang    = params.get('lang');
const name    = params.get('name');
const company = params.get('company');
const sig     = params.get('sig');

if (lang && name && company && sig) {
  const payload = `lang=${lang}&name=${name}&company=${company}`;
  verifyHMAC(payload, sig, NOT_SO_SECRET).then(valid => {
    if (valid) {
      localStorage.setItem('greeting', JSON.stringify({ lang, name, company, msg: '' }));
    }
    // válido o no, siempre limpiamos la URL
    window.history.replaceState({}, '', window.location.pathname);
  });
} else if (params.has('lang') || params.has('name') || params.has('sig')) {
  // Hay params pero sin firma válida — limpiamos igual sin guardar nada
  window.history.replaceState({}, '', window.location.pathname);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)