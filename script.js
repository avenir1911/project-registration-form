document.addEventListener("DOMContentLoaded", () => { //Đợi trang tải xong mới chạy script

  const $ = (id) => document.getElementById(id);

  const form = $("registerForm"); //lấy form chính

  const buttons = {
    submit: $("submitBtn"),
    clear: $("clearBtn")
  }; // Lấy các nút submit và clear

  const inputs = {
    fullname: $("fullname"),
    dobDay: $("dobDay"),
    dobMonth: $("dobMonth"),
    dobYear: $("dobYear"),
    phone: $("phone"),
    email: $("email"),
    password: $("password"),
    confirm: $("confirmPassword"),
    city: $("city"),
    terms: $("terms")
  }; // Lấy tất cả input cần thiết

});

  // ĐỔ DỮ LIỆU NGÀY THÁNG NĂM
 const populateSelect = (element, start, end, step = 1) => {
  let options = "";
  for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
    options += `<option value="${i}">${i}</option>`;
  }
  element.innerHTML = options;
};

populateSelect(inputs.dobDay, 1, 31);
populateSelect(inputs.dobMonth, 1, 12);

const currentYear = new Date().getFullYear();
populateSelect(inputs.dobYear, currentYear, currentYear - 100, -1);

  // --- 2. DỮ LIỆU TỈNH THÀNH & DROPDOWN GỢI Ý ---
  const provinces = [
    "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu",
    "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
    "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk",
    "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang",
    "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang",
    "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu",
    "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An",
    "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam",
    "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh",
    "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang",
    "TP Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
  ];

  const renderDropdown = (list) => {
    cityDropdown.innerHTML = "";
    if (list.length === 0) {
      cityDropdown.innerHTML = '<div class="dropdown-item no-result">Không tìm thấy</div>';
    } else {
      list.forEach((prov) => {
        const item = document.createElement("div");
        item.className = "dropdown-item";
        item.innerText = prov;
        item.addEventListener("click", () => {
          inputs.city.value = prov;
          cityDropdown.classList.add("hidden");
          validateCity();
          checkAllValid();
        });
        cityDropdown.appendChild(item);
      });
    }
  };

  inputs.city.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    renderDropdown(provinces.filter((p) => p.toLowerCase().includes(keyword)));
    cityDropdown.classList.remove("hidden");
    validateCity();
    checkAllValid();
  });

  inputs.city.addEventListener("focus", () => {
    renderDropdown(provinces);
    cityDropdown.classList.remove("hidden");
  });

  document.addEventListener("click", (e) => {
    if (e.target !== inputs.city && e.target !== cityDropdown)
      cityDropdown.classList.add("hidden");
  });

  // --- 3. HÀM BÁO LỖI ---
  const showError = (id, msg) => {
    document.getElementById(`err-${id}`).innerText = msg;
  };
  const clearError = (id) => {
    document.getElementById(`err-${id}`).innerText = "";
  };

  // --- 4. CÁC HÀM KIỂM TRA (VALIDATE) ---
  const validateName = () => {
    const val = inputs.fullname.value; 
    
    if (val.trim() === "") {
      showError("fullname", "* Tên không được để trống.");
      return false;
    }
    
    const nameRegex = /^[a-zA-ZÀ-ỹđĐ\s]+$/;
    if (!nameRegex.test(val)) {
      showError("fullname", "* Tên chỉ được chứa chữ cái, không chứa số/ký hiệu.");
      return false;
    }

    if (val.trim().split(/\s+/).length < 2) {
      showError("fullname", "* Tên phải từ 2 từ trở lên (VD: Nguyễn Văn A).");
      return false;
    }

    clearError("fullname");
    return true;
  };

  const validateDob = () => {
    const d = inputs.dobDay.value, m = inputs.dobMonth.value, y = inputs.dobYear.value;
    if (!d || !m || !y) {
      showError("dob", "* Vui lòng chọn đủ Ngày/Tháng/Năm.");
      return false;
    }
    const date = new Date(y, m - 1, d), today = new Date();
    if (date.getFullYear() != y || date.getMonth() != m - 1 || date.getDate() != d) {
      showError("dob", "* Ngày sinh không hợp lệ.");
      return false;
    }
    if (date > today) {
      showError("dob", "* Ngày sinh không được ở tương lai.");
      return false;
    }
    let age = today.getFullYear() - date.getFullYear();
    if (today.getMonth() < date.getMonth() || (today.getMonth() === date.getMonth() && today.getDate() < date.getDate())) age--;
    if (age < 13) {
      showError("dob", "* Phải từ đủ 13 tuổi trở lên.");
      return false;
    }
    clearError("dob");
    return true;
  };

  const validatePhone = () => {
    const val = inputs.phone.value.trim();
    if (val === "") {
      showError("phone", "* SĐT không được để trống.");
      return false;
    }
    if (!/^\d{9,11}$/.test(val)) {
      showError("phone", "* Chỉ chứa số, dài 9-11 ký tự.");
      return false;
    }
    clearError("phone");
    return true;
  };

  const validateEmail = () => {
    const val = inputs.email.value.trim();
    if (val === "") {
      showError("email", "* Email không được để trống.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      showError("email", "* Sai định dạng (VD: abc@gmail.com).");
      return false;
    }
    clearError("email");
    return true;
  };

  const validatePassword = () => {
    const val = inputs.password.value;
    if (val === "") {
      showError("password", "* Mật khẩu không được để trống.");
      return false;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(val)) {
      showError("password", "* Tối thiểu 8 ký tự, gồm 1 chữ và 1 số.");
      return false;
    }
    if (inputs.confirm.value !== "") validateConfirmPassword();
    clearError("password");
    return true;
  };

  const validateConfirmPassword = () => {
    const val = inputs.confirm.value;
    if (val === "") {
      showError("confirm", "* Vui lòng nhập lại mật khẩu.");
      return false;
    }
    if (val !== inputs.password.value) {
      showError("confirm", "* Mật khẩu nhập lại không khớp.");
      return false;
    }
    clearError("confirm");
    return true;
  };

  const validateCity = () => {
    if (inputs.city.value.trim() === "") {
      showError("city", "* Tỉnh/Thành phố không được để trống.");
      return false;
    }
    clearError("city");
    return true;
  };

  // --- 5. LẮNG NGHE SỰ KIỆN (BẬT/TẮT NÚT ĐĂNG KÝ) ---
  const checkAllValid = () => {
    const isValid = validateName() && validateDob() && validatePhone() &&
      validateEmail() && validatePassword() && validateConfirmPassword() &&
      validateCity() && inputs.terms.checked;
    btnSubmit.disabled = !isValid;
  };

  // --- CHẶN KHOẢNG TRẮNG KÉP ---
  inputs.fullname.addEventListener("keydown", function(e) {
    if (e.key === " " && this.value.length === 0) {
      e.preventDefault();
    }
    if (e.key === " " && this.value.endsWith(" ")) {
      e.preventDefault();
    }
  });

  inputs.fullname.addEventListener("input", () => {
    validateName();
    checkAllValid();
  });

  inputs.fullname.addEventListener("blur", function() {
    this.value = this.value.replace(/[^a-zA-ZÀ-ỹđĐ\s]/g, ""); 
    this.value = this.value.trim().replace(/\s{2,}/g, " ");
    validateName();
    checkAllValid();
  });

  [inputs.dobDay, inputs.dobMonth, inputs.dobYear].forEach((el) => {
    el.addEventListener("change", () => { validateDob(); checkAllValid(); });
  });

  inputs.phone.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, ""); 
    validatePhone();
    checkAllValid();
  });
  inputs.phone.addEventListener("blur", validatePhone);

  inputs.email.addEventListener("input", () => { validateEmail(); checkAllValid(); });
  inputs.email.addEventListener("blur", validateEmail);

  inputs.password.addEventListener("input", () => { validatePassword(); checkAllValid(); });
  inputs.password.addEventListener("blur", validatePassword);

  inputs.confirm.addEventListener("input", () => { validateConfirmPassword(); checkAllValid(); });
  inputs.confirm.addEventListener("blur", validateConfirmPassword);

  inputs.city.addEventListener("blur", () => { setTimeout(validateCity, 200); });
  inputs.terms.addEventListener("change", checkAllValid);

  // --- 6. XỬ LÝ SUBMIT, HIỂN THỊ TÓM TẮT VÀ NÚT OK ---
  form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    
    if (validateName() && validateDob() && validatePhone() && validateEmail() && validatePassword() && validateConfirmPassword() && validateCity() && inputs.terms.checked) {
      
      const gender = document.querySelector('input[name="gender"]:checked').value;
      const dob = `${inputs.dobDay.value}/${inputs.dobMonth.value}/${inputs.dobYear.value}`;

      const userData = {
        name: inputs.fullname.value,
        dob: dob,
        gender: gender,
        phone: inputs.phone.value,
        email: inputs.email.value,
        city: inputs.city.value,
      };
      
      localStorage.setItem("userForm", JSON.stringify(userData));

      // Đổ dữ liệu vào bảng tóm tắt
      document.getElementById("sum-name").innerText = userData.name;
      document.getElementById("sum-dob").innerText = userData.dob;
      document.getElementById("sum-gender").innerText = userData.gender;
      document.getElementById("sum-phone").innerText = userData.phone;
      document.getElementById("sum-email").innerText = userData.email;
      document.getElementById("sum-city").innerText = userData.city;

      // Ẩn form và hiện bảng tóm tắt
      form.classList.add("hidden");
      document.getElementById("summaryBox").classList.remove("hidden");
    }
  });

  // Sự kiện cho nút OK để chuyển sang trang Đăng nhập
  const okBtn = document.getElementById("okBtn");
  if(okBtn) {
    okBtn.addEventListener("click", () => {
      window.location.href = "index_dangnhap.html";
    });
  }

  btnClear.addEventListener("click", () => {
    form.reset(); 
    document.querySelectorAll(".error-msg").forEach((el) => (el.innerText = ""));
    btnSubmit.disabled = true; 
  });
