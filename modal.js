// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

// Modal.elements = [];

// function Modal(options = {}) {
//   this.opt = Object.assign(
//     {
//       destroyOnClose: true,
//       footer: false,
//       cssClass: [],
//       closeMethods: ["button", "overlay", "escape"],
//     },
//     options
//   );

//   this.template = $(`#${this.opt.templateId}`);

//   if (!this.template) {
//     console.error(`${this.opt.templateId} does not exist!`);
//     return;
//   }

//   const { closeMethods } = this.opt;
//   this._allowButtonClose = closeMethods.includes("button");
//   this._allowBackdropClose = closeMethods.includes("overlay");
//   this._allowEscapeClose = closeMethods.includes("escape");

//   this._footerButtons = [];

//   this._handleEscapeKey = this._handleEscapeKey.bind(this);
// }

// Modal.prototype._buildModal = function () {
//   const content = this.template.content.cloneNode(true);

//   // Create modal elements
//   this._modalBackdrop = document.createElement("div");
//   this._modalBackdrop.className = "modal-backdrop";

//   const modalContainer = document.createElement("div");
//   modalContainer.className = "modal-container";

//   this.opt.cssClass.forEach((className) => {
//     if (typeof className === "string") {
//       modalContainer.classList.add(className);
//     }
//   });

//   if (this._allowButtonClose) {
//     const modalClose = this._createButton("&times;", "modal-close", () =>
//       this.closeModal()
//     );

//     modalContainer.append(modalClose);
//   }

//   const modalContent = document.createElement("div");
//   modalContent.className = "modal-content";

//   // Append content and element
//   modalContent.append(content);
//   modalContainer.append(modalContent);

//   if (this.opt.footer) {
//     this._modalFooter = document.createElement("div");
//     this._modalFooter.className = "modal-footer";

//     this._renderFooterContent();
//     this._renderFooterButton();

//     modalContainer.append(this._modalFooter);
//   }

//   this._modalBackdrop.append(modalContainer);
//   document.body.append(this._modalBackdrop);
// };

// Modal.prototype.setFooterContent = function (html) {
//   this._footerContent = html;
//   this._renderFooterContent();
// };

// Modal.prototype.addFooterButton = function (title, cssClass, callback) {
//   const button = this._createButton(title, cssClass, callback);
//   this._footerButtons.push(button);
//   this._renderFooterButton();
// };

// Modal.prototype._renderFooterContent = function () {
//   if (this._modalFooter && this._footerContent) {
//     this._modalFooter.innerHTML = this._footerContent;
//   }
// };

// Modal.prototype._renderFooterButton = function () {
//   if (this._modalFooter) {
//     this._footerButtons.forEach((buttonElement) => {
//       this._modalFooter.append(buttonElement);
//     });
//   }
// };

// Modal.prototype._createButton = function (title, cssClass, callback) {
//   const button = document.createElement("button");
//   button.className = cssClass;
//   button.innerHTML = title;
//   button.onclick = callback;

//   return button;
// };

// Modal.prototype.openModal = function () {
//   Modal.elements.push(this);

//   if (!this._modalBackdrop) {
//     this._buildModal();
//   }

//   setTimeout(() => {
//     this._modalBackdrop.classList.add("show");
//   }, 0);

//   // Disable Scrolling
//   document.body.classList.add("no-scroll");
//   document.body.style.paddingRight = this._getScrollbarWidth() + "px";

//   if (this._allowBackdropClose) {
//     this._modalBackdrop.onclick = (e) => {
//       if (e.target === this._modalBackdrop) {
//         this.closeModal();
//       }
//     };
//   }

//   if (this._allowEscapeClose) {
//     document.addEventListener("keydown", this._handleEscapeKey);
//   }

//   this._onTransitionEnd(this.opt.onOpen);

//   return this._modalBackdrop;
// };

// Modal.prototype._handleEscapeKey = function (e) {
//   const lastModal = Modal.elements[Modal.elements.length - 1];
//   if (e.key === "Escape" && this === lastModal) {
//     this.closeModal();
//   }
// };

// Modal.prototype._onTransitionEnd = function (callback) {
//   this._modalBackdrop.ontransitionend = (e) => {
//     if (e.propertyName !== "transform") return;
//     if (typeof callback === "function") callback();
//   };
// };

