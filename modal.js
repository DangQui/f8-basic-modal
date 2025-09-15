const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

Modal.elements = [];

function Modal(options = {}) {
  const {
    templateId,
    destroyOnClose = true,
    footer = false,
    cssClass = [],
    onOpen,
    onClose,
    closeMethods = ["button", "overlay", "escape"],
  } = options;
  const template = $(`#${templateId}`);

  if (!template) {
    console.error(`${templateId} dose not exist!`);
    return;
  }

  this._allowButtonClose = closeMethods.includes("button");
  this._allowBackdropClose = closeMethods.includes("overlay");
  this._allowEscapeClose = closeMethods.includes("escape");

  this._getScrollbarWidth = () => {
    if (this._scrollbarWidth) return this._scrollbarWidth;

    const div = document.createElement("div");
    Object.assign(div.style, {
      overflow: "scroll",
      position: "absolute",
      top: "-9999px",
    });

    document.body.appendChild(div);
    this._scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    return this._scrollbarWidth;
  };

  this._buildModal = () => {
    const content = template.content.cloneNode(true);

    // Create modal elements
    this._modalBackdrop = document.createElement("div");
    this._modalBackdrop.className = "modal-backdrop";

    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";

    cssClass.forEach((className) => {
      if (typeof className === "string") {
        modalContainer.classList.add(className);
      }
    });

    if (this._allowButtonClose) {
      const modalClose = this._createButton(
        "&times;",
        "modal-close",
        this.closeModal
      );

      modalContainer.append(modalClose);
    }

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    // Append content and element
    modalContent.append(content);
    modalContainer.append(modalContent);

    if (footer) {
      this._modalFooter = document.createElement("div");
      this._modalFooter.className = "modal-footer";

      if (this._footerContent) {
        this._modalFooter.innerHTML = this._footerContent;
      }

      this._footerButtons.forEach((buttonElement) => {
        this._modalFooter.append(buttonElement);
      });

      modalContainer.append(this._modalFooter);
    }

    this._modalBackdrop.append(modalContainer);
    document.body.append(this._modalBackdrop);
  };

  this.setFooterContent = (html) => {
    this._footerContent = html;
    if (this._modalFooter) {
      this._modalFooter.innerHTML = html;
    }
  };

  this._footerButtons = [];

  this.addFooterButton = (title, cssClass, callback) => {
    const button = this._createButton(title, cssClass, callback);
    this._footerButtons.push(button);
  };

  this._createButton = (title, cssClass, callback) => {
    const button = document.createElement("button");
    button.className = cssClass;
    button.innerHTML = title;
    button.onclick = callback;

    return button;
  };

  this.openModal = () => {
    Modal.elements.push(this);

    if (!this._modalBackdrop) {
      this._buildModal();
    }

    setTimeout(() => {
      this._modalBackdrop.classList.add("show");
    }, 0);

    if (this._allowBackdropClose) {
      this._modalBackdrop.onclick = (e) => {
        if (e.target === this._modalBackdrop) {
          this.closeModal();
        }
      };
    }

    if (this._allowEscapeClose) {
      document.addEventListener("keydown", this._handleEscapeKey);
    }

    // Disable Scrolling
    document.body.classList.add("no-scroll");
    document.body.style.paddingRight = this._getScrollbarWidth() + "px";

    this._onTransitionEnd(onOpen);

    return this._modalBackdrop;
  };

  this._handleEscapeKey = (e) => {
    const lastModal = Modal.elements[Modal.elements.length - 1];
    if (e.key === "Escape" && this === lastModal) {
      this.closeModal();
    }
  };

  this._onTransitionEnd = (callback) => {
    this._modalBackdrop.ontransitionend = (e) => {
      if (e.propertyName !== "transform") return;
      if (typeof callback === "function") callback();
    };
  };

  this.closeModal = (destroy = destroyOnClose) => {
    Modal.elements.pop();
    this._modalBackdrop.classList.remove("show");

    if (this._allowEscapeClose) {
      document.removeEventListener("keydown", this._handleEscapeKey);
    }

    this._onTransitionEnd(() => {
      if (this._modalBackdrop && destroy) {
        this._modalBackdrop.remove();
        this._modalBackdrop = null;
        this._modalFooter = null;
      }

      // Enable Scrolling
      if (!Modal.elements.length) {
        document.body.classList.remove("no-scroll");
        document.body.style.paddingRight = "";
      }

      if (typeof onClose === "function") {
        onClose();
      }
    });
  };

  this.destroy = () => {
    this.closeModal(true);
  };
}

const modal1 = new Modal({
  templateId: "modal-1",
  destroyOnClose: false,
  onOpen: () => {
    console.log("Modal 1 opened");
  },
  onClose: () => {
    console.log("Modal 1 close");
  },
});

$("#open-modal-1").onclick = () => {
  const modalElement = modal1.openModal();
};

const modal2 = new Modal({
  templateId: "modal-2",
  closeMethods: ["button", "escape"],
  cssClass: ["class1", "class2", "classN"],
  onOpen: () => {
    console.log("Modal 2 opened");
  },
  onClose: () => {
    console.log("Modal 2 close");
  },
});

$("#open-modal-2").onclick = () => {
  const modalElement = modal2.openModal();

  const form = modalElement.querySelector("#login-form");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const formData = {
        email: $("#email").value.trim(),
        password: $("#password").value.trim(),
      };

      console.log(formData);
    };
  }
};

const modal3 = new Modal({
  templateId: "modal-3",
  closeMethods: [],
  footer: true,
  onOpen: () => {
    console.log("Modal 3 opened");
  },
  onClose: () => {
    console.log("Modal 3 close");
  },
});

modal3.addFooterButton("Danger", "modal-btn danger pull-left", (e) => {
  console.log("Danger Clicked!");
  modal3.closeModal();
});

modal3.addFooterButton("Cancel", "modal-btn", (e) => {
  modal3.closeModal();
});

modal3.addFooterButton("<span>Agree</span>", "modal-btn primary", (e) => {
  console.log(e);
  console.log("Agree Clicked!");
  modal3.closeModal();
});

$("#open-modal-3").onclick = () => {
  modal3.openModal();
};
