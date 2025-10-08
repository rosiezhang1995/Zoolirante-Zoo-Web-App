let currentStep = 2;
let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    checkUserLogin();
    showStep(2);
});

function checkUserLogin() {
    const userString = localStorage.getItem('user');
    if (userString) {
        currentUser = JSON.parse(userString);
        document.getElementById('saveCardOption').classList.remove('hidden');
    }
}

document.getElementById('continueToPayment').addEventListener('click', () => {
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();

    if (!name || !email || !phone) {
        alert('Please fill in all required fields');
        return;
    }

    showStep(3);
});

document.getElementById('backToDetails').addEventListener('click', () => showStep(2));

function showStep(step) {
    document.getElementById('customerDetails').classList.toggle('hidden', step !== 2);
    document.getElementById('paymentSection').classList.toggle('hidden', step !== 3);

    ['step1', 'step2', 'step3'].forEach(id => {
        const el = document.getElementById(id);
        el.classList.remove('bg-zoo-primary', 'text-white');
        el.classList.add('bg-gray-300', 'text-gray-600');
    });

    document.getElementById(`step${step}`).classList.remove('bg-gray-300', 'text-gray-600');
    document.getElementById(`step${step}`).classList.add('bg-zoo-primary', 'text-white');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('completeBooking').addEventListener('click', async () => {
    const userId = sessionStorage.getItem('userId');

    if (!userId) {
        alert('Please log in to purchase membership');
        window.location.href = '/pages/login.html';
        return;
    }

    try {
        // Update membership status
        const response = await fetch(`/api/UsersAPI/${userId}/membership`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(true)
        });

        if (!response.ok) {
            throw new Error('Failed to update membership');
        }

        // Show the success modal
        const modal = document.getElementById('successModal');
        modal.classList.remove('hidden');

        console.log('Membership activated successfully');
        } catch (error) {
        console.error('Error:', error);
        alert('Failed to complete purchase. Please try again.');
        }
});