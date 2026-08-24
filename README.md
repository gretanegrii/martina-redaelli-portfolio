# Sito Martina — Principi guida

Documento di riferimento. Da leggere prima di ogni scelta di design o di codice.
Se una decisione contraddice un principio qui dentro, ci si ferma e si discute.

> Nota: qui stanno i **principi stabili**. Le decisioni operative di dettaglio
> (palette, font, layout delle singole pagine) vivono nella memoria di progetto
> e possono ancora muoversi. I principi qui sotto, no.

---

## Chi è Martina (e perché conta per il sito)

Martina non è "un'artista" e basta: è una **figura ibrida** — artista politica,
curatrice, autrice. Questo è *il* problema di design centrale.

Il sito deve reggere tre nature — **fare** (opere), **scrivere** (saggi),
**essere** (persona) — senza sembrare tre siti incollati. Posizionamento scelto:
"figura ibrida unica", non tre porte separate. La coerenza tra queste parti è ciò
che può rendere il sito *particolare* invece che generico.

Registro dell'arte: riflessivo/critico, non militante/agit-prop.

---

## Il focus (una sola frase)

> Far arrivare l'opera nella testa di chi guarda col minor attrito possibile,
> e poi far capire chi c'è dietro.

Il sito è un **contenitore trasparente**. Il miglior complimento a un sito
d'artista è che non te ne accorgi: ti ricordi le opere, non il menu.

---

## Cosa DEVE avere

1. **Le opere grandi e senza rumore intorno.** Immagini grandi, molto respiro,
   niente che competa con l'opera. È il 90% del gioco.
2. **Un contesto minimo e reale per ogni opera.** Titolo, anno, tecnica/materiali,
   dimensioni. Nell'arte questi dati sono parte di come si legge l'opera.
   Per Martina, spesso anche *una riga di intenzione* — non una spiegazione che
   uccide l'opera, ma un ancoraggio. (NO prezzo/carrello: non vende.)
3. **Un "chi è" credibile (About).** Bio, statement, mostre, pubblicazioni,
   contatti. Per una figura ibrida è la pagina che fa il lavoro pesante: tiene
   insieme le tre nature in una persona sola.
4. **Un contatto trovabile in tre secondi.** Curatori e galleristi devono capire
   subito come scriverle. Canali nativi del mondo dell'arte: email + Substack +
   Instagram (LinkedIn stona, solo se lo vuole lei).
5. **Navigazione che si spiega da sola.** Pochi ingressi, nomi che dicono la
   verità.

**Struttura di navigazione (confermata):** nav orizzontale in alto su tutte le
pagine — wordmark "Martina Redaelli" a sx · **WORKS · ESSAYS · ABOUT · CONTATTI**
· switch **IT/EN** a destra. Multi-pagina con URL veri (es. `/works`,
`/works/hostium-rabies-diruit`), non one-pager con sezioni impilate.
Regola ricorrente da non perdere: **coerenza di lingua nelle voci** (in IT tutte
IT, in EN tutte EN).

---

## Cosa NON deve avere

- **Effetti e animazioni gratuiti.** Ogni effetto che non serve l'opera la
  danneggia. Sobrietà = fiducia nel lavoro.
- **Testo lungo in home.** Lo statement lungo sta nell'About, non ti accoglie in
  faccia.
- **Menu gonfio.** Se ci sono 8 voci, ne hai 5 di troppo.
- **Griglie da e-commerce.** Card tutte uguali con ombre e hover fanno "prodotto",
  non "opera".
- **Musica, popup, cookie banner aggressivi, loading finti.** Tutto ciò che si
  mette *tra* il visitatore e il lavoro.

---

## Cosa lo rende migliore della media

La media dei siti d'artista è brutta. Qui si vince o si perde:

1. **Foto delle opere fatte bene.** Leva numero uno, non dipende dal codice.
   Se le immagini sono storte, con luci e sfondi diversi, il sito sarà mediocre
   qualunque cosa facciamo al codice. → Va affrontato *prima* di costruire.
2. **Tipografia curata.** In un sito così spoglio il font *è* il design.
3. **Il ritmo, non la griglia.** Alternare opere a piena pagina e opere piccole,
   dare vuoto dove serve. È lì che si sente la mano di chi ha studiato design.
4. **Coerenza tra le tre nature.** Che "Essays" e "Works" sembrino la stessa
   persona.

---

## Palette e stile (decisione corrente)

- Editoriale, restraint alla Nieves / RVB Books.
- **Bianco / nero puro, nessun accento colore.** Il colore lo portano le opere.
  (Nota: la palette è cambiata più volte — carta+mattone → sangria → grigio →
  b/n. Questa è la decisione corrente. Se cambia ancora, si aggiorna qui.)
- Stato attivo / interazione segnalati dalla **sottolineatura**, non dal colore —
  stessa regola ovunque.
- **Font: Futura** (a pagamento; web via Adobe Fonts "Futura PT" o alternativa
  gratuita Jost). Ottimo per titoli; per i testi lunghi degli Essays serve
  interlinea larga o un compagno più leggibile.
- Sito **statico**, niente CMS, niente e-commerce. Deploy su sottodominio
  Vercel/Netlify.
- Bilingue = contenuti doppi. Regola anti-stallo: build predisposta, si riempie
  prima IT, EN segue.

---

## Il vero collo di bottiglia (da non dimenticare)

Il progetto NON è bloccato sul "cosa deve avere" — quello è chiaro.
È bloccato su cose che dipendono da Martina:

1. **Il "perché"** — obiettivo, pubblico, call-to-action, scadenza. L'intenzione
   che dà l'anima al sito.
2. **L'inventario** — quante opere, in che stato sono le foto, quali saggi
   esistono davvero.
3. **Statement + font/colori della tesi** che Martina vuole recuperare.

Un sito d'artista si progetta *sui materiali reali*, non in astratto.
Materiale già arrivato: **"HOSTIUM RABIES DIRUIT"** (2024, 4 francobolli, testo
IT+EN pronto) — in `Risorse/works/`. Manca ancora molto.
Prossimo blocco di lavoro: sbloccare questi punti (brief di 9 domande già pronto
per lei).
