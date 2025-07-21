const form = document.querySelector("form");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const passwordError = document.getElementById("passwordError");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  if (password !== confirmPassword) {
    passwordError.classList.remove("hidden");
    return;
  } else {
    passwordError.classList.add("hidden");
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((user) => user.email === email)) {
    alert("User with this email already exists.");
    return;
  }

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

  alert("Signup successful! You can now log in.");
  window.location.href = "login.html";
});
