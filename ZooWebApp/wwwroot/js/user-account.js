// Display info
document.addEventListener("DOMContentLoaded", async function () {
    // Display username
    const username = sessionStorage.getItem("username");
    const usernameElement = document.getElementById("username");
    if (username && usernameElement) {
        usernameElement.textContent = username;
    }

    // Load user info
    const userId = sessionStorage.getItem("userId");
    if (userId) {
    try {
        const response = await fetch(`/api/UsersAPI/${userId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch user profile");
        }

        const user = await response.json();

        // User profile fields
        document.getElementById("profile-username").textContent = user.username || "—";
        document.getElementById("profile-fullname").textContent = user.fullName || "—";
        document.getElementById("profile-address").textContent = user.address || "—";
        document.getElementById("profile-email").textContent = user.email || "—";
        document.getElementById("profile-phone").textContent = user.phone || "—";

    } catch (error) {
        console.error("Error loading user profile:", error);
    }
}

const buttons = document.querySelectorAll(".tab-btn");
const tabs = document.querySelectorAll(".tab-content");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const tabId = btn.dataset.tab;
        tabs.forEach(tab => tab.classList.add("hidden"));
        document.getElementById(tabId).classList.remove("hidden");

        // update url without refresh
        const newUrl = `${window.location.pathname}?tab=${tabId}`;
        history.replaceState(null, '', newUrl);
    });
});

// URL param to auto-switch tab
const params = new URLSearchParams(window.location.search);
const tabParam = params.get("tab");

if (tabParam) {
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabParam}"]`);
    const targetTab = document.getElementById(tabParam);

    if (targetBtn && targetTab) {
        buttons.forEach(b => b.classList.remove("active"));
        tabs.forEach(t => t.classList.add("hidden"));

        targetBtn.classList.add("active");
        targetTab.classList.remove("hidden");
    }
}
});

