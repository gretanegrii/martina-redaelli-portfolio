// ===== VISORE OPERA =====
// Mostra le immagini della serie UNA alla volta.
// Metà sinistra dello schermo = precedente, metà destra = successiva.
// Zoom (si vede solo su DESKTOP) + contatore "N/totale" (solo su MOBILE):
// li creo entrambi qui, è il CSS a decidere quale mostrare a quale larghezza.

// Prendo il contenitore del visore e TUTTE le media dentro di lui (immagini + video).
const viewer = document.querySelector(".viewer");
const images = viewer ? viewer.querySelectorAll("img, video") : [];

// GUARDIA: niente visore o niente immagini (es. la pagina video) → mi fermo.
if (images.length > 0) {
  // Ricordo QUALE immagine sto guardando (parto dalla prima = indice 0).
  let current = 0;

  // ===== CONTATORE (mostrato solo su mobile dal CSS) =====
  // Lo creo via JS, così esiste solo dove c'è più di un'immagine.
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

  // ===== ZOOM (mostrato solo su desktop dal CSS) =====
  // Il bottone accende/spegne la classe "is-zoomed" sul <body>; è il CSS che,
  // vedendo quella classe, ingrandisce la foto e scurisce lo sfondo.
  const chiudiZoom = () => document.body.classList.remove("is-zoomed");

  const zoomBtn = document.createElement("button"); // creo il bottone Zoom via JS
  zoomBtn.className = "zoom";
  zoomBtn.textContent = "Zoom";
  viewer.appendChild(zoomBtn);
  zoomBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // il click resta sul bottone, non "esce" a chiudere subito
    document.body.classList.toggle("is-zoomed");
  });

  // Il bottone "×" di chiusura dello zoom (compare in zoom, in alto a destra).
  const chiudiBtn = document.createElement("button");
  chiudiBtn.className = "zoom-close";
  chiudiBtn.textContent = "×";
  chiudiBtn.setAttribute("aria-label", "Chiudi zoom");
  viewer.appendChild(chiudiBtn);
  chiudiBtn.addEventListener("click", chiudiZoom);

  // CLICK su metà schermo → scorre le immagini.
  // Funziona SIA in visione normale SIA in zoom.
  document.addEventListener("click", (event) => {
    if (event.target.closest("a, button, video")) return; // link/bottoni/video li lascio fare
    if (images.length > 1) {
      if (event.clientX < window.innerWidth / 2) show(current - 1); // metà sinistra
      else show(current + 1); // metà destra
    }
  });

  // ===== FRECCE VISIVE =====
  // Due frecce ‹ › come indizio "puoi sfogliare" (nascoste su mobile dal CSS).
  if (images.length > 1) {
    const frecciaSx = document.createElement("span");
    frecciaSx.className = "arrow arrow-left";
    frecciaSx.textContent = "‹";
    frecciaSx.setAttribute("aria-hidden", "true");

    const frecciaDx = document.createElement("span");
    frecciaDx.className = "arrow arrow-right";
    frecciaDx.textContent = "›";
    frecciaDx.setAttribute("aria-hidden", "true");

    viewer.append(frecciaSx, frecciaDx);
  }

  // Cursore-freccia che cambia lato (anche in zoom, così sai che puoi scorrere).
  if (images.length > 1) {
    document.addEventListener("mousemove", (event) => {
      const suSinistra = event.clientX < window.innerWidth / 2;
      document.body.classList.toggle("verso-sinistra", suSinistra);
      document.body.classList.toggle("verso-destra", !suSinistra);
    });
  }

  // Tastiera: Esc chiude lo zoom; frecce ← → scorrono (anche in zoom).
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      chiudiZoom();
      return;
    }
    if (images.length > 1) {
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    }
  });
}
