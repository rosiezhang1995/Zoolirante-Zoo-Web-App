document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const user = {
        username: document.getElementById('username').value,
        passwordHash: document.getElementById('password').value, // will be hashed on server
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        isAdmin: false,
        isMember: false
    };

    const response = await fetch('/api/UsersAPI/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });

    if (response.ok) {
        const createdUser = await response.json();
        sessionStorage.setItem('userId', createdUser.userID);
        sessionStorage.setItem('isAdmin', createdUser.isAdmin);
        alert('Signup successful!');
        window.location.href = '/';
    } else {
        alert('Error signing up.');
    }
});