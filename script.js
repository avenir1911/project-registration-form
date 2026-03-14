const hoten = document.getElementById("fullname");
const baoloi = document.getElementById("err-fullname");

hoten.addEventListener("input", function() {
  const giatri = this.value.trim();
  if (giatri === "") {
    baoloi.textContent = "Họ tên không được để trống.";
  } else if (!giatri.includes(" ")) { 
    baoloi.textContent = "Vui lòng nhập đầy đủ họ và tên (ít nhất 2 từ).";
  } else {
    baoloi.textContent = ""; 
  } 
});

const dobDay = document.getElementById("dobDay");
const dobMonth = document.getElementById("dobMonth");
const dobYear = document.getElementById("dobYear");
const errDob = document.getElementById("err-dob");

for (let i = 1; i <= 31; i++) {
  const option = document.createElement("option"); option.value = i; option.textContent = i;
  dobDay.appendChild(option);
}
for (let i = 1; i <= 12; i++) {
  const option = document.createElement("option"); option.value = i; option.textContent = i;
  dobMonth.appendChild(option);
}
let namHienTai = new Date().getFullYear();
for (let i = namHienTai; i >= 1900; i--) {
  const option = document.createElement("option"); option.value = i; option.textContent = i;
  dobYear.appendChild(option);
}

function kiemTraTuoi() {
  let giatriNgay = dobDay.value; let giatriThang = dobMonth.value; let giatriNam = dobYear.value;
  if (giatriNgay === "" || giatriThang === "" || giatriNam === "") {
    errDob.textContent = "Vui lòng chọn đầy đủ ngày, tháng, năm sinh.";
    return; 
  }
  const homNay = new Date();
  const ngaySinh = parseInt(giatriNgay); const thangSinh = parseInt(giatriThang); const namSinh = parseInt(giatriNam);
  let tuoi = homNay.getFullYear() - namSinh;
  let hopLe = false;
  if (tuoi > 13) {
    hopLe = true;
  } else if (tuoi === 13) {
    if (homNay.getMonth() + 1 > thangSinh || (homNay.getMonth() + 1 === thangSinh && homNay.getDate() >= ngaySinh)) {
      hopLe = true;
    }
  }
  if (hopLe) { errDob.textContent = ""; } else { errDob.textContent = "Bạn phải đủ 13 tuổi để đăng ký."; }
}
dobDay.addEventListener("change", kiemTraTuoi);
dobMonth.addEventListener("change", kiemTraTuoi);
dobYear.addEventListener("change", kiemTraTuoi);

const phoneInput = document.getElementById('phone');
const errPhone = document.getElementById('err-phone');

phoneInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
    const phoneRegex = /^0\d{8,10}$/; 
    if (this.value === '') {
        errPhone.textContent = 'Vui lòng nhập số điện thoại.';
    } else if (!phoneRegex.test(this.value)) {
        errPhone.textContent = 'Số điện thoại phải bắt đầu bằng 0 và có 9-11 số.';
    } else {
        errPhone.textContent = ''; 
    }
});

const email = document.getElementById("email");
const errEmail = document.getElementById("err-email");

email.addEventListener("input", function() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (this.value.trim() === "") {
      errEmail.textContent = "Email không được để trống.";
  } else if (!regex.test(this.value.trim())) {
    errEmail.textContent = "Email không hợp lệ.";
  } else {
      errEmail.textContent = "";
  }
});

const matkhau = document.getElementById("password");
const errMatkhau = document.getElementById("err-password");
const nhapLaiMatKhau = document.getElementById("confirmPassword");
const errConfirm = document.getElementById("err-confirm");

function kiemTraMatKhau(password) {
  return /^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/.test(password);
}

matkhau.addEventListener("input", function() {
  const giatri = this.value.trim();
  if (giatri === "") {
    errMatkhau.textContent = "Mật khẩu không được để trống.";
  } else if (!kiemTraMatKhau(giatri)) {
    errMatkhau.textContent = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số.";
  } else {
    errMatkhau.textContent = "";
  }
  if (nhapLaiMatKhau.value.trim() !== "") { nhapLaiMatKhau.dispatchEvent(new Event('input')); }
});

nhapLaiMatKhau.addEventListener("input", function() {
  const giatri = this.value.trim();
  if (giatri === "") {
    errConfirm.textContent = "Vui lòng nhập lại mật khẩu.";
  } else if (giatri !== matkhau.value.trim()) {
    errConfirm.textContent = "Mật khẩu nhập lại không khớp.";
  } else {
    errConfirm.textContent = ""; 
  }
});