// Modal.prototype.closeModal = function (destroy = this.opt.destroyOnClose) {
//   Modal.elements.pop();
//   this._modalBackdrop.classList.remove("show");

//   if (this._allowEscapeClose) {
//     document.removeEventListener("keydown", this._handleEscapeKey);
//   }

//   this._onTransitionEnd(() => {
//     if (this._modalBackdrop && destroy) {
//       this._modalBackdrop.remove();
//       this._modalBackdrop = null;
//       this._modalFooter = null;
//     }

//     // Enable Scrolling
//     if (!Modal.elements.length) {
//       document.body.classList.remove("no-scroll");
//       document.body.style.paddingRight = "";
//     }

//     if (typeof this.opt.onClose === "function") {
//       this.opt.onClose();
//     }
//   });
// };

// Modal.prototype.destroy = function () {
//   this.closeModal(true);
// };

// Modal.prototype._getScrollbarWidth = function () {
//   if (this._scrollbarWidth) return this._scrollbarWidth;

//   const div = document.createElement("div");
//   Object.assign(div.style, {
//     overflow: "scroll",
//     position: "absolute",
//     top: "-9999px",
//   });

//   document.body.appendChild(div);
//   this._scrollbarWidth = div.offsetWidth - div.clientWidth;
//   document.body.removeChild(div);

//   return this._scrollbarWidth;
// };

// const modal1 = new Modal({
//   templateId: "modal-1",
//   destroyOnClose: false,
//   onOpen: () => {
//     console.log("Modal 1 opened");
//   },
//   onClose: () => {
//     console.log("Modal 1 close");
//   },
// });

// $("#open-modal-1").onclick = () => {
//   const modalElement = modal1.openModal();
// };

// const modal2 = new Modal({
//   templateId: "modal-2",
//   closeMethods: ["button", "escape"],
//   cssClass: ["class1", "class2", "classN"],
//   onOpen: () => {
//     console.log("Modal 2 opened");
//   },
//   onClose: () => {
//     console.log("Modal 2 close");
//   },
// });

// $("#open-modal-2").onclick = () => {
//   const modalElement = modal2.openModal();

//   const form = modalElement.querySelector("#login-form");
//   if (form) {
//     form.onsubmit = (e) => {
//       e.preventDefault();
//       const formData = {
//         email: $("#email").value.trim(),
//         password: $("#password").value.trim(),
//       };

//       console.log(formData);
//     };
//   }
// };

// const modal3 = new Modal({
//   templateId: "modal-3",
//   closeMethods: [],
//   footer: true,
//   onOpen: () => {
//     console.log("Modal 3 opened");
//   },
//   onClose: () => {
//     console.log("Modal 3 close");
//   },
// });

// modal3.addFooterButton("Danger", "modal-btn danger pull-left", (e) => {
//   console.log("Danger Clicked!");
//   modal3.closeModal();
// });

// modal3.addFooterButton("Cancel", "modal-btn", (e) => {
//   modal3.closeModal();
// });

// modal3.addFooterButton("<span>Agree</span>", "modal-btn primary", (e) => {
//   console.log(e);
//   console.log("Agree Clicked!");
//   modal3.closeModal();
// });

// $("#open-modal-3").onclick = () => {
//   modal3.openModal();
// };

// Hàm tiện ích để đơn giản hóa việc chọn phần tử trong DOM
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Mảng tĩnh được gắn vào constructor Modal để lưu trữ tất cả instance Modal đang mở
Modal.elements = [];

// Hàm khởi tạo constructor của lớp Modal, nhận tham số options để cấu hình modal
function Modal(options = {}) {
  // Gôp các tùy chọn mặc định với các tùy chọn được truyền từ tham số options
  this.opt = Object.assign(
    {
      destroyOnClose: true, // Xóa modal khỏi DOM khi đóng
      footer: false, // Không hiển thị footer mặc định
      cssClass: [], // Mảng các class CSS tùy chỉnh cho modal
      closeMethods: ["button", "overlay", "escape"], // Các phương thức cho phép đóng modal
    },
    options
  );

  // Lấy phần tử <template> từ DOM dựa trên templateId được cung cấp trong options
  this.template = $(`#${this.opt.templateId}`);

  // Nếu template không tồn tại, ghi log lỗi và thoát hàm
  if (!this.template) {
    console.error(`${this.opt.templateId} does not exist!`);
    return;
  }

  // Lấy danh sách các phương thức đóng modal từ options
  const { closeMethods } = this.opt;
  // Các cờ (flags) để xác định xem modal có thể đóng theo cách nào
  this._allowButtonClose = closeMethods.includes("button"); // Cho phép đóng bằng nút
  this._allowBackdropClose = closeMethods.includes("overlay"); // Cho phép đóng bằng lớp phủ
  this._allowEscapeClose = closeMethods.includes("escape"); // Cho phép đóng bằng phím ESC

  // Mảng lưu trữ các nút trong footer (nếu có)
  this._footerButtons = [];

  // Ràng buộc (bind) phương thức _handleEscapeKey với instance hiện tại của modal
  this._handleEscapeKey = this._handleEscapeKey.bind(this);
}

