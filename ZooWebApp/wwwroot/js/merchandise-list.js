document.addEventListener("DOMContentLoaded", function () {
    // Merchandise card
    const list = document.getElementById("merchandise-list");

    fetch("/api/MerchandiseAPI")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(merchandise => {
            merchandise.forEach((merchandise) => {
                const card = document.createElement("div");
                card.className =
                    "bg-zoo-lightpink text-zoo-darkbrown rounded-lg overflow-hidden shadow-lg hover:ring-4 hover:ring-orange-600 hover:bg-orange-600 transition cursor-pointer";

                card.innerHTML = `
                  <img src="${merchandise.merchandiseImage}" alt="${merchandise.merchandiseName}" class="w-full aspect-square object-cover">
                  <div class="p-4">
                    <div class="flex justify-between items-center mb-2">
                      <h3 class="text-xl font-bold">${merchandise.merchandiseName}</h3>
                      <h3 class="text-xl font-medium">$${merchandise.price}</h3>
                    </div>
                  </div>
                `;

                // Link card to its details page
                //card.addEventListener('click', function () {
                //    window.location.href = `merchandise-details.html?id=${merchandise.merchandiseID}`;
                //});

                list.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error fetching merchandise: ", error);
        });
});