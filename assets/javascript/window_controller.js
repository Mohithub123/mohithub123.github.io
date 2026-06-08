export class WindowController {
  constructor(windowElement, windowId) {
    this.win = windowElement;
    this.id = windowId;

    this.header = windowElement.querySelector(".window-header");
    this.windowTitle = windowElement.querySelector(".window-title");
    this.windowContent = windowElement.querySelector(".window-content");

    this.btnMin = windowElement.querySelector(".minimize-btn");
    this.btnMax = windowElement.querySelector(".maximize-btn");
    this.btnClose = windowElement.querySelector(".close-btn");

    this.isMinimized = false;
    this.isMaximized = false;
    this.dragOffset = { x: 0, y: 0 };
    this.prevRect = null;

    this.init();
  }

  init() {
    this.enableDragging();
    this.bindControls();
  }

  /* ---------- Dragging ---------- */

  enableDragging() {
    this.header.addEventListener("pointerdown", e => {
      if (e.button !== 0) return;
      if (e.target.closest(".window-controls")) return;
      if (this.isMaximized) return;

      e.preventDefault();

      this.dragOffset.x = e.clientX - this.win.offsetLeft;
      this.dragOffset.y = e.clientY - this.win.offsetTop;

      const move = e => {
        this.win.style.left = `${e.clientX - this.dragOffset.x}px`;
        this.win.style.top = `${e.clientY - this.dragOffset.y}px`;
      };

      const up = () => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
      };

      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
    });
  }

  /* ---------- Controls ---------- */

  bindControls() {
    this.btnMin.addEventListener("click", () => this.minimize());
    this.btnMax.addEventListener("click", () => this.toggleMaximize());
    this.btnClose.addEventListener("click", () => this.close());
  }

  minimize() {
    this.win.style.display = "none";
    this.isMinimized = true;
  }

  restore() {
    this.win.style.display = "flex";
    this.isMinimized = false;
    this.focus();
  }

  toggleMaximize() {
    if (!this.isMaximized) {
      this.prevRect = {
        left: this.win.style.left,
        top: this.win.style.top,
        width: this.win.style.width,
        height: this.win.style.height
      };

      this.win.classList.add("maximized");
      this.isMaximized = true;
    } else {
      this.win.classList.remove("maximized");
      Object.assign(this.win.style, this.prevRect);
      this.isMaximized = false;
    }
  }

  focus() {
    this.win.style.zIndex = ++WindowController.z;
  }

  async setContent(title, url) {
    this.windowTitle.textContent = title;
    const res = await fetch(url);
    this.windowContent.innerHTML = await res.text();
  }

  close() {
    this.win.remove();
    this.onClose?.(this.id);
  }
}

WindowController.z = 100;