// Phương thức xây dựng cấu trúc DOM của modal
Modal.prototype._build = function () {
  // Sao chép nội dung từ template để sử dụng trong modal
  const content = this.template.content.cloneNode(true);

  // Tạo phần tử backdrop (lớp phủ nền) cho modal
  this._modalBackdrop = document.createElement("div");
  this._modalBackdrop.className = "modal-backdrop"; // Gán class CSS cho backdrop

  // Tạo container chính của modal
  const container = document.createElement("div");
  container.className = "modal-container"; // Gán class CSS cho container

  // Thêm các class CSS tùy chỉnh tử options.cssClass vào container
  this.opt.cssClass.forEach((className) => {
    if (typeof className === "string") {
      container.classList.add(className); // Chỉ thêm nếu className là chuỗi
    }
  });

  // Nếu cho phép đóng bằng nút (button), tạo nút đóng "X" và thêm vào container
  if (this._allowButtonClose) {
    const closeBtn = this._createButton("&times;", "modal-close", () =>
      this.close()
    );
    container.append(closeBtn); // Thêm nút vào container
  }

  // Tạo phần tử chứa nội dung chính của modal
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  // Thêm nội dung từ template vào modalContent
  modalContent.append(content);
  // Thêm modalContent vào container
  container.append(modalContent);

  // Nếu footer được bật trong options, tạo footer cho modal
  if (this.opt.footer) {
    this._modalFooter = document.createElement("div");
    this._modalFooter.className = "modal-footer"; // Gấn class CSS cho footer

    // Render nội dung và các nút cho footer
    this._renderFooterContent(); // Gọi hàm để render nội dung footer
    this._renderFooterButton(); // Gọi hàm để render các nút trong footer

    container.append(this._modalFooter); // Thêm footer vào container
  }

  // Thêm container vào modalBackdrop
  this._modalBackdrop.append(container);
  // Thêm modalBackdrop vào body của trang
  document.body.append(this._modalBackdrop);
};

// Phướng thức để đặt nội dung HTML cho footer
Modal.prototype.setFooterContent = function (html) {
  this._footerContent = html; // Lưu nội dung HTML vào biến instance
  this._renderFooterContent(); // Gọi hàm để render nội dung footer
};

// Phương thức để thêm nút vào footer
Modal.prototype.addFooterButton = function (title, cssClass, callback) {
  // Tạo nút với tiêu đề, class CSS và hàm callback khi nhấn
  const button = this._createButton(title, cssClass, callback);
  this._footerButtons.push(button); // Thêm nút vào mảng _footerButtons
  this._renderFooterButton(); // Gọi hàm để reder lại các nút trong footer
};

// Phương thức render nội dung footer
Modal.prototype._renderFooterContent = function () {
  // Nếu footer tồn tại và có nội dung, đặt nội dung HTML cho footer
  if (this._modalFooter && this._footerContent) {
    this._modalFooter.innerHTML = this._footerContent;
  }
};

// Phương thức render các nút trong footer
Modal.prototype._renderFooterButton = function () {
  // Nếu footer tồn tại, thêm các nút trong _footerButtons vào footer
  if (this._modalFooter) {
    this._footerButtons.forEach((buttonElement) => {
      this._modalFooter.append(buttonElement);
    });
  }
};

// Phương thức tiện ích để tạo một nút HTML
Modal.prototype._createButton = function (title, cssClass, callback) {
  const button = document.createElement("button"); // Tạo phần tử <button>
  button.className = cssClass; // Gán class CSS cho nút
  button.innerHTML = title; // Đặt nội dung HTML cho nút
  button.onclick = callback; // Gán hàm callback khi nút được nhấn
  return button; // Trả về phần tử nút
};

