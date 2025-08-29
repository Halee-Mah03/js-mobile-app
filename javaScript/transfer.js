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

    let balance = parseFloat(localStorage.getItem("balance"));
    if (isNaN(balance)) {
      balance = 100000;
    }

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

    const existing = JSON.parse(localStorage.getItem("transactions")) || [];
    existing.unshift(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(existing));

    balance -= amount;
    localStorage.setItem("balance", balance.toFixed(2));

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("users")) || [];

    currentUser.balance = balance;
    currentUser.transactions = existing;

    // Update both keys for compatibility
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("loggedInUser", JSON.stringify(currentUser));

    users = users.map((user) =>
      user.email === currentUser.email ? currentUser : user
    );
    localStorage.setItem("users", JSON.stringify(users));

    transferForm.reset();
    alert("Transfer successful!");
    window.location.href = "dashboard.html";
  });
});
