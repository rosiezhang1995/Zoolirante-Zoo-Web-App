document.addEventListener("DOMContentLoaded", async function () {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    const badge = document.getElementById("notification-badge");
    if (!badge) return; 

    try {
        const response = await fetch(`/api/UsersAPI/${userId}/upcomingEvents`);
        if (!response.ok) throw new Error("Failed to fetch notifications");

        const events = await response.json();

        // show dot if there are upcoming events
        if (events.length > 0) {
            badge.classList.remove("hidden");
        } else {
            badge.classList.add("hidden");
        }
    } catch (err) {
        console.error("Error checking notifications:", err);
    }
});

// clear red dot after clicking
document.addEventListener("click", function (e) {
    if (e.target.closest('[href*="notification"]')) {
        const badge = document.getElementById("notification-badge");
        if (badge) badge.classList.add("hidden");
    }
});
