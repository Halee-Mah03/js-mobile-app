document.addEventListener("DOMContentLoaded", () => {
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.querySelector("input[name='password']");
  const eyeIcon = document.getElementById("eyeIcon");

  togglePassword.addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    if (type === "text") {
      eyeIcon.setAttribute("fill", "#000");
      eyeIcon.setAttribute("stroke", "#000");
    } else {
      eyeIcon.setAttribute("fill", "#bbb");
      eyeIcon.setAttribute("stroke", "#bbb");
    }
  });

  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector("input[name='email']").value.trim();
    const password = passwordInput.value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password.");
    }
  });
});
