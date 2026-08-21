// JS della home.
// L'accordion è nativo (attributo name="sezioni" sui <details>).

// ===== ACCORDION MORBIDO =====
// Avvolgo il contenuto di ogni sezione in .reveal > .reveal-inner, così il CSS
// può animarne apertura/chiusura con la griglia (0fr <-> 1fr): metodo robusto,
// non si incastra mai (a differenza dell'animazione su block-size verso "auto").
document.querySelectorAll("main > details").forEach((details) => {
  const summary = details.querySelector("summary");
  const reveal = document.createElement("div");
  reveal.className = "reveal";
  const inner = document.createElement("div");
  inner.className = "reveal-inner";
  reveal.appendChild(inner);
  // sposto tutto ciò che sta DOPO il summary dentro inner
  while (summary.nextSibling) {
    inner.appendChild(summary.nextSibling);
  }
  details.appendChild(reveal);
});

// ===== APRI LA SEZIONE DALL'ANCORA =====
// Se arrivo con un'ancora tipo index.html#saggi, apro quella sezione.
// (Es.: chiudendo un saggio si torna alla home con "Saggi" già aperta.)
// Essendo un accordion a apertura singola, aprire una sezione chiude le altre.

const id = location.hash.slice(1); // toglie il "#" iniziale
const bersaglio = id ? document.getElementById(id) : null;

if (bersaglio && bersaglio.tagName === "DETAILS") {
  bersaglio.open = true;
  bersaglio.scrollIntoView();
}
