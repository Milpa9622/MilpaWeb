// instagram.js
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("ig-track");
  const prevBtn = document.querySelector(".ig-prev");
  const nextBtn = document.querySelector(".ig-next");
  const viewport = document.querySelector(".ig-viewport");

  let slides = [];
  let index = 0;

  // --- prevent buttons from scrolling the page / stealing cursor focus
  [prevBtn, nextBtn].forEach(btn => {
    btn.setAttribute("type", "button"); // just in case
    btn.addEventListener("mousedown", e => e.preventDefault());
    btn.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      btn.blur(); // drop focus so arrows/space don't affect page
    });
  });

  fetch("instagram.html")
    .then(r => r.text())
    .then(html => {
      const temp = document.createElement("div");
      temp.innerHTML = html;

      slides = Array.from(temp.querySelectorAll("blockquote.instagram-media"))
        .map(bq => {
          const slide = document.createElement("div");
          slide.className = "ig-slide";
          slide.appendChild(bq);
          return slide;
        });

      slides.forEach(s => track.appendChild(s));

      if (window.instgrm?.Embeds?.process) window.instgrm.Embeds.process();

      goTo(0);
      enableSwipe();
    })
    .catch(err => console.error("Error loading Instagram slides:", err));

function goTo(i) {
  if (!slides.length) return;
  index = (i + slides.length) % slides.length;
  slides[index].scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest"   // ✅ don’t jump the page vertically
  });
}

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  // Stop arrow keys inside the carousel from scrolling the page
  viewport.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
  });

  function enableSwipe() {
    let startX = 0, deltaX = 0, active = false;

    viewport.addEventListener("pointerdown", e => {
      active = true; startX = e.clientX;
      viewport.setPointerCapture(e.pointerId);
    });
    viewport.addEventListener("pointermove", e => { if (active) deltaX = e.clientX - startX; });
    viewport.addEventListener("pointerup", () => {
      if (!active) return; active = false;
      if (deltaX > 40) goTo(index - 1);
      else if (deltaX < -40) goTo(index + 1);
      deltaX = 0;
    });
  }
});
