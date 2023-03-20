function autoClose() {
  let btn = document.querySelector(".ytp-ad-overlay-close-button");
  if (btn) {
    btn.click();
  }
  window.requestAnimationFrame(autoClose);

  let btn2 = document.querySelector(".ytp-ad-skip-button");
  if (btn2) {
    btn2.click();
  }
}

autoClose();
