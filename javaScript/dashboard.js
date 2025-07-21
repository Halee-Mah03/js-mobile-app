document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("js-hide-balance");
  const balanceText = document.getElementById("js-balance");
  const toggleText = document.getElementById("js-show-balance");
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutModal = document.getElementById("logoutModal");
  const confirmLogout = document.getElementById("confirmLogout");
  const cancelLogout = document.getElementById("cancelLogout");
  const transactionsBody = document.getElementById("transactions-body");
  const resetBtn = document.getElementById("resetBalance");

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!currentUser) {
    alert("Please log in first.");
    window.location.href = "login.html";
    return;
  }

  const formatBalance = (amount) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);

  document.getElementById(
    "js-username"
  ).textContent = `${currentUser.firstName} ${currentUser.lastName}`;

  function updateBalanceDisplay() {
    if (checkbox.checked) {
      balanceText.textContent = "*****";
      toggleText.textContent = "Show Balance";
    } else {
      balanceText.textContent = formatBalance(currentUser.balance || 0);
      toggleText.textContent = "Hide Balance";
    }
  }

  function displayTransactions() {
    const transactions = currentUser.transactions || [];

    if (transactions.length === 0) {
      transactionsBody.innerHTML = `
        <tr>
          <td colspan="3" class="text-center py-4 text-red-400">
            No transactions yet.
          </td>
        </tr>`;
      return;
    }

    transactionsBody.innerHTML = transactions
      .map(
        (tx) => `
      <tr>
        <td class="border border-gray-300 px-4 py-2">${tx.date}</td>
        <td class="border border-gray-300 px-4 py-2">${tx.description}</td>
        <td class="border border-gray-300 px-4 py-2 font-semibold ${
          tx.type === "credit" ? "text-green-600" : "text-red-500"
        }">
          ${tx.type === "credit" ? "+ " : "- "}₦${parseFloat(
          tx.amount
        ).toLocaleString()}
        </td>
      </tr>`
      )
      .join("");
  }

  updateBalanceDisplay();
  displayTransactions();

  checkbox.addEventListener("change", updateBalanceDisplay);

  resetBtn.addEventListener("click", () => {
    currentUser.balance = 100000;
    currentUser.transactions = [];

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    users = users.map((user) =>
      user.email === currentUser.email ? currentUser : user
    );
    localStorage.setItem("users", JSON.stringify(users));

    alert("Balance reset to ₦100,000 and transactions cleared.");
    updateBalanceDisplay();
    displayTransactions();
  });

  // Logout modal handlers
  logoutBtn.addEventListener("click", () => {
    logoutModal.classList.remove("hidden");
  });

  cancelLogout.addEventListener("click", () => {
    logoutModal.classList.add("hidden");
  });

  confirmLogout.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });
});
