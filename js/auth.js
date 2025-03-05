document.getElementById("login").addEventListener("click", function () {
  if (document.querySelector("h1").textContent == "signup") {
    document.querySelector('input[type="submit"]').value = "login";
    document.querySelector("h1").textContent = "login";
    document.querySelector("form div").textContent = "create an account";
    document.querySelector("#laname").style.display = "none";
    document.querySelector("#name").style.display = "none";
  } else {
    document.querySelector('input[type="submit"]').value = "signup";
    document.querySelector("h1").textContent = "signup";
    document.querySelector("form div").textContent = "i have an account";
    document.querySelector("#laname").style.display = "";
    document.querySelector("#name").style.display = "";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const mixform = document.getElementById("mix-form");

  // تسجيل مستخدم جديد مع تشفير كلمة المرور
  mixform.addEventListener("submit", function (e) {
    e.preventDefault();
    if (document.querySelector("h1").textContent == "signup") {
      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;

      let users = JSON.parse(localStorage.getItem("users")) || [];

      // التحقق من أن البريد الإلكتروني غير مستخدم من قبل
      if (users.some((user) => user.email === email)) {
        alert("⚠️ هذا البريد مستخدم بالفعل، جرّب بريدًا آخر.");
        return;
      }

      // 🔒 تشفير كلمة المرور قبل التخزين
      let encryptedPassword = btoa(password);

      // تخزين المستخدم الجديد
      users.push({ name, email, password: encryptedPassword });
      localStorage.setItem("users", JSON.stringify(users));

      alert("✅ تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.");
      mixform.reset();
    } else {
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;

      let users = JSON.parse(localStorage.getItem("users")) || [];

      // البحث عن المستخدم مع فك تشفير كلمة المرور
      let user = users.find(
        (user) => user.email === email && user.password === btoa(password)
      );

      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert(`✅ مرحبًا ${user.name}! تم تسجيل الدخول بنجاح.`);
        window.location.href = "./pages/main.html"; // تحويل المستخدم للصفحة الرئيسية
      } else {
        alert("❌ البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    // ✅ إذا كان المستخدم مسجل دخوله، انقله للصفحة الرئيسية
    window.location.href = "./pages/main.html"; // استبدلها بالصفحة المناسبة
  }
});
