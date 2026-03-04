document.addEventListener("DOMContentLoaded", function () {
  // Lấy các phần tử input
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // Lấy các thẻ span để hiển thị lỗi
  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");

  // Lấy các nút bấm
  const exitBtn = document.querySelector(".btn-exit");
  const btns = document.querySelectorAll(".btn");
  const loginBtn = btns[0];
  const registerBtn = btns[1];

  // 1. Xử lý khi bấm nút ĐĂNG NHẬP
  loginBtn.addEventListener("click", function (event) {
    // Reset (xóa) các thông báo lỗi cũ mỗi lần bấm nút
    usernameError.textContent = "";
    passwordError.textContent = "";

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    let isValid = true; // Biến cờ hiệu để kiểm tra trạng thái hợp lệ

    // Kiểm tra tài khoản
    if (username === "") {
      usernameError.textContent = "Vui lòng nhập tài khoản!";
      isValid = false;
    }

    // Kiểm tra mật khẩu
    if (password === "") {
      passwordError.textContent = "Vui lòng nhập mật khẩu!";
      isValid = false;
    }

    // Nếu tất cả đều hợp lệ (đã nhập đủ)
    if (isValid) {
      alert("Đăng nhập thành công! (Chuyển hướng hoặc xử lý dữ liệu ở đây)");
    }
  });

  // 2. Xóa dòng chữ lỗi ngay khi người dùng bắt đầu gõ phím
  usernameInput.addEventListener("input", function () {
    usernameError.textContent = "";
  });

  passwordInput.addEventListener("input", function () {
    passwordError.textContent = "";
  });

  // 3. Xử lý nút ĐĂNG KÝ
  registerBtn.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  // 4. Xử lý nút THOÁT
  exitBtn.addEventListener("click", function () {
    window.location.href = "google.com";
  });
});
