document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.getElementById("js-menu-btn");

  if (sidebar) {
    fetch("sidebar.html")
      .then((res) => res.text())
      .then((html) => {
        sidebar.innerHTML = html;

        const logoutBtn = document.getElementById("logoutBtn");
        const logoutDialog = document.getElementById("logoutDialog");
        const confirmLogout = document.getElementById("confirmLogout");
        const cancelLogout = document.getElementById("cancelLogout");

        if (logoutBtn) {
          logoutBtn.addEventListener("click", () => {
            logoutDialog.classList.remove("hidden");
            logoutDialog.classList.add("flex");
          });
        }

        if (confirmLogout) {
          confirmLogout.addEventListener("click", () => {
            localStorage.removeItem("loggedIn");
            window.location.href = "login.html";
          });
        }

        if (cancelLogout) {
          cancelLogout.addEventListener("click", () => {
            logoutDialog.classList.add("hidden");
            logoutDialog.classList.remove("flex");
          });
        }

        logoutDialog.addEventListener("click", (e) => {
          if (e.target === logoutDialog) {
            logoutDialog.classList.add("hidden");
            logoutDialog.classList.remove("flex");
          }
        });
      })
      .catch((err) => {
        console.error("Sidebar failed to load:", err);
      });
  }

  menuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("hidden");
    menuBtn.classList.toggle("open");

    const spans = menuBtn.querySelectorAll("span");
    if (menuBtn.classList.contains("open")) {
      spans[0].classList.add("rotate-45", "translate-y-1.5");
      spans[1].classList.add("opacity-0");
      spans[2].classList.add("-rotate-45", "-translate-y-1.5");
    } else {
      spans[0].classList.remove("rotate-45", "translate-y-1.5");
      spans[1].classList.remove("opacity-0");
      spans[2].classList.remove("-rotate-45", "-translate-y-1.5");
    }
  });
});
