document.addEventListener("DOMContentLoaded", () => {
  const transferForm = document.getElementById("transfer-form");

  transferForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const accountNumber = document.getElementById("account-number").value;
    const amountInput = document.getElementById("amount").value;
    const amount = parseFloat(amountInput);

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid positive amount.");
      return;
    }

    const description = document.getElementById("description").value;

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      alert("User not logged in.");
      return;
    }

    let balance = parseFloat(loggedInUser.balance) || 0;

    if (amount > balance) {
      alert("Insufficient balance.");
      return;
    }

    const newTransaction = {
      date: new Date().toLocaleString(),
      description,
      amount,
      recipient: accountNumber,
      type: "debit",
    };

    loggedInUser.transactions = Array.isArray(loggedInUser.transactions)
      ? [newTransaction, ...loggedInUser.transactions]
      : [newTransaction];

    loggedInUser.balance = balance - amount;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map((user) =>
      user.email === loggedInUser.email ? loggedInUser : user
    );
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));

    transferForm.reset();
    alert("Transfer successful!");
    window.location.href = "dashboard.html";
  });
});
