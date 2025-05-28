document.addEventListener("DOMContentLoaded", () => {
  const userEmail = localStorage.getItem("currentUserEmail");
  const headerTopAction = document.querySelector(".header-top-action");

  if (headerTopAction) {
    if (userEmail) {
      headerTopAction.textContent = "Logout";
      headerTopAction.href = "#";
      headerTopAction.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("currentUserEmail");
        localStorage.removeItem("wishlist");
        localStorage.removeItem("authenticatedUserId");
        localStorage.removeItem("cart");
        alert("You have been logged out.");
        window.location.href = "index.html"; // Or reload: location.reload();
      });
    } else {
      headerTopAction.textContent = "Login / Register";
      headerTopAction.href = "login-register.html";
    }
  }
});
