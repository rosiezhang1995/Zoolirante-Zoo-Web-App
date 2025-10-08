let currentStep = 2;
let currentUser = null;
let savedPaymentMethod = null;

document.addEventListener('DOMContentLoaded', () => {
    checkUserLogin();
    showStep(2);
});

async function checkUserLogin() {
    const userId = sessionStorage.getItem('userId');

    if (userId) {
        // Load saved payment method
        await loadSavedPaymentMethod(userId);
    } else {
        // Not logged in, redirect to login
        alert('Please log in to purchase membership');
        window.location.href = '/pages/login.html';
    }
}

async function loadSavedPaymentMethod(userId) {
    try {
        const response = await fetch(`/api/PaymentMethodsAPI/user/${userId}`);

        if (response.ok) {
            savedPaymentMethod = await response.json();
            displaySavedPaymentMethod();
        } else {
            savedPaymentMethod = null;
            // Show new card form
            document.getElementById('newCardForm').classList.remove('hidden');
            document.getElementById('saveCardOption').classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error loading payment method:', error);
        savedPaymentMethod = null;
        document.getElementById('newCardForm').classList.remove('hidden');
        document.getElementById('saveCardOption').classList.remove('hidden');
    }
}

function displaySavedPaymentMethod() {
    if (!savedPaymentMethod) return;

    // Hide new card form
    document.getElementById('newCardForm').classList.add('hidden');
    document.getElementById('saveCardOption').classList.add('hidden');

    // Create saved payment method display
    const paymentSection = document.getElementById('paymentSection');
    const savedCardHTML = `
        <div id="savedPaymentMethodSection" class="mb-6">
            <h3 class="text-lg font-semibold text-zoo-darkbrown mb-3">Your Saved Payment Method</h3>
            <div class="p-4 border-2 border-zoo-primary rounded-lg bg-zoo-cream">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-bold text-zoo-darkbrown">${savedPaymentMethod.cardType} •••• ${savedPaymentMethod.lastFourDigits}</p>
                        <p class="text-sm text-zoo-darkbrown font-semibold">Cardholder: ${savedPaymentMethod.cardHolderName}</p>
                        <p class="text-sm text-zoo-darkbrown font-semibold">Expires: ${savedPaymentMethod.expiryMonth.toString().padStart(2, '0')}/${savedPaymentMethod.expiryYear}</p>
                        ${savedPaymentMethod.isExpired ? '<p class="text-sm text-red-600 font-semibold mt-1">⚠️ This card has expired</p>' : ''}
                    </div>
                    <div class="text-right">
                        <span class="bg-zoo-primary text-white px-3 py-1 rounded-full text-xs font-semibold">Saved Card</span>
                    </div>
                </div>
            </div>
            <p class="text-xs text-zoo-brown font-semibold mt-2">
                This saved payment method will be used for your membership purchase. You can manage your payment methods in your account settings.
            </p>
        </div>
    `;

    // Insert before the new card form
    const newCardForm = document.getElementById('newCardForm');
    newCardForm.insertAdjacentHTML('beforebegin', savedCardHTML);
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
    const button = document.getElementById('completeBooking');

    if (!userId) {
        alert('Please log in to purchase membership');
        window.location.href = '/pages/login.html';
        return;
    }

    button.disabled = true;
    button.textContent = 'Processing...';

    try {
        let shouldSaveCard = false;

        // Check if using saved payment method
        if (savedPaymentMethod) {
            // Using saved payment method
            if (savedPaymentMethod.isExpired) {
                alert('Your saved card has expired. Please update your payment method in account settings before purchasing.');
                button.disabled = false;
                button.textContent = 'Complete Purchase';
                return;
            }
        } else {
            // Using new card
            const cardNumber = document.getElementById('cardNumber').value.trim();
            const cardHolder = document.getElementById('cardHolder').value.trim();
            const cardExpiry = document.getElementById('cardExpiry').value.trim();
            const cardCVV = document.getElementById('cardCVV').value.trim();

            if (!cardNumber || !cardHolder || !cardExpiry || !cardCVV) {
                alert('Please fill in all card details');
                button.disabled = false;
                button.textContent = 'Complete Purchase';
                return;
            }

            if (cardNumber.length < 13) {
                alert('Please enter a valid card number');
                button.disabled = false;
                button.textContent = 'Complete Purchase';
                return;
            }

            // Check if user wants to save this card
            if (document.getElementById('saveCard').checked) {
                shouldSaveCard = true;
            }
        }

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

        // If user wants to save the new card, save it after successful purchase
        if (shouldSaveCard) {
            const cardNumber = document.getElementById('cardNumber').value.trim();
            const cardHolder = document.getElementById('cardHolder').value.trim();
            const cardExpiry = document.getElementById('cardExpiry').value.trim().split('/');

            try {
                await fetch('/api/PaymentMethodsAPI', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userID: parseInt(userId),
                        cardHolderName: cardHolder,
                        cardNumber: cardNumber.replace(/\s/g, ''),
                        expiryMonth: parseInt(cardExpiry[0]),
                        expiryYear: parseInt(cardExpiry[1]) < 100 ? 2000 + parseInt(cardExpiry[1]) : parseInt(cardExpiry[1])
                    })
                });
            } catch (saveError) {
                console.error('Error saving payment method:', saveError);
                // Don't fail the membership purchase if card save fails
            }
        }

        // Show success modal
        const modal = document.getElementById('successModal');
        modal.classList.remove('hidden');

        console.log('Membership activated successfully');
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to complete purchase. Please try again.');
        button.disabled = false;
        button.textContent = 'Complete Purchase';
    }
});