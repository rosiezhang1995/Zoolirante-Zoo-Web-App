const urlParams = new URLSearchParams(window.location.search);
const animalId = urlParams.get('id');

// Load animal data into form
if (animalId) {
    fetch(`/api/AnimalsAPI/${animalId}`)
        .then(res => res.json())
        .then(animal => {
            console.log(animal);
            document.getElementById('animalName').value = animal.animalName || '';
            document.getElementById('species').value = animal.species || '';
            document.getElementById('age').value = animal.animalAge || 0;
            document.getElementById('gender').value = animal.gender || 'Unknown';
            document.getElementById('enclosure').value = animal.mapImage || '';
            document.getElementById('description').value = animal.description || '';

            // Update placeholder image
            if (animal.animalImage) {
                document.querySelector('img[alt="placeholder"]').src = animal.animalImage;
            }
        })
        .catch(err => console.error('Error loading animal:', err));
}

// Handle save button click
document.getElementById('saveAnimal').addEventListener('click', () => {
    const payload = {
        animalID: parseInt(animalId),
        animalName: document.getElementById('animalName').value,
        species: document.getElementById('species').value,
        animalAge: parseInt(document.getElementById('age').value),
        gender: document.getElementById('gender').value,
        mapImage: document.getElementById('enclosure').value,
        description: document.getElementById('description').value,
        animalImage: document.querySelector('img[alt="placeholder"]').src
    };

    fetch(`/api/AnimalsAPI/${animalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(res => {
            if (!res.ok) return res.json().then(err => Promise.reject(err));
            return res.json();
        })
        .then(data => {
            alert('Animal updated successfully! ID: ' + data.animalID);
            window.location.href = `animal-details.html?id=${animalId}`;
        })
        .catch(err => console.error('Error saving animal:', err));
});
