// ─────────────────────────────────────────────────────────────────────────────
// ICON VERSION
// ─────────────────────────────────────────────────────────────────────────────
// Incrementar ICONS_VERSION cada vez que agregues o elimines íconos en icon.json
// o en la lista deleteIcon de App.jsx.
//
// Qué pasa cuando la cambiás:
//   • Si el usuario tiene una versión VIEJA  → se resetea el orden del desktop
//     y se cargan los íconos frescos del JSON (pierden posiciones, no otras prefs).
//   • Si el usuario tiene la versión ACTUAL  → merge normal: se respetan sus
//     posiciones y solo se agregan/quitan los íconos que cambiaron.
//
// Cuándo NO hace falta cambiarla:
//   • Cambios de código que no agregan/quitan íconos (CSS, lógica, etc.)
//
// Formato sugerido: "vN"  →  v1, v2, v3 …
// ─────────────────────────────────────────────────────────────────────────────

export const ICONS_VERSION = "v3";
