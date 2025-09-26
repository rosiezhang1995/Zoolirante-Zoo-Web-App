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
        alert(`Welcome ${data.username}!`);
        window.location.href = '/';
    } else {
        alert('Invalid username or password.');
    }
});
