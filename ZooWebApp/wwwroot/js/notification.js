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
            const msg = document.createElement("p");
            msg.className = "text-zoo-darkbrown text-base font-medium flex items-center gap-2";
            msg.innerHTML = `
        🦘 You have an upcoming event:
        <span class="text-zoo-primary font-semibold">${event.eventName}</span>
        — <span>${new Date(event.eventDate).toLocaleString("en-AU", {
                dateStyle: "medium",
                timeStyle: "short"
            })}</span>
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