// Phương thức mở modal
Modal.prototype.open = function () {
  // Thêm instance Modal hiện tại vào mảng Modal.elements để theo dõi
  Modal.elements.push(this);

  // Nếu modalBackdrop chưa được tạo, gọi _build để tạo cấu trúc DOM
  if (!this._modalBackdrop) {
    this._build();
  }

  // Thêm class "show" vào modalBackdrop để hiển thị modal (thường với hiệu ứng CSS)
  setTimeout(() => {
    this._modalBackdrop.classList.add("show");
  }, 0); // setTimeout đảm bảo hiệu ứng CSS được áp dụng sau khi render

  // Vô hiệu hóa thanh cuộn của trang web khi modal đang mở
  document.body.classList.add("no-scroll"); // Thêm class để chặn cuộn
  // Thêm padding để tránh dịch chuyển nội dung do danh cuộn bị chặn
  document.body.style.paddingRight = this._getScrollbarWidth() + "px";

  // Nếu cho phép đóng bằng lớp phủ (backdrop), thêm sự kiện click để đong modal khi nhấn
  if (this._allowBackdropClose) {
    this._modalBackdrop.onclick = (e) => {
      // Chỉ đóng nếu nhấn đúng vào overlay (backdrop)
      if (e.target === this._modalBackdrop) {
        this.close();
      }
    };
  }

  // Nếu cho phép đóng bằng phím Escape, thêm sự kiện keydown
  if (this._allowEscapeClose) {
    document.addEventListener("keydown", this._handleEscapeKey);
  }

  // Gọi hàm xử lý sự kiện transition (khi hiệu ứng mở hoàn tất)
  this._onTransitionEnd(this.opt.onOpen);

  // Trả về phần tử modalBackdrop để có thể sử dụng thêm (nếu cần)
  return this._modalBackdrop;
};

// Phương thức xử lý sự kiện phím Escape
Modal.prototype._handleEscapeKey = function (e) {
  // Lấy modal cuối cùng từ mảng Modal.elements
  const lastModal = Modal.elements[Modal.elements.length - 1];
  // Nếu phím Escape được nhấn và modal hiện tại là modal cuối cùng trong mảng
  if (e.key === "Escape" && this === lastModal) {
    this.close();
  }
};

// Phương thức xử lý sự kiện transitionend (khi hiệu ứng CSS hoàn tất)
Modal.prototype._onTransitionEnd = function (callback) {
  // Thêm sự kiện transitionend cho modalBackdrop
  this._modalBackdrop.ontransitionend = (e) => {
    // Chỉ xử lý nếu thuộc tính chuyển đối là "transform"
    if (e.propertyName !== "transform") return;
    // Gọi hàm callback nếu nó là một hàm
    if (typeof callback === "function") callback();
  };
};

// Phương thức đống modal
Modal.prototype.close = function (destroy = this.opt.destroyOnClose) {
  // Xóa modal hiện tại khỏi mảng Modal.elements
  Modal.elements.pop();
  // Xóa class "show" để ẩn modal
  this._modalBackdrop.classList.remove("show");

  // Nếu cho phép đóng bằng Escape, xóa sự kiện keydown
  if (this._allowEscapeClose) {
    document.removeEventListener("keydown", this._handleEscapeKey);
  }

  // Gọi hàm xử lý transitionend để thực hiện các hành động sau khi hiệu ứng đóng hoàn tất
  this._onTransitionEnd(() => {
    // Nếu destroy = true, xóa modalBackdrop khỏi DOM và đặt lại các biến
    if (this._modalBackdrop && destroy) {
      this._modalBackdrop.remove();
      this._modalBackdrop = null;
      this._modalFooter = null;
    }

    // Nếu không còn modal nào mở, bật lại thanh cuộn và xóa padding
    if (!Modal.elements.length) {
      document.body.classList.remove("no-scroll");
      document.body.style.paddingRight = "";
    }

    // Gọi lại hàm onClose nếu options (nếu có)
    if (typeof this.opt.onClose === "function") {
      this.opt.onClose();
    }
  });
};

// Phương thức xóa modal (gọi close với destroy = true)
Modal.prototype.destroy = function () {
  this.close(true);
};

