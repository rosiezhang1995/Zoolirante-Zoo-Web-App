const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('id');

const animalSelect = document.getElementById('animalSelect');
const selectedAnimalsList = document.getElementById('selectedAnimals');
const addAnimalButton = document.getElementById('addAnimal');
const selectedAnimalIds = [];

// Load all animals for the dropdown
fetch('/api/animalsapi')
    .then(res => res.json())
    .then(data => {
        data.forEach(a => {
            const option = document.createElement('option');
            option.value = a.animalID;
            option.textContent = a.animalName;
            animalSelect.appendChild(option);
        });

        // After loading animals, load the event data
        loadEventData();
    });

function loadEventData() {
    fetch(`/api/EventsAPI/${eventId}`)
        .then(res => res.json())
        .then(event => {
            document.getElementById('title').value = event.title;
            document.getElementById('description').value = event.description;
            document.getElementById('eventDate').value = event.eventDate.split('T')[0];
            document.getElementById('eventTime').value = event.eventTime.substring(0, 5);
            document.getElementById('eventImage').value = event.eventImage;
            document.getElementById('location').value = event.location;

            // Pre-fill animals
            event.animals.forEach(a => {
                if (!selectedAnimalIds.includes(a.animalId)) {
                    selectedAnimalIds.push(a.animalId);
                    const li = document.createElement('li');
                    li.textContent = a.animalName;
                    li.dataset.id = a.animalId;
                    li.title = 'Click to remove';
                    li.addEventListener('click', () => {
                        selectedAnimalIds.splice(selectedAnimalIds.indexOf(parseInt(li.dataset.id)), 1);
                        li.remove();
                    });
                    selectedAnimalsList.appendChild(li);
                }
            });
        });
}

// Add selected animal to the list
addAnimalButton.addEventListener('click', () => {
    const selectedId = parseInt(animalSelect.value);
    const selectedText = animalSelect.options[animalSelect.selectedIndex].text;

    if (!selectedId || selectedAnimalIds.includes(selectedId)) return;

    selectedAnimalIds.push(selectedId);

    const li = document.createElement('li');
    li.textContent = selectedText;
    li.dataset.id = selectedId;
    li.title = 'Click to remove';
    li.addEventListener('click', () => {
        selectedAnimalIds.splice(selectedAnimalIds.indexOf(parseInt(li.dataset.id)), 1);
        li.remove();
    });

    selectedAnimalsList.appendChild(li);
});

// Handle form submission
document.getElementById('eventForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const payload = {
        eventID: parseInt(eventId),
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        eventDate: document.getElementById('eventDate').value,
        eventTime: document.getElementById('eventTime').value + ':00', // timeSpan format
        eventImage: document.getElementById('eventImage').value,
        location: document.getElementById('location').value,
        animalIds: selectedAnimalIds
    };

    fetch(`/api/EventsAPI/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(res => {
            if (!res.ok) return res.json().then(err => Promise.reject(err));
            return res.json();
        })
        .then(data => {
            alert('Event updated successfully! ID: ' + data.eventID);
            window.location.href = `/event-details.html?id=${eventId}`;
        })
        .catch(err => console.error(err));
});
