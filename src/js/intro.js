// ===== ENTRANCE (solo home) =====
// Appena si apre: velo mattone con lo statement al centro; poi dissolvenza —
// il colore se ne va, la copia dello statement scende al suo posto, e
// compaiono lo statement vero, la tagline e l'immagine, uno dopo l'altro.
// Si vede una volta per SCHEDA: finché la scheda resta aperta non si ripete
// (ricarichi/navighi = niente entrance); chiudi la scheda e rientri = la rivedi.
// Rispetta prefers-reduced-motion.
(() => {
  const statement = document.querySelector(".statement");
  if (!statement) return; // non è la home: niente entrance

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || sessionStorage.getItem("introSeen")) return; // salta: già vista in questa scheda o animazioni ridotte

  sessionStorage.setItem("introSeen", "1");
  document.body.classList.add("is-intro"); // nasconde tagline / img / statement veri

  // Velo mattone con una COPIA dello statement al centro (la creo io, così
  // l'HTML resta pulito e non ci sono due testi da tenere allineati a mano).
  const intro = document.createElement("div");
  intro.className = "intro";
  intro.setAttribute("aria-hidden", "true");
  const copia = statement.cloneNode(true);
  copia.className = "intro-statement";
  intro.appendChild(copia);
  document.body.appendChild(intro);

  const rimuoviVelo = () => {
    const v = document.querySelector(".intro");
    if (v) v.remove();
  };

  // Dopo un piccolo hold sul mattone, parte l'uscita.
  setTimeout(() => {
    document.body.classList.add("intro-done"); // il velo sfuma + la copia scende
    document.body.classList.remove("is-intro"); // rivela il contenuto vero (sfalsato)
    // tolgo il velo a dissolvenza finita...
    intro.addEventListener("transitionend", rimuoviVelo, { once: true });
    // ...e comunque entro un tempo massimo (failsafe: non resta MAI appeso).
    setTimeout(rimuoviVelo, 1500);
  }, 2800);

  // Paracadute assoluto: qualunque cosa vada storta, dopo 5.5s riveli tutto.
  setTimeout(() => {
    document.body.classList.remove("is-intro");
    rimuoviVelo();
  }, 5500);
})();
