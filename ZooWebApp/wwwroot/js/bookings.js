let currentUser = null;
let currentView = 'all'; // all/email

document.addEventListener('DOMContentLoaded', () => {
    checkUserLogin();
    setupEventListeners();
});

function checkUserLogin() {
    const userString = localStorage.getItem('user');

    if (!userString) {
        // show login message
        document.getElementById('viewMyBookingsBtn').classList.add('hidden');
        document.getElementById('viewByEmailBtn').classList.add('hidden');
        document.getElementById('loginMessage').classList.remove('hidden');
        document.getElementById('bookingsContainer').innerHTML = '';
        return;
    }

    currentUser = JSON.parse(userString);

    const userId = currentUser.UserID || currentUser.userID;

    // Validate user data
    if (!userId) {
        console.error('User ID not found in localStorage:', currentUser);
        document.getElementById('viewMyBookingsBtn').classList.add('hidden');
        document.getElementById('viewByEmailBtn').classList.add('hidden');
        document.getElementById('loginMessage').classList.remove('hidden');
        document.getElementById('bookingsContainer').innerHTML = '';
        return;
    }

    currentUser.userID = userId;

    console.log('Logged in admin user:', {
        id: currentUser.userID,
        email: currentUser.Email || currentUser.email
    });

    // load statistics and all bookings
    document.getElementById('pageSubtitle').textContent = 'Manage all customer bookings';
    document.getElementById('myBookingsText').textContent = 'All Bookings';
    document.getElementById('adminStats').classList.remove('hidden');
    loadAdminStatistics();
    loadAllBookings();
}

function setupEventListeners() {
    document.getElementById('viewMyBookingsBtn').addEventListener('click', () => {
        if (!currentUser) return;
        switchView('all');
        loadAllBookings();
    });

    document.getElementById('viewByEmailBtn').addEventListener('click', () => {
        switchView('email');
    });

    document.getElementById('searchBtn').addEventListener('click', searchByEmail);
    document.getElementById('searchEmail').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchByEmail();
    });
}

function switchView(view) {
    currentView = view;

    // Reset button states
    document.getElementById('viewMyBookingsBtn').classList.remove('bg-zoo-primary', 'text-white');
    document.getElementById('viewMyBookingsBtn').classList.add('bg-gray-200', 'text-gray-700');
    document.getElementById('viewByEmailBtn').classList.remove('bg-zoo-primary', 'text-white');
    document.getElementById('viewByEmailBtn').classList.add('bg-gray-200', 'text-gray-700');

    // Hide all sections
    document.getElementById('emailSearchSection').classList.add('hidden');
    document.getElementById('loginMessage').classList.add('hidden');

    if (view === 'all') {
        document.getElementById('viewMyBookingsBtn').classList.remove('bg-gray-200', 'text-gray-700');
        document.getElementById('viewMyBookingsBtn').classList.add('bg-zoo-primary', 'text-white');
    } else if (view === 'email') {
        document.getElementById('viewByEmailBtn').classList.remove('bg-gray-200', 'text-gray-700');
        document.getElementById('viewByEmailBtn').classList.add('bg-zoo-primary', 'text-white');
        document.getElementById('emailSearchSection').classList.remove('hidden');
        document.getElementById('bookingsContainer').innerHTML = '<div class="text-center py-12"><p class="text-gray-500">Enter an email address to search</p></div>';
    }
}

async function loadAdminStatistics() {
    try {
        const response = await fetch(`/api/BookingsAPI/statistics?requestingUserId=${currentUser.userID}`);
        if (!response.ok) return;



        const stats = await response.json();
        document.getElementById('totalBookings').textContent = stats.totalBookings;
        document.getElementById('totalRevenue').textContent = `${stats.totalRevenue.toFixed(2)}`;
        document.getElementById('upcomingBookings').textContent = stats.upcomingBookings;
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

async function loadAllBookings() {
    const container = document.getElementById('bookingsContainer');
    container.innerHTML = '<div class="text-center py-12"><p class="text-gray-500">Loading all bookings...</p></div>';

    try {
        const response = await fetch(`/api/BookingsAPI/all?requestingUserId=${currentUser.userID}`);

        if (response.status === 403) {
            container.innerHTML = '<div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"><p class="text-red-600">Access denied. Admin privileges required.</p></div>';
            return;
        }

        if (!response.ok) throw new Error('Failed to fetch bookings');

        const bookings = await response.json();
        displayBookings(bookings, 'All Bookings');
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"><p class="text-red-600">Failed to load bookings. Please try again.</p></div>';
    }
}

async function searchByEmail() {
    const email = document.getElementById('searchEmail').value.trim();

    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    const container = document.getElementById('bookingsContainer');
    container.innerHTML = '<div class="text-center py-12"><p class="text-gray-500">Searching...</p></div>';

    try {
        const response = await fetch(`/api/BookingsAPI/customer/${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error('Failed to fetch bookings');

        const bookings = await response.json();
        displayBookings(bookings, `Bookings for ${email}`);
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"><p class="text-red-600">Failed to load bookings. Please try again.</p></div>';
    }
}

function displayBookings(bookings, title) {
    const container = document.getElementById('bookingsContainer');

    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-12 text-center">
                <div class="text-6xl mb-4">📭</div>
                <h3 class="text-xl font-bold text-zoo-darkbrown mb-2">No Bookings Found</h3>
                <p class="text-gray-600 mb-6">${currentView === 'email' ? 'No bookings found for this email' : 'No bookings yet'}</p>
            </div>
        `;
        return;
    }

    let html = `<div class="mb-4"><h2 class="text-2xl font-bold text-zoo-darkbrown">${title} (${bookings.length})</h2></div><div class="space-y-4">`;

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
                        <p class="text-sm text-gray-600 mt-1"><strong>Customer:</strong> ${booking.customerName} (${booking.customerEmail})</p>
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
                        <p class="font-semibold text-zoo-primary text-xl">${booking.totalAmount.toFixed(2)}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Payment</p>
                        <p class="font-semibold text-green-600">✓ ${booking.paymentStatus}</p>
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}