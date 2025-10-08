document.addEventListener("DOMContentLoaded", function () {
    loadMerchandiseDetails();

    const buyNowBtn = document.getElementById("buyNowBtn");
    if (buyNowBtn) {
        buyNowBtn.addEventListener("click", () => {
            const merchID = new URLSearchParams(window.location.search).get("id");
            window.location.href = `/pages/merch-payment.html?id=${merchID}`;
        });
    }
});

function loadMerchandiseDetails() {
    // Get merchandise ID from query string
    const urlParams = new URLSearchParams(window.location.search);
    const merchandiseId = parseInt(urlParams.get('id'));

    // Fetch merchandise from Web API
    fetch(`/api/MerchandiseAPI/${merchandiseId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(merchandise => {
            // Update the DOM with merchandise data
            document.getElementById('merchandise-image').src = `${merchandise.merchandiseImage}`;
            document.getElementById('merchandise-image').alt = merchandise.merchandiseName;
            document.getElementById('merchandise-name').textContent = merchandise.merchandiseName;
            document.getElementById('merchandise-price').textContent = `$${merchandise.price.toFixed(2)}`;
            document.getElementById('merchandise-avaliable').textContent = merchandise.avaliable ? "In Stock" : "Out of Stock";
            document.getElementById('merchandise-size').textContent = merchandise.size === null ? "Not Applicable" : merchandise.size;
            document.getElementById('merchandise-name-desc').textContent = merchandise.merchandiseName;
            document.getElementById('merchandise-description').textContent = merchandise.description;

            // Update page title
            document.title = `${merchandise.merchandiseName} - Zoolirante`;
        })
        .catch(error => {
            console.error("Error fetching merchandise details:", error);
        });
}

// back to list 
function backToList() {
    window.location.href = 'merchandise-list.html';
}
