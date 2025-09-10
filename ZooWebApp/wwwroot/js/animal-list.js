document.addEventListener("DOMContentLoaded", function () {
    //Animal card
    const list = document.getElementById("animal-list");

    animals.forEach((animal) => {
        const card = document.createElement("div");
        card.className =
            "bg-zoo-lightpink text-zoo-darkbrown rounded-lg overflow-hidden shadow-lg hover:ring-4 hover:ring-orange-600 hover:bg-orange-600 transition cursor-pointer";

        card.innerHTML = `
          <img src="${animal.image}" alt="${animal.name}" class="w-full aspect-square object-cover">
          <div class="p-4">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-xl font-bold">${animal.species}</h3>
              <h3 class="text-xl font-medium">${animal.name}</h3>
            </div>
            <span class="inline-block bg-zoo-primary text-white text-xs px-2 py-1 rounded-full">${animal.age} years old</span>
          </div>
        `;

        // TODO: Link to details page
        list.appendChild(card);
    });
});
