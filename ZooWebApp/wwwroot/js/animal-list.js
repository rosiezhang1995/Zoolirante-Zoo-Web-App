document.addEventListener("DOMContentLoaded", function () {
    //Animal card
    const list = document.getElementById("animal-list");

    // get favourites status from localStorage
    const storageKey = "favouriteAnimals";
    let favourites = JSON.parse(localStorage.getItem(storageKey)) || [];

    fetch("/api/animalsapi")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(animals => {
            animals.forEach((animal) => {
                const isFavourite = favourites.includes(String(animal.animalID));

                const card = document.createElement("div");
                card.className =
                    "relative bg-zoo-lightpink text-zoo-darkbrown rounded-lg overflow-hidden shadow-lg hover:ring-4 hover:ring-orange-600 hover:bg-orange-600 transition cursor-pointer";

                card.innerHTML = `
                    <img src="${animal.animalImage}" alt="${animal.animalImage}" class="w-full aspect-square object-cover">

                    <div class="p-4 relative">
                      <div class="flex justify-between items-center mb-2">
                        <h3 class="text-xl font-bold">${animal.species}</h3>
                        <h3 class="text-xl font-medium">${animal.animalName}</h3>
                      </div>
                      <span class="inline-block bg-zoo-primary text-white text-xs px-2 py-1 rounded-full">${animal.animalAge} ${animal.animalAge === 1 ? "year" : "years"} old</span>
                                         <svg xmlns="http://www.w3.org/2000/svg"
                             fill="${isFavourite ? 'red' : 'none'}" 
                             viewBox="0 0 24 24" 
                             stroke-width="1.5" 
                             stroke="red" 
                             class="favourite-icon size-7 absolute bottom-3 right-3 cursor-pointer transition-transform hover:scale-125">
                          <path stroke-linecap="round" stroke-linejoin="round" 
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </div>
                `;

                // Link card to its details page
                card.addEventListener('click', function () {
                    window.location.href = `animal-details.html?id=${animal.animalID}`;
                });

                // click heart icon to switch status
                const favIcon = card.querySelector(".favourite-icon");
                favIcon.addEventListener("click", (e) => {
                    e.stopPropagation(); 

                    const idStr = String(animal.animalID);
                    if (favourites.includes(idStr)) {
                        favourites = favourites.filter(id => id !== idStr);
                        favIcon.setAttribute("fill", "none");
                    } else {
                        favourites.push(idStr);
                        favIcon.setAttribute("fill", "red");
                    }

                    localStorage.setItem(storageKey, JSON.stringify(favourites));
                });

                list.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error fetching animals:", error);
        });
});
