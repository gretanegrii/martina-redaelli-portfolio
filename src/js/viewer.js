// ===== VISORE OPERA =====
// Mostra le immagini della serie UNA alla volta + Zoom.
// Metà sinistra dello schermo = precedente, metà destra = successiva.

// Prendo il contenitore del visore e TUTTE le media dentro di lui (immagini + video).
const viewer = document.querySelector(".viewer");
const images = viewer ? viewer.querySelectorAll("img, video") : [];

// GUARDIA: niente visore o niente immagini (es. la pagina video) → mi fermo.
if (images.length > 0) {
  // Ricordo QUALE immagine sto guardando (parto dalla prima = indice 0).
  let current = 0;

  // Accende SOLO l'immagine all'indice richiesto.
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
  };
  show(0); // accendo la prima (anche se è l'unica)

  // ===== ZOOM =====
  // Il bottone accende/spegne la classe "is-zoomed" sul <body>.
  // È il CSS che, vedendo quella classe, ingrandisce la foto e scurisce lo sfondo.
  const zoomBtn = viewer.querySelector(".zoom");
  const chiudiZoom = () => document.body.classList.remove("is-zoomed");

  if (zoomBtn) {
    zoomBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // il click resta sul bottone, non "esce" a chiudere subito
      document.body.classList.toggle("is-zoomed");
    });
  }

  // Creo via JS il bottone "×" di chiusura, così è su OGNI pagina
  // senza doverlo aggiungere a mano nell'HTML di ognuna.
  const chiudiBtn = document.createElement("button"); // creo un <button> dal nulla
  chiudiBtn.className = "zoom-close"; // gli do una classe, per stilarlo nel CSS
  chiudiBtn.textContent = "×"; // il simbolo dentro
  chiudiBtn.setAttribute("aria-label", "Chiudi zoom"); // nome per screen reader
  viewer.appendChild(chiudiBtn); // lo attacco dentro il visore (nella pagina)
  chiudiBtn.addEventListener("click", chiudiZoom); // click sulla X → chiude

  // CLICK su metà schermo → scorre le immagini.
  // Funziona SIA in visione normale SIA in zoom: cambia l'immagine "is-active",
  // e il CSS dello zoom segue quella, così scorri tra le foto ingrandite.
  document.addEventListener("click", (event) => {
    if (event.target.closest("a, button, video")) return; // link/bottoni/video li lascio fare (i comandi del video funzionano)
    if (images.length > 1) {
      if (event.clientX < window.innerWidth / 2) show(current - 1); // metà sinistra
      else show(current + 1); // metà destra
    }
  });

  // ===== FRECCE VISIVE =====
  // Due frecce ‹ › come indizio "puoi sfogliare". Le creo qui in JS (come la ×)
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
