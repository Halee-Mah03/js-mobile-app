document.addEventListener("DOMContentLoaded", () => {
  const transactionsBody = document.getElementById("transactions-body");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const usernameEl = document.getElementById("js-username");
  const balanceEl = document.getElementById("js-balance");

  if (!loggedInUser) return (window.location.href = "login.html");

  usernameEl.textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
  balanceEl.textContent = `₦${loggedInUser.balance.toLocaleString()}`;

  const transactions = loggedInUser.transactions || [];

  transactionsBody.innerHTML = transactions
    .map(
      (tx) => `
  <tr class="hover:bg-black/40 cursor-pointer">
    <td class="border border-gray-300 px-4 py-2">${tx.date}</td>
    <td class="border border-gray-300 px-4 py-2">${tx.description}</td>
    <td class="border border-gray-300 px-4 py-2 font-bold ${
      tx.type === "debit" ? "text-red-500" : "text-green-500"
    }">
      ${tx.type === "debit" ? "-" : "+"}₦${parseFloat(
        tx.amount
      ).toLocaleString()}
    </td>
  </tr>
`
    )
    .join("");

  const hideBalanceCheckbox = document.getElementById("js-hide-balance");
  const showBalanceText = document.getElementById("js-show-balance");
  hideBalanceCheckbox.addEventListener("change", () => {
    if (hideBalanceCheckbox.checked) {
      balanceEl.textContent = "₦******";
      showBalanceText.textContent = "Show Balance";
    } else {
      balanceEl.textContent = `₦${loggedInUser.balance.toLocaleString()}`;
      showBalanceText.textContent = "Hide Balance";
    }
  });

  const logoutBtn = document.getElementById("logoutBtn");
  const logoutModal = document.getElementById("logoutModal");
  const cancelLogout = document.getElementById("cancelLogout");
  const confirmLogout = document.getElementById("confirmLogout");

  logoutBtn.addEventListener("click", () =>
    logoutModal.classList.remove("hidden")
  );
  cancelLogout.addEventListener("click", () =>
    logoutModal.classList.add("hidden")
  );
  confirmLogout.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });

  const resetBalanceBtn = document.getElementById("resetBalance");
  resetBalanceBtn.addEventListener("click", () => {
    loggedInUser.balance = 100000;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    balanceEl.textContent = `₦${loggedInUser.balance.toLocaleString()}`;
    alert("Balance has been reset to ₦100,000");
  });
});
