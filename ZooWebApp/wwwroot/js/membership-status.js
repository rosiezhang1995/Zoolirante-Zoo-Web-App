// Membership Status 
async function loadMembershipStatus() {
    const userId = sessionStorage.getItem("userId");
    const container = document.getElementById('membershipContainer');

    if (!userId) {
        container.innerHTML = '<div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"><p class="text-red-600">Please log in to view membership status.</p></div>';
        return;
    }

    container.innerHTML = '<div class="text-center py-12"><p class="text-gray-500">Loading...</p></div>';

    try {
        const response = await fetch(`/api/UsersAPI/${userId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const user = await response.json();
        displayMembershipStatus(user.isMember || user.IsMember);
    } catch (error) {
        console.error('Error loading membership:', error);
        container.innerHTML = '<div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"><p class="text-red-600">Failed to load membership status.</p></div>';
    }
}

function displayMembershipStatus(isMember) {
    const container = document.getElementById('membershipContainer');

    if (isMember) {
        container.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-8 text-center">
                <div class="text-6xl mb-4">🎉</div>
                <h3 class="text-2xl font-bold text-zoo-darkbrown mb-3">Active Membership</h3>
                <p class="text-zoo-brown mb-4">You are currently a Zoo Member!</p>
                
                <div class="bg-zoo-cream border-2 border-zoo-primary rounded-lg p-6 mb-6">
                    <h4 class="font-bold text-zoo-darkbrown mb-3">Your Benefits:</h4>
                    <ul class="text-left space-y-2 text-zoo-darkbrown">
                        <li>✓ 12-month unlimited zoo access</li>
                        <li>✓ One free merchandise item (collect at zoo)</li>
                        <li>✓ Priority booking for special events</li>
                        <li>✓ Exclusive member newsletter</li>
                    </ul>
                </div>
                
                <a href="/pages/event-list.html" class="inline-block bg-zoo-primary hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                    Explore Zoo Events
                </a>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-12 text-center">
                <div class="text-6xl mb-4">🐾</div>
                <h3 class="text-xl font-bold text-zoo-darkbrown mb-2">No Active Membership</h3>
                <p class="text-zoo-brown mb-6">Become a member to enjoy exclusive benefits!</p>
                
                <div class="bg-zoo-cream rounded-lg p-6 mb-6">
                    <h4 class="font-bold text-zoo-darkbrown mb-3">Membership Benefits:</h4>
                    <ul class="text-left space-y-2 text-zoo-darkbrown">
                        <li>✓ 12-month unlimited zoo access</li>
                        <li>✓ One free merchandise item (collect at zoo)</li>
                        <li>✓ Priority booking for special events</li>
                        <li>✓ Exclusive member newsletter</li>
                    </ul>
                    <p class="text-xl font-bold text-zoo-primary mt-4">Only $380/year</p>
                </div>
                
                <a href="/pages/membership.html" class="inline-block bg-zoo-primary hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                    Become a Member
                </a>
            </div>
        `;
    }
}