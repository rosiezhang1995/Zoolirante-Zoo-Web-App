document.addEventListener("DOMContentLoaded", async function () {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    const listContainer = document.getElementById("notification-list");
    if (!listContainer) return;

    // format datetime
    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleString("en-AU", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    }

    try {
        // fetch event and visit
        const [eventsRes, bookingsRes] = await Promise.all([
            fetch(`/api/UsersAPI/${userId}/upcomingEvents`),
            fetch(`/api/BookingsAPI/user/${userId}/upcoming`)
        ]);

        if (!eventsRes.ok || !bookingsRes.ok) throw new Error("Failed to fetch notifications");

        const events = await eventsRes.json();
        const bookings = await bookingsRes.json();

        // clear container
        listContainer.innerHTML = "";

        // show message if no event/visit
        if ((!events || events.length === 0) && (!bookings || bookings.length === 0)) {
            listContainer.innerHTML = `
                <p class="text-center text-zoo-brown text-lg font-medium">
                    No new notifications 🦘
                </p>
            `;
            return;
        }

        // event notification
        if (events && events.length > 0) {
            events.forEach(event => {
                const msg = document.createElement("div");
                msg.className =
                    "flex items-start gap-3 bg-white rounded-lg shadow-sm border border-zoo-primary px-4 py-3 transition";
                msg.innerHTML = `
                    <div class="flex-shrink-0 text-2xl">🦘</div>
                    <div class="flex-1">
                        <p class="text-zoo-darkbrown font-medium">
                            An event you liked is about to start:
                            <a href="/pages/event-details.html?id=${event.eventID}"
                               class="text-zoo-primary font-semibold hover:underline">
                                ${event.title}
                            </a>
                        </p>
                        <p class="text-sm text-gray-600 mt-1">${formatDate(event.eventDate)}</p>
                    </div>
                `;
                listContainer.appendChild(msg);
            });
        }

        // visit notifications
        if (bookings && bookings.length > 0) {
            bookings.forEach(booking => {
                const msg = document.createElement("div");
                msg.className =
                    "flex items-start gap-3 bg-white rounded-lg shadow-sm border border-green-400 px-4 py-3 transition";
                msg.innerHTML = `
                    <div class="flex-shrink-0 text-2xl">🐾</div>
                    <div class="flex-1">
                      <p class="text-zoo-darkbrown font-medium">
                        Your visit is coming up soon:
                        <span class="text-green-700 font-semibold">Booking #${booking.bookingReference}</span>
                      </p>
                      <p class="text-sm text-gray-600 mt-1">
                        ${formatDate(booking.visitDate)}
                      </p>
                      <p class="text-sm text-gray-600 mt-1">
                        Total: <span class="font-semibold">$${booking.totalAmount.toFixed(2)}</span>
                      </p>
                    </div>
                `;
                listContainer.appendChild(msg);
            });
        }

    } catch (error) {
        console.error("Error loading notifications:", error);
        listContainer.innerHTML = `
            <p class="text-center text-red-500 font-medium">
                Failed to load notifications.
            </p>
        `;
    }
});
