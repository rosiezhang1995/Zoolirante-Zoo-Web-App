function createNavbar() {
    const username = sessionStorage.getItem('username'); // stored at login
    let accountSection;

    if (username) {
        // Show account link with username
        accountSection = `
            <div class="flex items-center space-x-2 text-zoo-darkbrown font-medium">               
                <a href="/pages/user-account.html" class="text-zoo-darkbrown flex items-center font-medium no-underline hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    ${username}
                </a>
                <a href="/pages/user-account.html?tab=notification" aria-label="Notifications" class="relative inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <span id="notification-badge" class="hidden absolute top-1 right-2 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-white"></span>
                </a>
            </div>
        `;
    } else {
        // Show sign in link
        accountSection = `
            <a href="/pages/login.html" class="text-zoo-darkbrown flex items-center font-medium no-underline hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                Sign In
            </a>
        `;
    }

    const navbarHTML = `
        <header class="sticky top-0 z-50 bg-zoo-soft shadow">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex items-center justify-between h-16">
                    <div class="flex-shrink-0">
                        <a href="/" class="flex items-center text-zoo-darkbrown font-medium no-underline hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </a>
                    </div>
                      
                    <nav class="flex-1">
                        <ul class="flex justify-center space-x-6">
                            <li><a href="#" class="text-zoo-darkbrown font-medium no-underline hover:underline">Tickets</a></li>
                            <li><a href="#" class="text-zoo-darkbrown font-medium no-underline hover:underline">Memberships</a></li>
                            <li><a href="map.html" class="text-zoo-darkbrown font-medium no-underline hover:underline">Map</a></li>
                            <li><a href="animal-list.html" class="text-zoo-darkbrown font-medium no-underline hover:underline">Animals</a></li>
                            <li><a href="event-list.html" class="text-zoo-darkbrown font-medium no-underline hover:underline">Events</a></li>
                            <li><a href="merchandise-list.html" class="text-zoo-darkbrown font-medium no-underline hover:underline">Merchandise</a></li>
                        </ul>
                    </nav>
                     
                    <div class="flex-shrink-0">
                        ${accountSection}
                    </div>
                </div>
            </div>
        </header>
    `;

    return navbarHTML;
}

// Insert navbar at the top
document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('afterbegin', createNavbar());
});
