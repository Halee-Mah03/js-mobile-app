document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const passwordError = document.getElementById("passwordError");
  const loginLink = document.getElementById("loginLink");

  const eyeButton = document.querySelector(
    'button[title="Toggle Password Visibility"]'
  );
  const eyeIcon = document.getElementById("eyeIcon");

  eyeButton?.addEventListener("click", (e) => {
    e.preventDefault();

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.setAttribute("stroke", "#22c55e");
    } else {
      passwordInput.type = "password";
      eyeIcon.setAttribute("stroke", "#bbb");
    }
  });

  confirmPasswordInput.addEventListener("input", () => {
    if (confirmPasswordInput.value !== passwordInput.value) {
      passwordError.textContent = "Passwords do not match.";
      passwordError.classList.remove("hidden");
    } else {
      passwordError.classList.add("hidden");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      !password ||
      !confirmPassword
    ) {
      return alert("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      passwordError.textContent = "Passwords do not match.";
      passwordError.classList.remove("hidden");
      return;
    } else {
      passwordError.classList.add("hidden");
    }

    const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
    if (!strongPassword.test(password)) {
      return alert(
        "Password must be at least 8 characters and include letters, numbers, and symbols."
      );
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === email))
      return alert("User with this email already exists.");

    const newUser = {
      firstName,
      lastName,
      email,
      address,
      password,
      balance: 100000,
      transactions: [],
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    window.location.href = "dashboard.html"; // immediate redirect
  });

  loginLink?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "login.html";
  });
});
