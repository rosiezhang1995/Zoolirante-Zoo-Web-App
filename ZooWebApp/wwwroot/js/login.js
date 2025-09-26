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
        sessionStorage.setItem('userId', data.userID);
        sessionStorage.setItem('isAdmin', data.isAdmin);
        sessionStorage.setItem('username', data.username);
        showToast('Sucessfully logged in!');
        setTimeout(() => {
            window.location.href = `/`;
        }, 1500);
    } else {
        alert('Invalid username or password.');
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
