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
        sessionStorage.setItem('username', data.username);
        showToast('Account Sucessfully Created!');
        setTimeout(() => {
            window.location.href = `/`;
        }, 1500);
    } else {
        alert('Error signing up.');
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