const cityInput = document.getElementById("city");
const cityDropdown = document.getElementById("cityDropdown");
const errCity = document.getElementById("err-city");
const cities = [
  "An Giang", "Bắc Ninh", "Cà Mau", "Cao Bằng", "Cần Thơ", "Đà Nẵng", "Đắk Lắk", 
  "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Nội", "Hà Tĩnh", "Hải Phòng", 
  "Huế", "Hưng Yên", "Khánh Hòa", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", 
  "Nghệ An", "Ninh Bình", "Phú Thọ", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", 
  "Sơn La", "Tây Ninh", "Thanh Hóa", "Thái Nguyên", "TP Hồ Chí Minh", "Tuyên Quang", "Vĩnh Long",
];

function showCities(filter = "") {
  cityDropdown.innerHTML = "";
  const filteredCities = cities.filter(city => city.toLowerCase().includes(filter.toLowerCase()));

  if (filteredCities.length === 0) {
    const noResult = document.createElement("div");
    noResult.textContent = "Không tìm thấy tỉnh/thành";
    noResult.classList.add("dropdown-item", "no-result");
    cityDropdown.appendChild(noResult);
  }

  filteredCities.forEach(city => {
    const item = document.createElement("div");
    item.classList.add("dropdown-item");
    item.textContent = city;
    item.addEventListener("click", function () {
      cityInput.value = city;
      cityDropdown.classList.add("hidden");
      errCity.textContent = "";
      kiemTraMoKhoaNutDangKy(); 
    });
    cityDropdown.appendChild(item);
  });
  cityDropdown.classList.remove("hidden");
}

cityInput.addEventListener("focus", function () { showCities(); });
cityInput.addEventListener("input", function () { showCities(cityInput.value); });
document.addEventListener("click", function (e) {
  if (!cityInput.contains(e.target) && !cityDropdown.contains(e.target)) {
    cityDropdown.classList.add("hidden");
  }
});

function taoConMatChoOInput(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.style.paddingRight = "35px";
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  input.parentNode.insertBefore(wrapper, input);
  wrapper.appendChild(input);

  const eye = document.createElement("span");
  eye.textContent = "🐵";
  eye.style.position = "absolute"; eye.style.right = "10px"; eye.style.top = "50%";
  eye.style.transform = "translateY(-50%)"; eye.style.cursor = "pointer";
  eye.style.userSelect = "none"; eye.style.fontSize = "16px"; eye.style.opacity = "0.7";

  eye.addEventListener("mouseenter", function() { eye.style.opacity = "1"; });
  eye.addEventListener("mouseleave", function() { eye.style.opacity = "0.7"; });
  wrapper.appendChild(eye);

  eye.addEventListener("click", function() {
    if (input.type === "password") {
      input.type = "text";  eye.textContent = "🙈";  
    } else {
      input.type = "password"; eye.textContent = "🐵";  
    }
  });
}
taoConMatChoOInput("password"); taoConMatChoOInput("confirmPassword");

const termsCheckbox = document.getElementById("terms");
const submitBtn = document.getElementById("submitBtn");
const registerForm = document.getElementById('registerForm');
const clearBtn = document.getElementById('clearBtn');

const tatCaThongBaoLoi = document.querySelectorAll('.error-msg');
const cacOBatBuoc = [
  document.getElementById("fullname"), document.getElementById("phone"),
  document.getElementById("email"), document.getElementById("password"),
  document.getElementById("confirmPassword"), document.getElementById("city")
];

function kiemTraMoKhoaNutDangKy() {
  let coLoi = false; let coOTrong = false;
  tatCaThongBaoLoi.forEach(loi => { if (loi.textContent !== "") coLoi = true; });
  cacOBatBuoc.forEach(o => { if (o.value.trim() === "") coOTrong = true; });
  
  if (!coLoi && !coOTrong && termsCheckbox.checked) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}


document.querySelectorAll('#registerForm input, #registerForm select').forEach(function(element) {
    element.addEventListener('input', kiemTraMoKhoaNutDangKy);
    element.addEventListener('change', kiemTraMoKhoaNutDangKy);
});


clearBtn.addEventListener('click', function() {
    registerForm.reset();
    tatCaThongBaoLoi.forEach(function(errorSpan) { errorSpan.textContent = ''; });
    submitBtn.disabled = true;
});


registerForm.addEventListener("submit", function (e) {
  if (cityInput.value.trim() === "") {
    e.preventDefault();
    errCity.textContent = "Vui lòng chọn Tỉnh/Thành phố";
  }
});