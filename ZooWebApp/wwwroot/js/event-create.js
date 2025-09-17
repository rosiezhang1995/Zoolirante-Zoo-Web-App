
const animalSelect = document.getElementById('animalSelect');
const selectedAnimalsList = document.getElementById('selectedAnimals');
const addAnimalButton = document.getElementById('addAnimal');
const selectedAnimalIds = [];

// Fetch all animals from API
fetch('/api/animalsapi')
        .then(res => res.json())
        .then(data => {
    data.forEach(a => {
        const option = document.createElement('option');
        option.value = a.animalID;
        option.textContent = a.animalName;
        animalSelect.appendChild(option);
    });
        });

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
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    eventDate: document.getElementById('eventDate').value,
    eventTime: document.getElementById('eventTime').value + ':00',
    eventImage: document.getElementById('eventImage').value,
    location: document.getElementById('location').value,
    animalIds: selectedAnimalIds
        };

fetch('/api/eventsapi', {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
        })
            .then(res => {
                if (res.ok) return res.json();
                return res.json().then(err => Promise.reject(err));
            })
            .then(data => {
                alert('Event created successfully! ID: ' + data.eventID);
                document.getElementById('eventForm').reset();
                selectedAnimalsList.innerHTML = '';
                selectedAnimalIds.length = 0;
            })
            .catch(err => console.error(err));
    });
