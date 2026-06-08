import { WindowController } from "./window_controller.js";

export class WindowManager {
  constructor() {
    this.windows = new Map();
  }

  open({ id, title, contentUrl }) {
    // Reuse existing window
    if (this.windows.has(id)) {
      const controller = this.windows.get(id);
      controller.isMinimized ? controller.restore() : controller.focus();
      return Promise.resolve(controller);
    }

    // Create DOM dynamically
    const winEl = this.createWindowElement();
    document.body.appendChild(winEl);

    const controller = new WindowController(winEl, id);

    controller.onClose = (id) => {
      this.windows.delete(id);
    };

    const contentPromise = controller.setContent(title, contentUrl).then(() => {
      this.centerWindow(winEl);
      return controller;
    });

    controller.focus();
    this.windows.set(id, controller);

    return contentPromise;
  }

  createWindowElement() {
    const win = document.createElement("div");
    win.className = "window";
    win.id = "window";

    win.innerHTML = `
        <div class="window-header">
            <p class="window-title"></p>

            <div class="window-controls">
                <div class="window-btn minimize-btn"></div>
                <div class="window-btn maximize-btn"></div>
                <div class="window-btn close-btn"></div>
            </div>
        </div>
        <div class="window-content"></div>
    </div>
    `;

    return win;
  }

  centerWindow(win) {
    const rect = win.getBoundingClientRect();

    win.style.left = `${(window.innerWidth - rect.width) / 2}px`;
    win.style.top = `${(window.innerHeight - rect.height) / 2}px`;
  }
}
