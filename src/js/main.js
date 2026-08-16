const backToTop = document.querySelector(".footer-top");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 400);
});
