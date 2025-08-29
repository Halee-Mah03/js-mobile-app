document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.getElementById("loginContainer");
  const registerLink = document.getElementById("registerLink");
  const form = document.querySelector("form");
  const passwordInput = document.getElementById("password");
  const emailInput = document.getElementById("email");
  const togglePasswordBtn = document.querySelector(
    'button[title="Toggle Password Visibility"]'
  );
  const eyeIcon = document.getElementById("eyeIcon");

  setTimeout(() => {
    loginContainer.classList.add("show");
  }, 100);

  togglePasswordBtn.addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    if (type === "text") {
      eyeIcon.setAttribute("stroke", "#00FF00");
    } else {
      eyeIcon.setAttribute("stroke", "#bbb");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

      loginContainer.style.transform = "translateX(-100vw)";
      loginContainer.style.opacity = "0";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500);
    } else {
      alert("Invalid email or password.");
    }
  });

  registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginContainer.style.transform = "translateX(-100vw)";
    loginContainer.style.opacity = "0";

    setTimeout(() => {
      window.location.href = "signup.html";
    }, 600);
  });
});
