"use strict";

// ===== EDITÁ ESTO =====
// Cuando se una alguien, poné su gamertag en lugar de null.
// x e y = posición en la cancha (en %). Formación 4-2-3-1.
const plantilla = [
  { abrev: "DC",  posicion: "Delantero centro",       gamertag: "FerDubon21",   x: 50, y: 20 },
  { abrev: "MCO", posicion: "Mediocampista ofensivo", gamertag: "faze_mayerlo", x: 50, y: 38 },
  { abrev: "EI",  posicion: "Extremo izquierdo",      gamertag: null, x: 17, y: 36 },
  { abrev: "ED",  posicion: "Extremo derecho",        gamertag: null, x: 83, y: 36 },
  { abrev: "MC",  posicion: "Mediocentro",            gamertag: null, x: 36, y: 57 },
  { abrev: "MCD", posicion: "Mediocentro defensivo",  gamertag: null, x: 64, y: 57 },
  { abrev: "LI",  posicion: "Lateral izquierdo",      gamertag: null, x: 13, y: 75 },
  { abrev: "DFC", posicion: "Defensa central",        gamertag: null, x: 37, y: 76 },
  { abrev: "DFC", posicion: "Defensa central",        gamertag: null, x: 63, y: 76 },
  { abrev: "LD",  posicion: "Lateral derecho",        gamertag: null, x: 87, y: 75 },
  { abrev: "POR", posicion: "Portero",                gamertag: null, x: 50, y: 91 }
];

const requisitos = [
  "Ganas reales de entrenar y competir.",
  "Micrófono y comunicación durante el partido.",
  "Respeto con compañeros y rivales.",
  "Horarios fijos para jugar juntos."
];

// Reemplazá cuando tengan el Instagram oficial:
const instagramOficial = "https://www.instagram.com/";
// ======================

function el(tag, clase, texto) {
  const e = document.createElement(tag);
  if (clase) e.className = clase;
  if (texto !== undefined) e.textContent = texto;
  return e;
}

const grid = document.getElementById("plantilla-grid");
const info = document.getElementById("player-info");
const confirmados = plantilla.filter(p => p.gamertag).length;

function mostrarFicha(p) {
  info.replaceChildren();
  const bloque = el("div");
  bloque.append(el("strong", "", p.gamertag || "Cupo libre"), el("span", "sub", p.posicion));
  if (!p.gamertag) {
    const a = el("a", "", "Quiero este cupo");
    a.href = "#contacto";
    bloque.appendChild(a);
  }
  info.append(el("span", "ab", p.abrev), bloque);
}

if (grid && info) {
  mostrarFicha(plantilla[0]);
  plantilla.forEach((p, i) => {
    const ocupado = Boolean(p.gamertag);
    const b = el("button", "pj " + (ocupado ? "on" : "off"));
    b.type = "button";
    b.style.left = p.x + "%";
    b.style.top = p.y + "%";
    b.style.setProperty("--i", i);
    b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.setAttribute("aria-label", (ocupado ? p.gamertag : "Cupo libre") + ", " + p.posicion);
    b.append(el("span", "shirt", ocupado ? p.abrev : "?"), el("span", "pname", ocupado ? p.gamertag : p.abrev));
    b.addEventListener("click", () => {
      grid.querySelectorAll(".pj").forEach(x => x.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", "true");
      mostrarFicha(p);
    });
    grid.appendChild(b);
  });
}
const total = document.getElementById("total");
if (total) total.textContent = String(plantilla.length);

const ul = document.getElementById("requisitos");
if (ul) requisitos.forEach(r => ul.appendChild(el("li", "", r)));

// ===== Movimiento al hacer scroll =====
document.documentElement.classList.add("js");
const sel = ".band h2, .lead, .club-text p, .pitch, .info, .reqs li, .steps li, .ticket, .join-in > *, .count";
document.querySelectorAll(sel).forEach(n => {
  n.classList.add("reveal");
  const idx = Array.prototype.indexOf.call(n.parentElement.children, n);
  n.style.setProperty("--d", Math.min(idx, 10));
});

const contador = document.getElementById("contador");
function contar() {
  if (!contador) return;
  let n = 0;
  const paso = () => {
    contador.textContent = String(n);
    if (n < confirmados) { n++; setTimeout(paso, 260); }
  };
  paso();
}

const vigilante = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    if (e.target.classList.contains("count")) contar();
    vigilante.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(n => vigilante.observe(n));
if (contador) contador.textContent = "0";

const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("nav-links");
if (menuBtn && navLinks) {
  const cerrar = () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Abrir menú");
  };
  menuBtn.addEventListener("click", () => {
    const abierto = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(abierto));
    menuBtn.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", cerrar));
  document.addEventListener("keydown", e => { if (e.key === "Escape") cerrar(); });
}

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
const instagram = document.getElementById("instagram-link");
if (instagram) instagram.href = instagramOficial;
