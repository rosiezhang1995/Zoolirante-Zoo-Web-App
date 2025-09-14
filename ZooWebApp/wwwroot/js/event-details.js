document.addEventListener('DOMContentLoaded', function () {
    loadEventDetails();
});

function loadEventDetails() {
    // Get event ID from query string
    //const urlParams = new URLSearchParams(window.location.search);
    //const eventId = parseInt(urlParams.get('id'));

    const event = window.mockEvents.find(e => e.eventID === 3);
    if (!event) {
        console.error("Event not found");
        return;
    }

    // Update the DOM with event data
    document.getElementById('event-title').textContent = event.title;
    document.getElementById('event-image').src = event.eventImage;
    document.getElementById('event-image').alt = event.title;
    document.getElementById('event-date').textContent = formatDate(event.eventDate);
    document.getElementById('event-time').textContent = formatTime(event.eventTime);
    document.getElementById('event-location').textContent = event.location;
    document.getElementById('event-description').textContent = event.description;

    const animalsContainer = document.getElementById('event-animals');
    animalsContainer.innerHTML = "";
    event.animals.forEach(animalName => {
        const card = document.createElement('div');
        card.className = "text-center w-44";

        card.innerHTML = `
            <img src="/images/animals/${animalName}.png" alt="${animalName}"
                 class="w-full aspect-square object-cover rounded-lg shadow hover:opacity-80 transition">
            <p class="mt-2 text-zoo-brown font-medium">${animalName}</p>
        `;
        animalsContainer.appendChild(card);
    });

    // Update page title
    document.title = `${event.title} - Zoolirante`;
}      

// back to list 
function backToEvents() {
    window.location.href = 'event-list.html';
}

//Format datatype
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-AU', options);
}

function formatTime(timeString) {
    const [hour, minute] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' });
}