// Phương thức tính chiều rộng của thanh cuộn (scrollbar)
Modal.prototype._getScrollbarWidth = function () {
  // Nếu chiều rộng đã được tính trước đó, trả về giá trị đã lưu
  if (this._scrollbarWidth) return this._scrollbarWidth;

  // Tạo một div tạm để đo chiều rộng thanh cuộn
  const div = document.createElement("div");
  Object.assign(div.style, {
    overflow: "scroll",
    position: "absolute",
    top: "-9999px",
  });

  // Thêm div vào body tính toán chiều rộng thanh cuộn (offsetWidth - clientWidth)
  document.body.appendChild(div);
  this._scrollbarWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div); // Xóa div sau khi tính

  return this._scrollbarWidth;
};

// Tạo instance Modal thứ nhất với cấu hình cụ thể.
const modal1 = new Modal({
  templateId: "modal-1", // ID của <template> trong DOM.
  destroyOnClose: false, // Không xóa modal khỏi DOM khi đóng.
  onOpen: () => {
    console.log("Modal 1 opened"); // Callback khi modal mở.
  },
  onClose: () => {
    console.log("Modal 1 close"); // Callback khi modal đóng.
  },
});

// Gán sự kiện click cho phần tử có id="open-modal-1" để mở modal1.
$("#open-modal-1").onclick = () => {
  const modalElement = modal1.open(); // Mở modal và lưu tham chiếu đến modalBackdrop.
};

// Tạo instance Modal thứ hai với cấu hình khác.
const modal2 = new Modal({
  templateId: "modal-2", // ID của <template> trong DOM.
  closeMethods: ["button", "escape"], // Chỉ cho phép đóng bằng nút và phím Escape (không cho phép đóng bằng backdrop).
  cssClass: ["class1", "class2", "classN"], // Thêm các class CSS tùy chỉnh cho modal.
  onOpen: () => {
    console.log("Modal 2 opened"); // Callback khi modal mở.
  },
  onClose: () => {
    console.log("Modal 2 close"); // Callback khi modal đóng.
  },
});

// Gán sự kiện click cho phần tử có id="open-modal-2" để mở modal2.
$("#open-modal-2").onclick = () => {
  const modalElement = modal2.open(); // Mở modal và lưu tham chiếu đến modalBackdrop.

  // Tìm form có id="login-form" trong modal.
  const form = modalElement.querySelector("#login-form");
  if (form) {
    // Gán sự kiện submit cho form.
    form.onsubmit = (e) => {
      e.preventDefault(); // Ngăn hành vi submit mặc định của form.
      // Lấy dữ liệu từ các trường input trong form.
      const formData = {
        email: $("#email").value.trim(), // Lấy giá trị email và xóa khoảng trắng.
        password: $("#password").value.trim(), // Lấy giá trị password và xóa khoảng trắng.
      };
      console.log(formData); // In dữ liệu form ra console.
    };
  }
};

// Tạo instance Modal thứ ba với footer và không cho phép đóng bằng các phương thức mặc định.
const modal3 = new Modal({
  templateId: "modal-3", // ID của <template> trong DOM.
  closeMethods: [], // Không cho phép đóng bằng nút, overlay, hay Escape.
  footer: true, // Bật footer cho modal.
  onOpen: () => {
    console.log("Modal 3 opened"); // Callback khi modal mở.
  },
  onClose: () => {
    console.log("Modal 3 close"); // Callback khi modal đóng.
  },
});

// Thêm nút "Danger" vào footer của modal3.
modal3.addFooterButton("Danger", "modal-btn danger pull-left", (e) => {
  console.log("Danger Clicked!"); // In thông báo khi nhấn nút.
  modal3.close(); // Đóng modal.
});

// Thêm nút "Cancel" vào footer của modal3.
modal3.addFooterButton("Cancel", "modal-btn", (e) => {
  modal3.close(); // Đóng modal.
});

// Thêm nút "Agree" vào footer của modal3.
modal3.addFooterButton("<span> Agree</span>", "modal-btn primary", (e) => {
  console.log(e); // In sự kiện click.
  console.log("Agree Clicked!"); // In thông báo khi nhấn nút.
  modal3.close(); // Đóng modal.
});

// Gán sự kiện click cho phần tử có id="open-modal-3" để mở modal3.
$("#open-modal-3").onclick = () => {
  modal3.open(); // Mở modal.
};
