<?php
$servername = "localhost";
$username = "root"; 
$password = "";     
$dbname = "db_dangky";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $fullname = $_POST['fullname'];
    $gender = $_POST['gender'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $city = $_POST['city'];
    
    $dobDay = $_POST['dobDay'];
    $dobMonth = $_POST['dobMonth'];
    $dobYear = $_POST['dobYear'];
    $dob = sprintf("%04d-%02d-%02d", $dobYear, $dobMonth, $dobDay);

    $hashed_password = password_hash($_POST['password'], PASSWORD_DEFAULT);


    $stmt = $conn->prepare("INSERT INTO users (fullname, dob, gender, phone, email, password, city) VALUES (?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param("sssssss", $fullname, $dob, $gender, $phone, $email, $hashed_password, $city);

  
    if ($stmt->execute()) {
        echo "<script>
                alert('🎉 Chúc mừng! Đăng ký thành công và đã lưu vào Database!');
                window.location.href = 'index.html'; // Quay lại trang chủ
              </script>";
    } else {
       
        if ($conn->errno == 1062) {
            echo "<script>
                    alert('❌ Lỗi: Email này đã được đăng ký!');
                    window.history.back(); // Quay lại trang trước
                  </script>";
        } else {
            echo "Lỗi: " . $stmt->error;
        }
    }

    // Đóng kết nối
    $stmt->close();
    $conn->close();
}
?>