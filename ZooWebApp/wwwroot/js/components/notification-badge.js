document.addEventListener("DOMContentLoaded", async function () {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    const badge = document.getElementById("notification-badge");
    if (!badge) return;

    try {
        const response = await fetch(`/api/UsersAPI/${userId}/upcomingEvents`);
        if (!response.ok) throw new Error("Failed to fetch notifications");

        const events = await response.json();
        const eventIds = events.map(e => e.eventID).sort(); 
        const eventKey = JSON.stringify(eventIds);

        // read last record
        const prevKey = sessionStorage.getItem("notifEventKey") || "";
        const notifRead = sessionStorage.getItem("notifRead") === "true";

        // if collection changes
        if (eventKey !== prevKey) {
            sessionStorage.setItem("notifRead", "false"); 
            sessionStorage.setItem("notifEventKey", eventKey); 
        }

        const shouldShow = events.length > 0 && sessionStorage.getItem("notifRead") !== "true";
        badge.classList.toggle("hidden", !shouldShow);

    } catch (err) {
        console.error("Error checking notifications:", err);
    }
});

// mark as read after clicking
document.addEventListener("click", function (e) {
    const link = e.target.closest('a[href*="notification"]');
    if (link) {
        const badge = document.getElementById("notification-badge");
        if (badge) badge.classList.add("hidden");
        sessionStorage.setItem("notifRead", "true");
    }
});
