
function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.querySelectorAll(".toggle-password").forEach(function(button) {
  button.addEventListener("click", function() {
    var input = document.getElementById(button.dataset.target);
    input.type = input.type === "password" ? "text" : "password";
  });
});

var registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("registerEmail").value.trim().toLowerCase();
    var password = document.getElementById("registerPassword").value;
    var confirm = document.getElementById("confirmPassword").value;
    var message = document.getElementById("registerMessage");

    message.className = "form-message";

    if (name.length < 2) {
      message.textContent = "Введите имя (минимум 2 символа).";
    } else if (!validEmail(email)) {
      message.textContent = "Введите корректную почту.";
    } else if (password.length < 6) {
      message.textContent = "Пароль должен быть не короче 6 символов.";
    } else if (password !== confirm) {
      message.textContent = "Пароли не совпадают.";
    } else {
      var users = JSON.parse(localStorage.getItem("echoUsers") || "[]");
      var exists = users.some(function(user) {
        return user.email === email;
      });

      if (exists) {
        message.textContent = "Такая почта уже зарегистрирована.";
      } else {
        users.push({ name: name, email: email, password: password });
        localStorage.setItem("echoUsers", JSON.stringify(users));

        message.className = "form-message success";
        message.textContent = "Регистрация успешна!";

        setTimeout(function() {
          location.href = "login.html";
        }, 800);
      }
    }
  });
}


var loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var email = document.getElementById("loginEmail").value.trim().toLowerCase();
    var password = document.getElementById("loginPassword").value;
    var message = document.getElementById("loginMessage");
    var users = JSON.parse(localStorage.getItem("echoUsers") || "[]");

    message.className = "form-message";

    if (!validEmail(email)) {
      message.textContent = "Введите корректную почту.";
      return;
    }

    if (!password) {
      message.textContent = "Введите пароль.";
      return;
    }

    var user = users.find(function(item) {
      return item.email === email && item.password === password;
    });

    if (!user) {
      message.textContent = "Неверная почта или пароль.";
    } else {
      message.className = "form-message success";
      message.textContent = "Добро пожаловать, " + user.name + "!";

      if (document.getElementById("rememberMe").checked) {
        localStorage.setItem("echoCurrentUser", email);
      } else {
        sessionStorage.setItem("echoCurrentUser", email);
      }
    }
  });
}


var forgotLink = document.getElementById("forgotLink");

if (forgotLink) {
  forgotLink.addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("loginMessage").textContent =
      "Восстановление пароля пока не реализовано.";
  });
}