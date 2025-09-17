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
            document.getElementById('weight').value = animal.weight || '';
            document.getElementById('animalImage').value = animal.animalImage || '';

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
        weight: parseFloat(document.getElementById('weight').value),
        mapImage: document.getElementById('enclosure').value,
        description: document.getElementById('description').value,
        animalImage: document.getElementById('animalImage').value
    };

    fetch(`/api/AnimalsAPI/${animalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(res => {
            if (!res.ok) return res.json().then(err => Promise.reject(err));
            return res; // just return the response object
        })
        .then(() => {
            showToast('Animal updated successfully!');
            setTimeout(() => {
                window.location.href = `/pages/animal-details.html?id=${animalId}`;
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