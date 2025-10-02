document.addEventListener('DOMContentLoaded', function () {
    loadAnimalDetails();

    // Set the Edit button to navigate to edit page
    const editButton = document.getElementById("editAnimalBtn");
    editButton.addEventListener('click', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const animalId = parseInt(urlParams.get('id'));
        window.location.href = `animal-edit.html?id=${animalId}`;
    });

    // Favourite button logic
    const favIcon = document.getElementById("favouriteIcon");
    const toast = document.getElementById("toast");

    const urlParams = new URLSearchParams(window.location.search);
    const animalId = String(urlParams.get('id'));
    const storageKey = "favouriteAnimals";

    // Get favourites list from storage
    let favourites = JSON.parse(localStorage.getItem(storageKey)) || [];
    let isFavourite = favourites.includes(animalId);
    updateHeart();

    favIcon.addEventListener("click", () => {
        if (isFavourite) {
            favourites = favourites.filter(id => id !== animalId);
            isFavourite = false;
            showToast("Removed from Favourites!");
        } else {
            favourites.push(animalId);
            isFavourite = true;
            showToast("Added to Favourites!");
        }

        localStorage.setItem(storageKey, JSON.stringify(favourites));
        updateHeart();
    });

    function updateHeart() {
        favIcon.setAttribute("fill", isFavourite ? "red" : "none");
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.remove("opacity-0");
        toast.classList.add("opacity-100");

        setTimeout(() => {
            toast.classList.add("opacity-0");
            toast.classList.remove("opacity-100");
        }, 2000);
    }
});

function loadAnimalDetails() {
    // Get animal ID from query string
    const urlParams = new URLSearchParams(window.location.search);
    const animalId = parseInt(urlParams.get('id'));

    // Fetch animal from Web API
    fetch(`/api/AnimalsAPI/${animalId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(animal => {
            // Update the DOM with animal data
            document.getElementById('animal-image').src = `${animal.animalImage}`;
            document.getElementById('animal-image').alt = animal.animalName;
            document.getElementById('animal-name').textContent = animal.animalName;
            document.getElementById('animal-species').textContent = animal.species;
            document.getElementById('animal-age').textContent = `${animal.animalAge} ${animal.animalAge === 1 ? "year" : "years"} old`;
            document.getElementById('animal-weight').textContent = `${animal.weight} kg`;
            document.getElementById('animal-gender').textContent = animal.gender === "M" ? "Boy" : "Girl";
            document.getElementById('arrival-date').textContent = formatDate(animal.dateOfArrival);
            document.getElementById('animal-name-desc').textContent = animal.animalName;
            document.getElementById('animal-description').textContent = animal.description;
            document.getElementById('animal-map').src = `${animal.mapImage}`;
            document.getElementById('animal-name-map').textContent = animal.animalName;

            // Update page title
            document.title = `${animal.animalName} the ${animal.species} - Zoolirante`;
        })
        .catch(error => {
            console.error("Error fetching animal details:", error);
        });
}

// back to list 
function backToList() {
    window.location.href = 'animal-list.html';
}

//Format datatype
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-AU', options);
}