document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const loginRequest = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    const response = await fetch('/api/UsersAPI/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginRequest)
    });

    if (response.ok) {
        const data = await response.json();

        console.log('Login response data:', data);  // ADD THIS DEBUG LINE

        // Store complete user object in localStorage
        const userObject = {
            UserID: data.userID,
            Username: data.username,
            Email: data.email,
            FullName: data.fullName,
            IsAdmin: data.isAdmin
        };

        console.log('Saving to localStorage:', userObject);  // ADD THIS DEBUG LINE
        localStorage.setItem('user', JSON.stringify(userObject));
        console.log('localStorage after save:', localStorage.getItem('user'));  // ADD THIS DEBUG LINE

        // Keep sessionStorage for compatibility
        sessionStorage.setItem('userId', data.userID);
        sessionStorage.setItem('isAdmin', data.isAdmin);
        sessionStorage.setItem('username', data.username);

        sessionStorage.setItem('favouriteAnimals', JSON.stringify(data.favouriteAnimals));
        sessionStorage.setItem('favouriteEvents', JSON.stringify(data.savedEvents));

        showToast('Sucessfully logged in!');
        setTimeout(() => {
            window.location.href = `/`;
        }, 1500);
    }
});

// Toast message
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('opacity-100');

    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.remove('opacity-0', 'opacity-100');
        }, 500);
    }, 2500);
}
