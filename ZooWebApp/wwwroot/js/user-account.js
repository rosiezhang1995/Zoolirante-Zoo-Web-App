// Display info
document.addEventListener("DOMContentLoaded", async function () {
    // Display username
    const username = sessionStorage.getItem("username");
    const usernameElement = document.getElementById("username");
    if (username && usernameElement) {
        usernameElement.textContent = username;
    }
    // Load user info
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
        console.warn("No user ID found — user might not be logged in.");
        return;
    }
    try {
        const response = await fetch(`/api/UsersAPI/${userId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch user profile");
        }
        const user = await response.json();
        // User profile fields
        document.getElementById("profile-username").textContent = user.username || "—";
        document.getElementById("profile-fullname").textContent = user.fullName || "—";
        document.getElementById("profile-address").textContent = user.address || "—";
        document.getElementById("profile-email").textContent = user.email || "—";
        document.getElementById("profile-phone").textContent = user.phone || "—";

        //check if the user is an admin role
        checkAdminAccess(user);

    } catch (error) {
        console.error("Error loading user profile:", error);
    }

    setupTabs();
    checkAndOpenTabFromHash();
});

// Check if user is admin
function checkAdminAccess(user) {
    const isAdmin = user.isAdmin || user.IsAdmin || false;

    if (isAdmin) {
        // Show admin manage bookings button
        const manageBookingsBtn = document.getElementById('adminManageBookings');
        if (manageBookingsBtn) {
            manageBookingsBtn.classList.remove('hidden');
        }
    }
}


// Dynamic tabs
function setupTabs() {
    const buttons = document.querySelectorAll(".tab-btn");
    const tabs = document.querySelectorAll(".tab-content");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const tabId = btn.dataset.tab;
            tabs.forEach(tab => tab.classList.add("hidden"));
            document.getElementById(tabId).classList.remove("hidden");

            // Load bookings 
            if (tabId === "tickets") {
                loadUserBookingsForTab();
            }
        });
    });
}

// Function to open tab based on URL hash
function checkAndOpenTabFromHash() {
    const hash = window.location.hash.substring(1); 

    if (hash) {
        const tabButton = document.querySelector(`[data-tab="${hash}"]`);

        if (tabButton) {
            tabButton.click();
        }
    }
}

// Bookings functionality for My Tickets tab
async function loadUserBookingsForTab() {
    const userId = sessionStorage.getItem("userId");
    const container = document.getElementById('ticketsBookingsContainer');

    if (!userId) {
        container.innerHTML = '<div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"><p class="text-red-600">Please log in to view your bookings.</p></div>';
        return;
    }

    container.innerHTML = '<div class="text-center py-12"><p class="text-gray-500">Loading your bookings...</p></div>';

    try {
        const response = await fetch(`/api/BookingsAPI/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch bookings');

        const bookings = await response.json();
        displayBookingsInTab(bookings);
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"><p class="text-red-600">Failed to load bookings. Please try again.</p></div>';
    }
}

function displayBookingsInTab(bookings) {
    const container = document.getElementById('ticketsBookingsContainer');

    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-12 text-center">
                <div class="text-6xl mb-4">📭</div>
                <h3 class="text-xl font-bold text-zoo-darkbrown mb-2">No Bookings Found</h3>
                <p class="text-gray-600 mb-6">You haven't made any bookings yet</p>
                <a href="/pages/ticket-booking.html" class="inline-block bg-zoo-primary hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition">Book Your Visit</a>
            </div>
        `;
        return;
    }

    let html = `<div class="mb-4"><h2 class="text-2xl font-bold text-zoo-darkbrown">Your Bookings (${bookings.length})</h2></div><div class="space-y-4">`;

    bookings.forEach(booking => {
        const visitDate = new Date(booking.visitDate);
        const createdDate = new Date(booking.createdAt);
        const isPast = visitDate < new Date();

        html += `
            <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-xl font-bold text-zoo-darkbrown mb-1">${booking.bookingReference}</h3>
                        <p class="text-sm text-gray-600">Booked: ${createdDate.toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div class="text-right">
                        <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                            ${booking.bookingStatus}
                        </span>
                        ${isPast ? '<p class="text-xs text-gray-500 mt-1">Past Visit</p>' : '<p class="text-xs text-green-600 mt-1">Upcoming</p>'}
                    </div>
                </div>

                <div class="grid md:grid-cols-3 gap-4">
                    <div>
                        <p class="text-sm text-gray-600">Visit Date</p>
                        <p class="font-semibold text-zoo-darkbrown">
                            ${visitDate.toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Total Amount</p>
                        <p class="font-semibold text-zoo-primary text-xl">$${booking.totalAmount.toFixed(2)}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Payment</p>
                        <p class="font-semibold text-green-600">✓ ${booking.paymentStatus}</p>
                    </div>
                </div>
            </div>
        `;
    });

// URL param to auto-switch tab
const params = new URLSearchParams(window.location.search);
const tabParam = params.get("tab");

if (tabParam) {
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabParam}"]`);
    const targetTab = document.getElementById(tabParam);

    if (targetBtn && targetTab) {
        buttons.forEach(b => b.classList.remove("active"));
        tabs.forEach(t => t.classList.add("hidden"));

        targetBtn.classList.add("active");
        targetTab.classList.remove("hidden");
    }
}
});

