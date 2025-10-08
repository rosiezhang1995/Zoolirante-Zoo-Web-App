document.addEventListener("DOMContentLoaded", async function () {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    const badge = document.getElementById("notification-badge");
    if (!badge) return;

    async function checkNotifications() {
        try {
            // request event and booking
            const [eventsRes, bookingsRes] = await Promise.all([
                fetch(`/api/UsersAPI/${userId}/upcomingEvents`),
                fetch(`/api/BookingsAPI/user/${userId}/upcoming`)
            ]);

            if (!eventsRes.ok || !bookingsRes.ok) {
                throw new Error("Failed to fetch notifications");
            }

            const events = await eventsRes.json();
            const bookings = await bookingsRes.json();

            // generate keys
            const eventIds = (events || []).map(e => `E-${e.eventID}`);
            const bookingIds = (bookings || []).map(b => `B-${b.BookingID}`);
            const combinedIds = [...eventIds, ...bookingIds].sort();

            const notifKey = JSON.stringify(combinedIds);

            // read previous status
            const prevKey = sessionStorage.getItem("notifEventKey") || "";
            const notifRead = sessionStorage.getItem("notifRead") === "true";

            // reset to unread if collection changes
            if (notifKey !== prevKey) {
                sessionStorage.setItem("notifRead", "false");
                sessionStorage.setItem("notifEventKey", notifKey);
            }

            // check if need to show red dot
            const hasNotifications = combinedIds.length > 0;
            const shouldShow = hasNotifications && sessionStorage.getItem("notifRead") !== "true";
            badge.classList.toggle("hidden", !shouldShow);

        } catch (err) {
            console.error("Error checking notifications:", err);
        }
    }

    checkNotifications();

    setInterval(checkNotifications, 2000);
});

// hide after clicking
document.addEventListener("click", function (e) {
    const link = e.target.closest('a[href*="notification"]');
    if (link) {
        const badge = document.getElementById("notification-badge");
        if (badge) badge.classList.add("hidden");
        sessionStorage.setItem("notifRead", "true");
    }
});
