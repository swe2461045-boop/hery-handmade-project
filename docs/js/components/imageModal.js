import { getImagesByProductCode } from "../services/imageService.js";

let slideshowImages = [];
let currentIndex = 0;
let modalBound = false;
let zoomLevel = 1;

export function renderImageModal() {
  return `
    <div id="imageModal" class="app-modal">
      <div class="app-modal-bg" id="modalBg"></div>
      <div class="app-modal-card">
        <header class="app-modal-head">
          <strong id="modalImgTitle"></strong>
          <div>
            <button class="app-btn" style="padding:.3rem .6rem;" id="fullscreenBtn" type="button">⛶</button>
            <button class="app-btn" style="padding:.3rem .6rem;" id="closeImgModalBtn" type="button">✕</button>
          </div>
        </header>
        <div class="app-modal-body">
          <img id="slideshowImage" class="app-zoomable-img" src="" alt="" />
          <div style="margin-top:1rem; display:flex; justify-content:center; gap:.5rem;">
            <button class="app-btn app-btn-primary" id="prevImageBtn" type="button">←</button>
            <button class="app-btn app-btn-primary" id="nextImageBtn" type="button">→</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindImageModalEvents() {
  if (modalBound) return;
  modalBound = true;

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest(".open-image-btn");
    if (openBtn) {
      slideshowImages = getImagesByProductCode(openBtn.dataset.code);
      if (!slideshowImages.length) return;
      currentIndex = 0;
      zoomLevel = 1;
      const img = document.getElementById("slideshowImage");
      img.src = slideshowImages[0];
      img.style.transform = "scale(1)";
      document.getElementById("modalImgTitle").textContent = openBtn.dataset.name;
      document.getElementById("imageModal").classList.add("is-active");
      return;
    }
    if (e.target.closest("#closeImgModalBtn") || e.target.closest("#modalBg")) {
      document.getElementById("imageModal")?.classList.remove("is-active");
    }
    if (e.target.closest("#prevImageBtn") && slideshowImages.length) {
      currentIndex = (currentIndex - 1 + slideshowImages.length) % slideshowImages.length;
      document.getElementById("slideshowImage").src = slideshowImages[currentIndex];
    }
    if (e.target.closest("#nextImageBtn") && slideshowImages.length) {
      currentIndex = (currentIndex + 1) % slideshowImages.length;
      document.getElementById("slideshowImage").src = slideshowImages[currentIndex];
    }
    if (e.target.closest("#fullscreenBtn")) {
      const img = document.getElementById("slideshowImage");
      if (!document.fullscreenElement) img?.requestFullscreen?.();
      else document.exitFullscreen?.();
    }
  });

  document.addEventListener("wheel", (e) => {
    const img = e.target.closest("#slideshowImage");
    if (!img) return;
    e.preventDefault();
    zoomLevel = Math.min(Math.max(zoomLevel + (e.deltaY < 0 ? 0.15 : -0.15), 1), 3);
    img.style.transform = `scale(${zoomLevel})`;
  }, { passive: false });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") document.getElementById("imageModal")?.classList.remove("is-active");
  });
}
