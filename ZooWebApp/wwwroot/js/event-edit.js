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

            // Prefill animals
            event.animals.forEach(a => {
                if (!selectedAnimalIds.includes(a.animalId)) {
                    selectedAnimalIds.push(a.animalId);

                    const li = document.createElement('li');
                    li.className = "inline-flex items-center bg-zoo-soft text-white px-3 py-1 rounded-lg mr-2 mb-2 text-sm";
                    li.dataset.id = a.animalId;

                    // Animal names
                    const nameSpan = document.createElement('span');
                    nameSpan.textContent = a.animalName;                   

                    // Delete button
                    const removeBtn = document.createElement('button');
                    removeBtn.textContent = '×';
                    removeBtn.className = "ml-2 text-white bg-zoo-primary hover:!bg-amber-700 rounded-full w-5 h-5 flex items-center justify-center text-xs";

                    removeBtn.addEventListener('click', () => {
                        selectedAnimalIds.splice(selectedAnimalIds.indexOf(a.animalId), 1);
                        li.remove();
                    });

                    li.appendChild(nameSpan);
                    li.appendChild(removeBtn);
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
    li.className = "inline-flex items-center bg-zoo-soft text-white px-3 py-1 rounded-lg mr-2 mb-2 text-sm";
    // Animal names
    const nameSpan = document.createElement('span');
    nameSpan.textContent = selectedText;

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '×';
    removeBtn.className = "ml-2 text-white bg-zoo-primary hover:!bg-amber-700 rounded-full w-5 h-5 flex items-center justify-center text-xs";

    removeBtn.addEventListener('click', () => {
        selectedAnimalIds.splice(selectedAnimalIds.indexOf(selectedId), 1);
        li.remove();
    });

    li.dataset.id = selectedId;

    // Append animal labels
    li.appendChild(nameSpan);
    li.appendChild(removeBtn);
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
            showToast('Event updated successfully!');
            setTimeout(() => {
                window.location.href = `/pages/event-details.html?id=${data.eventID}`;
            }, 1500);
        })
        .catch(err => console.error(err));
});

// Toast message
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('opacity-100');

    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.remove('opacity-0', 'opacity-100');
        }, 500); 
    }, 2500);
}