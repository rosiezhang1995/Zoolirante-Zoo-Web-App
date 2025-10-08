document.addEventListener("DOMContentLoaded", async function () {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    const listContainer = document.getElementById("notification-list");
    if (!listContainer) return;

    try {
        const response = await fetch(`/api/UsersAPI/${userId}/upcomingEvents`);
        if (!response.ok) throw new Error("Failed to fetch notifications");

        const events = await response.json();

        // clear container
        listContainer.innerHTML = "";

        if (events.length === 0) {
            listContainer.innerHTML = `
        <p class="text-center text-zoo-brown text-lg font-medium">
          No new notifications 🦘
        </p>
      `;
            return;
        }

        // render messages
        events.forEach(event => {
            const msg = document.createElement("div");
            msg.className =
                "flex items-start gap-3 bg-white rounded-lg shadow-sm border border-zoo-primary px-4 py-3 transition";
            msg.innerHTML = `
                <div class="flex-shrink-0 text-2xl">🦘</div>
                <div class="flex-1">
                  <p class="text-zoo-darkbrown font-medium">
                    An event you liked is about to start:
                    <a href="/pages/event-details.html?id=${event.eventID}" class="text-zoo-primary font-semibold hover:underline"
                    >${event.title}</a>
                  </p>
                  <p class="text-sm text-gray-600 mt-1">
                    ${new Date(event.eventDate).toLocaleString("en-AU", {
                            dateStyle: "medium",
                            timeStyle: "short"
                        })}
                  </p>
                </div>
            `;

            listContainer.appendChild(msg);
        });

    } catch (error) {
        console.error("Error loading notifications:", error);
        listContainer.innerHTML = `
      <p class="text-center text-red-500 font-medium">
        Failed to load notifications.
      </p>
    `;
    }
});
