// Payment Method Management 
async function loadPaymentMethod() {
    const userId = sessionStorage.getItem("userId");
    const container = document.getElementById('paymentMethodContainer');

    if (!userId) {
        container.innerHTML = '<div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"><p class="text-red-600">Please log in to view your payment methods.</p></div>';
        return;
    }

    container.innerHTML = '<div class="text-center py-12"><p class="text-gray-500">Loading...</p></div>';

    try {
        const response = await fetch(`/api/PaymentMethodsAPI/user/${userId}`);

        if (response.ok) {
            const paymentMethod = await response.json();
            displayPaymentMethod(paymentMethod);
        } else if (response.status === 404) {
            displayNoPaymentMethod();
        } else {
            throw new Error('Failed to load payment method');
        }
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"><p class="text-red-600">Failed to load payment method. Please try again.</p></div>';
    }
}

function displayPaymentMethod(pm) {
    const container = document.getElementById('paymentMethodContainer');

    const expiryStatus = pm.isExpired
        ? '<span class="text-red-600 font-semibold">⚠️ Expired</span>'
        : '<span class="text-green-600 font-semibold">✓ Active</span>';

    container.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-zoo-darkbrown">Your Saved Payment Method</h3>
                <button onclick="deletePaymentMethod(${pm.paymentMethodID})" 
                        class="bg-white border hover:bg-zoo-brown text-zoo-darkbrown px-4 py-2 rounded-lg font-semibold transition">
                    Delete Card
                </button>
            </div>
            
            <div class="bg-zoo-cream border-2 border-zoo-primary rounded-lg p-6">
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Card Type</p>
                        <p class="font-bold text-lg text-zoo-darkbrown">${pm.cardType}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Card Number</p>
                        <p class="font-bold text-lg text-zoo-darkbrown">•••• •••• •••• ${pm.lastFourDigits}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Cardholder Name</p>
                        <p class="font-bold text-zoo-darkbrown">${pm.cardHolderName}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Expiry Date</p>
                        <p class="font-bold text-zoo-darkbrown">${pm.expiryMonth.toString().padStart(2, '0')}/${pm.expiryYear}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Status</p>
                        <p class="font-bold">${expiryStatus}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Added On</p>
                        <p class="font-bold text-zoo-darkbrown">${new Date(pm.createdAt).toLocaleDateString('en-AU')}</p>
                    </div>
                </div>
            </div>
            
            <div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p class="text-sm text-blue-800">
                    <strong>💡 Note:</strong> To update your card details, delete this card and add a new one. 
                    You can only have one saved payment method for security purposes.
                </p>
            </div>
        </div>
    `;
}

function displayNoPaymentMethod() {
    const container = document.getElementById('paymentMethodContainer');

    container.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-12 text-center">
            <div class="text-6xl mb-4">💳</div>
            <h3 class="text-xl font-bold text-zoo-darkbrown mb-2">No Payment Method Saved</h3>
            <p class="text-zoo-brown mb-6">Add a payment method to make future bookings faster</p>
            <button onclick="showAddPaymentForm()" class="bg-zoo-primary hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition mb-3">
                Add Payment Method
            </button>
        </div>
    `;
}

function showAddPaymentForm() {
    const container = document.getElementById('paymentMethodContainer');

    container.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-bold text-zoo-darkbrown mb-4">Add Payment Method</h3>
            
            <form id="addPaymentForm" class="space-y-4">
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="md:col-span-2">
                        <label class="block text-zoo-darkbrown font-semibold mb-2">Card Number *</label>
                        <input type="text" id="newCardNumber" placeholder="1234 5678 9012 3456" maxlength="19" required
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zoo-primary">
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-zoo-darkbrown font-semibold mb-2">Cardholder Name *</label>
                        <input type="text" id="newCardHolder" placeholder="Full Name" required
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zoo-primary">
                    </div>
                    <div>
                        <label class="block text-zoo-darkbrown font-semibold mb-2">Expiry Month *</label>
                        <select id="newExpiryMonth" required
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zoo-primary">
                            <option value="">Select Month</option>
                            ${Array.from({ length: 12 }, (_, i) => i + 1).map(m =>
        `<option value="${m}">${m.toString().padStart(2, '0')}</option>`
    ).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-zoo-darkbrown font-semibold mb-2">Expiry Year *</label>
                        <select id="newExpiryYear" required
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zoo-primary">
                            <option value="">Select Year</option>
                            ${Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(y =>
        `<option value="${y}">${y}</option>`
    ).join('')}
                        </select>
                    </div>

                    <div class="md:col-span-2">
                        <label class="block text-zoo-darkbrown font-semibold mb-2">CVV (Verification Only) *</label>
                        <input type="text" id="newCardCVV" placeholder="123" maxlength="4" required
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zoo-primary">
                    </div>
                </div>
                
                <div class="bg-zoo-cream rounded-lg p-4 mt-2 mb-2">
                    <p class="text-sm text-zoo-brown ">
                        <strong>⚠️ Important:</strong> You can only save one payment method. This card will be used for future bookings.
                    </p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <button type="button" onclick="loadPaymentMethod()" 
                            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold transition">
                        Cancel
                    </button>
                    <button type="submit" 
                            class="bg-zoo-primary hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                        Save Payment Method
                    </button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('addPaymentForm').addEventListener('submit', addPaymentMethod);
}

async function addPaymentMethod(event) {
    event.preventDefault();

    const userId = sessionStorage.getItem("userId");
    const cardNumber = document.getElementById('newCardNumber').value.replace(/\s/g, '');
    const cardHolder = document.getElementById('newCardHolder').value.trim();
    const expiryMonth = parseInt(document.getElementById('newExpiryMonth').value);
    const expiryYear = parseInt(document.getElementById('newExpiryYear').value);

    if (cardNumber.length < 13) {
        alert('Please enter a valid card number');
        return;
    }

    try {
        const response = await fetch('/api/PaymentMethodsAPI', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userID: parseInt(userId),
                cardHolderName: cardHolder,
                cardNumber: cardNumber,
                expiryMonth: expiryMonth,
                expiryYear: expiryYear
            })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message || 'Failed to add payment method');
            return;
        }

        loadPaymentMethod();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add payment method. Please try again.');
    }
}

async function deletePaymentMethod(paymentMethodID) {
    if (!confirm('Are you sure you want to delete this payment method? This action cannot be undone.')) {
        return;
    }

    const userId = sessionStorage.getItem("userId");
    if (!userId) {
        alert('Session expired. Please log in again.');
        return;
    }

    try {
        const response = await fetch(`/api/PaymentMethodsAPI/${paymentMethodID}?userId=${userId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();

        if (response.ok) {
            alert('Payment method deleted successfully!');
            await loadPaymentMethod();
        } else {
            alert(result.message || 'Failed to delete payment method');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete payment method. Please try again.');
    }
}