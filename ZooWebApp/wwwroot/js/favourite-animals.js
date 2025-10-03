document.addEventListener("DOMContentLoaded", function () {
    renderFavouriteAnimals();
});

function renderFavouriteAnimals() {
    const container = document.getElementById("favourite-animals-list");
    if (!container) return;

    const storageKey = "favouriteAnimals";
    const favourites = JSON.parse(localStorage.getItem(storageKey)) || [];

    // No animals saved
    if (favourites.length === 0) {
        container.className = "";
        container.innerHTML = `
        <div class="text-center mt-6">
            <p class="text-zoo-brown text-lg font-medium mb-4">
                You haven't added any favourite animals yet 🐾
            </p>
            <button
                onclick="window.location.href='animal-list.html'"
                class="bg-zoo-primary hover:!bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition">
                Explore Animals
            </button>
        </div>
      `;
        return;
    }

    // Clear before render
    container.innerHTML = "";

    // Grid layout
    container.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6";

    // Fetch animal info
    favourites.forEach(animalId => {
        fetch(`/api/AnimalsAPI/${animalId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json();
            })
            .then(animal => {
                const card = document.createElement("div");
                card.className =
                    "bg-zoo-lightpink rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 text-center";

                card.innerHTML = `
          <div class="relative">
            <img src="${animal.animalImage}" alt="${animal.animalName}" 
              class="w-full aspect-square object-cover">
          </div>
          <div class="p-4">
            <div class="flex  justify-between items-center mb-2">
                <h3 class="text-lg font-bold text-zoo-primary">${animal.species}</h3>
                <p class="text-base text-zoo-darkbrown mb-3">${animal.animalName}</p>
            </div>
            <div class="flex gap-2">
              <button 
                class="bg-zoo-primary hover:!bg-amber-700 text-white px-3 py-1 rounded-md text-sm shadow-md transition"
                onclick="viewAnimalDetails(${animal.animalID})">
                View
              </button>
              <button 
                class="border-2 border-zoo-primary text-gray-700 hover:bg-gray-100 px-3 py-1 rounded-md text-sm shadow-md transition"
                onclick="removeFromAnimalFavourites(${animal.animalID}, this)">
                Remove
              </button>
            </div>
          </div>
        `;

                container.appendChild(card);
            })
            .catch(err => console.error("Error loading saved animal:", err));
    });
}

// View details
function viewAnimalDetails(animalId) {
    window.location.href = `animal-details.html?id=${animalId}`;
}

// Remove from saved list
function removeFromAnimalFavourites(animalId, btn) {
    const storageKey = "favouriteAnimals";
    let favourites = JSON.parse(localStorage.getItem(storageKey)) || [];
    favourites = favourites.filter(id => id !== String(animalId));
    localStorage.setItem(storageKey, JSON.stringify(favourites));

    // Remove card from UI
    const card = btn.closest(".bg-zoo-lightpink");
    card.remove();

    // Show reminder if no animals left
    const container = document.getElementById("favourite-animals-list");
    if (!container.querySelector(".bg-zoo-lightpink")) {
        container.className = ""; // remove grid layout
        container.innerHTML = `
        <div class="text-center mt-6">
            <p class="text-zoo-brown text-lg font-medium mb-4">
                You haven't added any favourite animals yet 🐾
            </p>
            <button
                onclick="window.location.href='animal-list.html'"
                class="bg-zoo-primary hover:!bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition">
                Explore Animals
            </button>
        </div>
        `;
    }
}
