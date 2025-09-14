document.addEventListener("DOMContentLoaded", function () {
    const list = document.getElementById("event-list");

    fetch("/api/eventsapi")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(events => {
            events.forEach((event) => {
                const card = document.createElement("div");
                card.className = " bg-zoo-background rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300";

                // Format date
                const eventDate = formatDate(event.eventDate);
                const eventTime = formatTime(event.eventTime);

                card.innerHTML = `
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
                    // TODO: Navigate to event details page
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
