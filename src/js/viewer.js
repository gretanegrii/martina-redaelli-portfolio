// ===== VISORE OPERA =====
// Mostra le immagini della serie UNA alla volta + contatore "N/totale".
// Metà sinistra dello schermo = precedente, metà destra = successiva.

// Prendo il contenitore del visore e TUTTE le media dentro di lui (immagini + video).
const viewer = document.querySelector(".viewer");
const images = viewer ? viewer.querySelectorAll("img, video") : [];

// GUARDIA: niente visore o niente immagini (es. la pagina video) → mi fermo.
if (images.length > 0) {
  // Ricordo QUALE immagine sto guardando (parto dalla prima = indice 0).
  let current = 0;

  // ===== CONTATORE =====
  // Lo creo via JS (come le frecce) così esiste SOLO dove c'è più di un'immagine,
  // senza aggiungerlo a mano nell'HTML di ogni pagina.
  let counter = null;
  if (images.length > 1) {
    counter = document.createElement("p");
    counter.className = "counter";
    viewer.appendChild(counter);
  }

  // Accende SOLO l'immagine all'indice richiesto (e aggiorna il contatore).
  const show = (index) => {
    const precedente = images[current];
    if (precedente.tagName === "VIDEO") precedente.pause(); // metto in pausa il video che lascio
    precedente.classList.remove("is-active");
    // "% images.length" fa il GIRO: da -1 torno all'ultima, oltre l'ultima torno a 0.
    current = (index + images.length) % images.length;
    const attuale = images[current];
    attuale.classList.add("is-active");
    // se la slide è un video, lo faccio partire (muto+loop → parte da solo, in loop)
    if (attuale.tagName === "VIDEO") attuale.play().catch(() => {});
    // aggiorno il contatore: indice+1 perché gli umani contano da 1
    if (counter) counter.textContent = `${current + 1}/${images.length}`;
  };
  show(0); // accendo la prima (anche se è l'unica) e scrivo "1/N"

  // CLICK su metà schermo → scorre le immagini.
  document.addEventListener("click", (event) => {
    if (event.target.closest("a, button, video")) return; // link/bottoni/video li lascio fare (i comandi del video funzionano)
    if (images.length > 1) {
      if (event.clientX < window.innerWidth / 2) show(current - 1); // metà sinistra
      else show(current + 1); // metà destra
    }
  });

  // ===== FRECCE VISIVE =====
  // Due frecce ‹ › come indizio "puoi sfogliare". Le creo qui in JS (come il contatore)
  // così esistono SOLO dove c'è più di un'immagine, senza toccare l'HTML di ogni pagina.
  if (images.length > 1) {
    const frecciaSx = document.createElement("span"); // un contenitore vuoto per il simbolo
    frecciaSx.className = "arrow arrow-left"; // classi per stilarla nel CSS
    frecciaSx.textContent = "‹"; // il simbolo dentro
    frecciaSx.setAttribute("aria-hidden", "true"); // decorativa: la vera navigazione è click + tastiera

    const frecciaDx = document.createElement("span");
    frecciaDx.className = "arrow arrow-right";
    frecciaDx.textContent = "›";
    frecciaDx.setAttribute("aria-hidden", "true");

    viewer.append(frecciaSx, frecciaDx); // le attacco dentro il visore
  }

  // Cursore-freccia che cambia lato (indizio "puoi sfogliare").
  if (images.length > 1) {
    document.addEventListener("mousemove", (event) => {
      const suSinistra = event.clientX < window.innerWidth / 2;
      document.body.classList.toggle("verso-sinistra", suSinistra);
      document.body.classList.toggle("verso-destra", !suSinistra);
    });
  }

  // Tastiera: frecce ← → scorrono (accessibilità).
  document.addEventListener("keydown", (event) => {
    if (images.length > 1) {
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    }
  });
}
