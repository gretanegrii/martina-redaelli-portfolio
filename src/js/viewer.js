// ===== VISORE OPERA =====
// Mostra le immagini della serie UNA alla volta + Zoom.
// Metà sinistra dello schermo = precedente, metà destra = successiva.

// Prendo il contenitore del visore e TUTTE le immagini dentro di lui.
const viewer = document.querySelector(".viewer");
const images = viewer ? viewer.querySelectorAll("img") : [];

// GUARDIA: niente visore o niente immagini (es. la pagina video) → mi fermo.
if (images.length > 0) {
  // Ricordo QUALE immagine sto guardando (parto dalla prima = indice 0).
  let current = 0;

  // Accende SOLO l'immagine all'indice richiesto.
  const show = (index) => {
    images[current].classList.remove("is-active");
    // "% images.length" fa il GIRO: da -1 torno all'ultima, oltre l'ultima torno a 0.
    current = (index + images.length) % images.length;
    images[current].classList.add("is-active");
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
    if (event.target.closest("a, button")) return; // link/bottoni li lascio fare (Zoom compreso)
    if (images.length > 1) {
      if (event.clientX < window.innerWidth / 2) show(current - 1); // metà sinistra
      else show(current + 1); // metà destra
    }
  });

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
