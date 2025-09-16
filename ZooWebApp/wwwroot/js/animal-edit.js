document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const animalId = urlParams.get('id');

    // Load existing animal data
    fetch(`/api/AnimalsAPI/${animalId}`)
        .then(res => res.json())
        .then(animal => {
            console.log(animal)
            document.getElementById('animalName').value = animal.AnimalName;
            document.getElementById('species').value = animal.Species;
            document.getElementById('age').value = animal.AnimalAge;
            document.getElementById('gender').value = animal.Gender || 'Unknown';
            document.getElementById('enclosure').value = animal.MapImage;
            document.getElementById('description').value = animal.Description;

            // Update placeholder image
            if (animal.AnimalImage) {
                document.querySelector('img[alt="placeholder"]').src = animal.AnimalImage;
            }
        })
        .catch(err => console.error('Error loading animal:', err));

    // Handle save button click
    document.getElementById('saveAnimal').addEventListener('click', () => {
        const payload = {
            AnimalID: parseInt(animalId),
            AnimalName: document.getElementById('animalName').value,
            Species: document.getElementById('species').value,
            AnimalAge: parseInt(document.getElementById('age').value),
            Gender: document.getElementById('gender').value,
            MapImage: document.getElementById('enclosure').value,
            Description: document.getElementById('description').value,
            AnimalImage: document.querySelector('img[alt="placeholder"]').src
        };

        fetch(`/api/AnimalsAPI/${animalId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (res.ok) {
                    alert('Animal updated successfully!');
                    window.location.href = 'animal-list.html';
                } else {
                    return res.json().then(err => Promise.reject(err));
                }
            })
            .catch(err => console.error('Error saving animal:', err));
    });
});
