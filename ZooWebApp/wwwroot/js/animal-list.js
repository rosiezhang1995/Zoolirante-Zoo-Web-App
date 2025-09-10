document.addEventListener("DOMContentLoaded", function () {
    //Mock data from animal-data.js
    const animals = window.mockAnimals;

    //Animal card
    const list = document.getElementById("animal-list");

    animals.forEach((animal) => {
        const card = document.createElement("div");
        card.className =
            "bg-zoo-lightpink text-zoo-darkbrown rounded-lg overflow-hidden shadow-lg hover:ring-4 hover:ring-orange-600 hover:bg-orange-600 transition cursor-pointer";

        card.innerHTML = `
          <img src="${animal.animalImage}" alt="${animal.animalImage}" class="w-full aspect-square object-cover">
          <div class="p-4">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-xl font-bold">${animal.species}</h3>
              <h3 class="text-xl font-medium">${animal.animalName}</h3>
            </div>
            <span class="inline-block bg-zoo-primary text-white text-xs px-2 py-1 rounded-full">${animal.animalAge} ${animal.animalAge === 1 ? "year" : "years"} old</span>
          </div>
        `;

        // Link card to its details page
        card.addEventListener('click', function() {
            window.location.href = `animal-details.html?id=${animal.animalID}`;
        });

        list.appendChild(card);
    });
});
