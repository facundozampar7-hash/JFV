document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("galleryTrack");
  const prev = document.getElementById("galPrev");
  const next = document.getElementById("galNext");
  if (!track) return;

  let paused = false;
  let timer = null;
  const step = () => {
    const card = track.querySelector(".gallery-item");
    if (!card) return 280;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  };

  function move(direction) {
    const max = track.scrollWidth - track.clientWidth;
    if (direction > 0) {
      if (track.scrollLeft >= max - 3) track.scrollTo({ left: 0, behavior: "smooth" });
      else track.scrollBy({ left: step(), behavior: "smooth" });
    } else {
      if (track.scrollLeft <= 3) track.scrollTo({ left: max, behavior: "smooth" });
      else track.scrollBy({ left: -step(), behavior: "smooth" });
    }
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(function () {
      if (!paused) move(1);
    }, 2600);
  }

  next && next.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); move(1); });
  prev && prev.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); move(-1); });

  track.addEventListener("mouseenter", function () { paused = true; });
  track.addEventListener("mouseleave", function () { paused = false; });
  track.addEventListener("touchstart", function () { paused = true; }, { passive: true });
  track.addEventListener("touchend", function () { paused = false; });

  // Pausa mientras se arrastra con el mouse y permite desplazamiento manual.
  let dragging = false, startX = 0, startScroll = 0;
  track.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging = true; startX = e.clientX; startScroll = track.scrollLeft;
    track.classList.add("is-dragging");
    track.setPointerCapture && track.setPointerCapture(e.pointerId);
  });
  track.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    track.scrollLeft = startScroll - (e.clientX - startX);
  });
  function endDrag() { dragging = false; track.classList.remove("is-dragging"); }
  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);

  startAuto();
});
