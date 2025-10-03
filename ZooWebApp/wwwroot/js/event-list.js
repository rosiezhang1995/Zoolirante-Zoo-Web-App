document.addEventListener("DOMContentLoaded", function () {
    const list = document.getElementById("event-list");
    // store favourite events
    const storageKey = "favouriteEvents";
    let favourites = JSON.parse(sessionStorage.getItem(storageKey)) || [];

    fetch("/api/eventsapi")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(events => {
            events.forEach((event) => {
                const idStr = String(event.eventID);
                const isFavourite = favourites.includes(idStr); 

                const card = document.createElement("div");
                card.className = "relative bg-zoo-background rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300";

                // Format date
                const eventDate = formatDate(event.eventDate);
                const eventTime = formatTime(event.eventTime);

                card.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg"
                        fill="${isFavourite ? 'orange' : 'none'}"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="orange"
                        class="favourite-star size-8 absolute top-3 right-3 cursor-pointer hover:scale-125 transition-transform">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
             <div class="md:flex">
                <div class="md:w-1/3">
                    <img src="${event.eventImage}" alt="${event.title}" 
                    class="w-full h-64 md:h-full object-cover">
                </div>
                
                <div class="md:w-2/3 p-8">
                    <h3 class="text-3xl font-bold text-zoo-primary mb-4">${event.title}</h3>                    
                    <div class="text-lg font-semibold text-zoo-primary mb-4">
                        ${eventDate} @ ${eventTime}
                    </div>
                    
                    <p class="text-zoo-darkbrown text-lg leading-relaxed mb-6">
                        ${limitCharacters(event.description, 150)}
                    </p>
                    
                    <div class="mb-6">
                        <div class="flex items-center text-zoo-darkbrown mb-2">
                            <span class="font-semibold mr-2">Location:</span>
                            <span>${event.location}</span>
                        </div>
                    </div>
                    
                    <button class="bg-zoo-primary hover:!bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors duration-200 flex items-center">
                        Find out more >
                    </button>
                </div>
            </div>
        `;

            // Add click event
            card.addEventListener('click', function () {
                window.location.href = `event-details.html?id=${event.eventID}`;
            });

                // click star to save events
                const star = card.querySelector(".favourite-star");
                star.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const idStr = String(event.eventID);

                    if (favourites.includes(idStr)) {
                        favourites = favourites.filter(id => id !== idStr);
                        star.setAttribute("fill", "none");
                    } else {
                        favourites.push(idStr);
                        star.setAttribute("fill", "orange");
                    }
                    sessionStorage.setItem(storageKey, JSON.stringify(favourites));
                });

            list.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error fetching animals:", error);
        });


});

// Format date
function formatDate(dateString) {
    const options = { 
        month: 'long', 
        day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-AU', options);
}

// Format time
function formatTime(timeString) {
    try {
        const today = new Date().toISOString().split('T')[0];
        const fullDateTime = `${today}T${timeString}`;
        const date = new Date(fullDateTime);

        return date.toLocaleTimeString('en-AU', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    } catch (error) {
        console.error("Error parsing time:", error);
        return timeString;
    }
}

// Limit characters for description part
function limitCharacters(text, charLimit=150) {
    if (text.length <= charLimit) {
        return text;
    }
    return text.substring(0, charLimit) + '...';
}
