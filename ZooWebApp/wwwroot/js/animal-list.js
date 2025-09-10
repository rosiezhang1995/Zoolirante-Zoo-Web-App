document.addEventListener("DOMContentLoaded", function () {
    //Mock data
    const animals = [
        {
            name: "test1",
            species: "Wolf",
            image: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0",
            age: "4",
        },
        {
            name: "test2",
            species: "Lion",
            image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d",
            age: "5",
        },
        {
            name: "test3",
            species: "Bear",
            image: "https://images.unsplash.com/photo-1713062711590-b29c683708e0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TWFyc2ljYW4lMjBicm93biUyMGJlYXJ8ZW58MHx8MHx8fDA%3D",
            age: "2",
        },
    ];

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
