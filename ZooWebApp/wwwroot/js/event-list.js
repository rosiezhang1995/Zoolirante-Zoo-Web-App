document.addEventListener("DOMContentLoaded", function () {
    // Mock data
    const events = window.mockEvents;
    const list = document.getElementById("event-list");

    events.forEach((event) => {
        const card = document.createElement("div");
        card.className = " bg-zoo-background rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300";

        // Format date
        const eventDate = formatDate(event.eventDate);
        
        card.innerHTML = `
            <div class="md:flex">
                <div class="md:w-1/3">
                    <img src="${event.eventImage}" alt="${event.title}" 
                    class="w-full h-64 md:h-full object-cover">
                </div>
                
                <div class="md:w-2/3 p-8">
                    <h3 class="text-3xl font-bold text-zoo-primary mb-4">${event.title}</h3>                    
                    <div class="text-lg font-semibold text-zoo-primary mb-4">
                        ${eventDate} @ ${event.eventTime}
                    </div>
                    
                    <p class="text-zoo-darkbrown text-lg leading-relaxed mb-6">
                        ${event.description}
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
        card.addEventListener('click', function() {
            // TODO: Navigate to event details page
        });

        list.appendChild(card);
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
