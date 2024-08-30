const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});

// ฟังก์ชันการสมัครสมาชิก
function signupUser() {
    const displayName = document.getElementById('displayName').value;
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    if (!displayName || !username || !password) {
        Swal.fire({
            icon: 'error',
            title: 'กรอกข้อมูลไม่ครบ',
            text: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
            confirmButtonText: 'ตกลง'
        });
        return;
    }

    // ดึงข้อมูลผู้ใช้ทั้งหมดจาก Local Storage และตรวจสอบว่ามีหรือไม่
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // ตรวจสอบว่าชื่อผู้ใช้ซ้ำหรือไม่
    if (storedUsers.some(user => user.username === username)) {
        Swal.fire({
            icon: 'error',
            title: 'ชื่อผู้ใช้ซ้ำ',
            text: 'ชื่อผู้ใช้ที่เลือกมีอยู่แล้ว โปรดเลือกชื่ออื่น',
            confirmButtonText: 'ตกลง'
        });
        return;
    }

    // เพิ่มผู้ใช้ใหม่ไปยังอาร์เรย์
    storedUsers.push({ displayName, username, password });

    // เก็บอาร์เรย์ผู้ใช้ที่อัปเดตลงใน Local Storage
    localStorage.setItem('users', JSON.stringify(storedUsers));

    Swal.fire({
        icon: 'success',
        title: 'สมัครสมาชิกสำเร็จ!',
        text: 'กรุณาเข้าสู่ระบบ.',
        confirmButtonText: 'ตกลง'
    }).then(() => {
        loginBtn.click(); // สลับไปยังฟอร์มการเข้าสู่ระบบ
    });
}

// ฟังก์ชันการเข้าสู่ระบบ
function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const storedUsers = JSON.parse(localStorage.getItem('users')) || []; // ดึงข้อมูลผู้ใช้ทั้งหมดจาก Local Storage

    // ตรวจสอบข้อมูลผู้ใช้ที่ถูกเก็บไว้กับข้อมูลที่กรอกในฟอร์ม
    const user = storedUsers.find(user => user.username === username && user.password === password);

    if (user) {
        Swal.fire({
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
            text: 'คุณจะถูกนำไปยังหน้าถัดไป',
            confirmButtonText: 'ตกลง'
        }).then(() => {
            localStorage.setItem('currentUser', JSON.stringify(user)); // เก็บข้อมูลผู้ใช้ที่กำลังล็อกอิน
            window.location.href = 'borrow.html'; // เปลี่ยนเส้นทางไปยัง borrow.html
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
            text: 'กรุณาลองใหม่',
            confirmButtonText: 'ตกลง'
        });
    }
}

// ฟังก์ชันการลบผู้ใช้
function deleteUser(username) {
    // ดึงข้อมูลผู้ใช้ทั้งหมดจาก Local Storage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // กรองข้อมูลผู้ใช้ที่ไม่ต้องการลบออก
    const updatedUsers = storedUsers.filter(user => user.username !== username);

    // บันทึกอาร์เรย์ผู้ใช้ที่อัปเดตลงใน Local Storage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    Swal.fire({
        icon: 'success',
        title: 'ลบผู้ใช้สำเร็จ!',
        text: `ข้อมูลของ ${username} ถูกลบเรียบร้อยแล้ว`,
        confirmButtonText: 'ตกลง'
    });
}



