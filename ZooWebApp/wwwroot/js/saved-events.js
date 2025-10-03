document.addEventListener("DOMContentLoaded", function () {
    renderSavedEvents();
});

function renderSavedEvents() {
    const container = document.getElementById("saved-events-list");
    if (!container) return;

    const storageKey = "favouriteEvents";
    const favourites = JSON.parse(sessionStorage.getItem(storageKey)) || [];

    // No event saved
    if (favourites.length === 0) {
        container.innerHTML = `
        <div class="text-center mt-6">
            <p class="text-center text-zoo-brown text-lg font-medium mt-6">
                You haven't saved any events yet 🦘
            </p>
          <button
            onclick="window.location.href='event-list.html'"
            class="bg-zoo-primary hover:!bg-amber-700 text-white mt-4 px-4 py-2 rounded-lg font-semibold shadow-md transition">
            Explore Events
          </button>
        </div>
      `;
        return;
    }

    // Get event info
    favourites.forEach(eventId => {
        fetch(`/api/EventsAPI/${eventId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json();
            })
            .then(event => {
                const card = document.createElement("div");
                card.className = "bg-zoo-background rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300";

                const eventDate = formatDate(event.eventDate);
                const eventTime = formatTime(event.eventTime);

                card.innerHTML = `
          <div class="md:flex mt-4">
            <div class="md:w-1/3">
              <img src="${event.eventImage}" alt="${event.title}" 
                class="w-full h-64 md:h-full object-cover">
            </div>
            <div class="md:w-2/3 p-6">
              <h3 class="text-2xl font-bold text-zoo-primary mb-2">${event.title}</h3>
              <p class="text-zoo-primary font-semibold mb-2">${eventDate} @ ${eventTime}</p>

              <div class="flex gap-3 mt-4">
                <button 
                  class="bg-zoo-primary hover:!bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
                  onclick="viewEventDetails(${event.eventID})">
                  View Details
                </button>
                <button 
                  class="border-2 border-zoo-primary text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg shadow-md transition"
                  onclick="removeFromFavourites(${event.eventID}, this)">
                  Remove
                </button>
              </div>
            </div>
          </div>
        `;

                container.appendChild(card);
            })
            .catch(err => console.error("Error loading saved event:", err));
    });
}

// View details
function viewEventDetails(eventId) {
    window.location.href = `event-details.html?id=${eventId}`;
}

// Removed from saved list
function removeFromFavourites(eventId, btn) {
    const userId = sessionStorage.getItem("userId");
    const storageKey = "favouriteEvents";
    let favourites = JSON.parse(sessionStorage.getItem(storageKey)) || [];
    favourites = favourites.filter(id => id !== eventId);
    sessionStorage.setItem(storageKey, JSON.stringify(favourites));
    fetch(`/api/UsersAPI/${userId}/savedEvents/${eventId}`, { method: 'DELETE' });

    // Remove card
    const card = btn.closest(".bg-zoo-background");
    card.remove();

    // Show reminder if no event left
    const container = document.getElementById("saved-events-list");
    if (!container.querySelector(".bg-zoo-background")) {
        container.innerHTML = `
        <div class="text-center mt-6">
            <p class="text-center text-zoo-brown text-lg font-medium mt-6">
                You haven't saved any events yet 🦘
            </p>
          <button
            onclick="window.location.href='event-list.html'"
            class="bg-zoo-primary hover:!bg-amber-700 text-white mt-4 px-4 py-2 rounded-lg font-semibold shadow-md transition">
            Explore Events
          </button>
        </div>
      `;
    }
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-AU", { month: "long", day: "numeric", year: "numeric" });
}

// Format time
function formatTime(timeString) {
    const [hour, minute] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' });
}
