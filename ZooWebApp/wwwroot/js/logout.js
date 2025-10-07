document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");
    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", function () {
        // Clear session
        sessionStorage.clear();

        // Save message before redirect
        sessionStorage.setItem("toastMessage", "You’ve successfully logged out!");

        // Go home
        window.location.href = "/";
    });
});
