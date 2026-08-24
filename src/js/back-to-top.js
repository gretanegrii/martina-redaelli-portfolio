// ===== TORNA SU =====
// Mostra il bottone ".footer-top" quando si è scrollato oltre 400px.
// Il CSS (base.css) lo tiene invisibile finché non ha la classe "show".

const backToTop = document.querySelector(".footer-top");

// guardia: se in una pagina il bottone non c'è, non faccio niente (niente errori)
if (backToTop) {
  window.addEventListener("scroll", () => {
    // aggiunge "show" oltre i 400px, la toglie sotto
    backToTop.classList.toggle("show", window.scrollY > 400);
  });
}
