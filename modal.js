const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function Modal(options = {}) {
  const {
    templateId,
    destroyOnClose = true,
    cssClass = [],
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

  function getScrollbarWidth() {
    if (getScrollbarWidth.value) {
      return getScrollbarWidth.value;
    }

    const div = document.createElement("div");
    Object.assign(div.style, {
      overflow: "scroll",
      position: "absolute",
      top: "-9999px",
    });

    document.body.appendChild(div);
    const scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    getScrollbarWidth.value = scrollbarWidth;

    return scrollbarWidth;
  }

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
      const modalClose = document.createElement("button");
      modalClose.className = "modal-close";
      modalClose.innerHTML = "&times;";

      modalContainer.append(modalClose);
      modalClose.onclick = () => this.closeModal();
    }

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    // Append content and element
    modalContent.append(content);
    modalContainer.append(modalContent);
    this._modalBackdrop.append(modalContainer);
    document.body.append(this._modalBackdrop);
  };

  this.openModal = () => {
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
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.closeModal();
        }
      });
    }

    // Disable Scrolling
    document.body.classList.add("no-scroll");
    document.body.style.paddingRight = getScrollbarWidth() + "px";

    return this._modalBackdrop;
  };

  this.closeModal = (destroy = destroyOnClose) => {
    this._modalBackdrop.classList.remove("show");
    this._modalBackdrop.ontransitionend = () => {
      if (this._modalBackdrop && destroy) {
        this._modalBackdrop.remove();
        this._modalBackdrop = null;
      }
      document.body.classList.remove("no-scroll");
      document.body.style.paddingRight = "";
    };
  };

  this.destroy = () => {
    this.closeModal(true);
  };
}

const modal1 = new Modal({
  templateId: "modal-1",
  destroyOnClose: false,
});

$("#open-modal-1").onclick = () => {
  const modalElement = modal1.openModal();
};

const modal2 = new Modal({
  templateId: "modal-2",
  closeMethods: ["button", "escape"],
  footer: true,
  cssClass: ["class1", "class2", "classN"],
  onOpen: () => {
    console.log("Modal opened");
  },
  onClose: () => {
    console.log("Modal close");
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
