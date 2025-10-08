let ticketTypes = [];
let selectedTickets = {};
let currentStep = 1;
let currentUser = null;
let savedPaymentMethods = [];

document.addEventListener('DOMContentLoaded', () => {
    loadTicketTypes();
    setMinDate();
    checkUserLogin();
});

function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('visitDate').min = today;
    document.getElementById('visitDate').value = today;
}

function checkUserLogin() {
    const userString = localStorage.getItem('user');
    if (userString) {
        currentUser = JSON.parse(userString);
        document.getElementById('saveCardOption').classList.remove('hidden');
        loadSavedPaymentMethods();
    }
}

async function loadTicketTypes() {
    try {
        const response = await fetch('/api/BookingsAPI/ticket-types');
        ticketTypes = await response.json();
        displayTicketTypes();
    } catch (error) {
        console.error('Error loading ticket types:', error);
    }
}

function displayTicketTypes() {
    const container = document.getElementById('ticketTypesContainer');
    container.innerHTML = '';

    ticketTypes.forEach(ticket => {
        const card = `
      <div class="border-2 border-gray-200 rounded-lg p-4 hover:border-zoo-primary transition">
        <div class="flex justify-between items-center">
          <div class="flex-1">
            <h4 class="font-bold text-lg text-zoo-darkbrown">${ticket.typeName}</h4>
            <p class="text-sm text-gray-600">${ticket.description}</p>
          </div>
          <div class="text-right mx-4">
            <p class="text-2xl font-bold text-zoo-primary">$${ticket.price.toFixed(2)}</p>
          </div>
          <div class="flex items-center space-x-2">
            <button onclick="decrementTicket(${ticket.ticketTypeID})"
              class="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full font-bold text-xl transition">-</button>
            <span id="qty-${ticket.ticketTypeID}" class="w-10 text-center font-bold text-lg">0</span>
            <button onclick="incrementTicket(${ticket.ticketTypeID})"
              class="w-10 h-10 bg-zoo-primary hover:bg-amber-700 text-white rounded-full font-bold text-xl transition">+</button>
          </div>
        </div>
      </div>
    `;
        container.innerHTML += card;
    });
}

function incrementTicket(ticketTypeID) {
    if (!selectedTickets[ticketTypeID]) {
        const ticket = ticketTypes.find(t => t.ticketTypeID === ticketTypeID);
        selectedTickets[ticketTypeID] = {
            ticketTypeID: ticketTypeID,
            typeName: ticket.typeName,
            price: ticket.price,
            quantity: 0
        };
    }
    selectedTickets[ticketTypeID].quantity++;
    document.getElementById(`qty-${ticketTypeID}`).textContent =
        selectedTickets[ticketTypeID].quantity;
    updateOrderSummary();
}

function decrementTicket(ticketTypeID) {
    if (selectedTickets[ticketTypeID] && selectedTickets[ticketTypeID].quantity > 0) {
        selectedTickets[ticketTypeID].quantity--;
        if (selectedTickets[ticketTypeID].quantity === 0) {
            delete selectedTickets[ticketTypeID];
        }
        document.getElementById(`qty-${ticketTypeID}`).textContent =
            selectedTickets[ticketTypeID] ? selectedTickets[ticketTypeID].quantity : 0;
        updateOrderSummary();
    }
}

function updateOrderSummary() {
    const summaryDiv = document.getElementById('orderSummary');
    let subtotal = 0;

    if (Object.keys(selectedTickets).length === 0) {
        summaryDiv.innerHTML = '<p class="text-gray-500 text-center py-4">No tickets selected</p>';
        document.getElementById('subtotal').textContent = '$0.00';
        document.getElementById('total').textContent = '$0.00';
        return;
    }

    let summaryHTML = '<div class="space-y-2">';
    for (const ticketID in selectedTickets) {
        const ticket = selectedTickets[ticketID];
        const lineTotal = ticket.price * ticket.quantity;
        subtotal += lineTotal;

        summaryHTML += `
      <div class="flex justify-between items-center py-2 border-b">
        <div>
          <p class="font-semibold text-zoo-darkbrown">${ticket.typeName}</p>
          <p class="text-sm text-gray-600">${ticket.quantity} × $${ticket.price.toFixed(2)}</p>
        </div>
        <p class="font-bold text-lg">$${lineTotal.toFixed(2)}</p>
      </div>
    `;
    }
    summaryHTML += '</div>';

    summaryDiv.innerHTML = summaryHTML;
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
}

async function loadSavedPaymentMethods() {
    if (!currentUser) return;

    try {
        const response = await fetch(`/api/PaymentMethodsAPI/user/${currentUser.userID || currentUser.UserID}`);
        savedPaymentMethods = await response.json();

        if (savedPaymentMethods.length > 0) {
            displaySavedPaymentMethods();
        }
    } catch (error) {
        console.error('Error loading payment methods:', error);
    }
}

function displaySavedPaymentMethods() {
    const container = document.getElementById('savedPaymentMethods');
    container.innerHTML = '';

    savedPaymentMethods.forEach(pm => {
        const methodDiv = `
      <label class="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-zoo-primary transition">
        <input type="radio" name="paymentMethod" value="${pm.paymentMethodID}" class="mr-3" ${pm.isDefault ? 'checked' : ''}>
        <div class="flex-1">
          <span class="font-semibold">${pm.cardType} •••• ${pm.lastFourDigits}</span>
          ${pm.isDefault ? '<span class="ml-2 text-xs bg-zoo-primary text-white px-2 py-1 rounded">Default</span>' : ''}
          <p class="text-sm text-gray-600">Expires ${pm.expiryMonth}/${pm.expiryYear}</p>
        </div>
      </label>
    `;
        container.innerHTML += methodDiv;
    });

    document.getElementById('savedPaymentMethodsSection').classList.remove('hidden');
    document.getElementById('newCardForm').classList.add('hidden');
}

document.getElementById('showNewCardForm')?.addEventListener('click', () => {
    document.getElementById('newCardForm').classList.remove('hidden');
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => radio.checked = false);
});

document.getElementById('continueToDetails').addEventListener('click', () => {
    if (Object.keys(selectedTickets).length === 0) {
        alert('Please select at least one ticket');
        return;
    }

    const visitDate = document.getElementById('visitDate').value;
    if (!visitDate) {
        alert('Please select a visit date');
        return;
    }

    document.getElementById('selectedDate').textContent = new Date(visitDate).toLocaleDateString('en-AU', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    document.getElementById('visitDateDisplay').classList.remove('hidden');

    if (currentUser) {
        document.getElementById('customerName').value = currentUser.FullName || currentUser.Username || '';
        document.getElementById('customerEmail').value = currentUser.Email || '';
    }

    showStep(2);
});

document.getElementById('backToTickets').addEventListener('click', () => showStep(1));

document.getElementById('continueToPayment').addEventListener('click', () => {
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();

    if (!name || !email || !phone) {
        alert('Please fill in all required fields');
        return;
    }

    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    showStep(3);
});

document.getElementById('backToDetails').addEventListener('click', () => showStep(2));

function showStep(step) {
    document.getElementById('ticketSelection').classList.add('hidden');
    document.getElementById('customerDetails').classList.add('hidden');
    document.getElementById('paymentSection').classList.add('hidden');

    ['step1', 'step2', 'step3'].forEach(id => {
        document.getElementById(id).classList.remove('bg-zoo-primary', 'text-white');
        document.getElementById(id).classList.add('bg-gray-300', 'text-gray-600');
    });

    if (step === 1) {
        document.getElementById('ticketSelection').classList.remove('hidden');
        document.getElementById('step1').classList.remove('bg-gray-300', 'text-gray-600');
        document.getElementById('step1').classList.add('bg-zoo-primary', 'text-white');
    } else if (step === 2) {
        document.getElementById('customerDetails').classList.remove('hidden');
        document.getElementById('step2').classList.remove('bg-gray-300', 'text-gray-600');
        document.getElementById('step2').classList.add('bg-zoo-primary', 'text-white');
    } else if (step === 3) {
        document.getElementById('paymentSection').classList.remove('hidden');
        document.getElementById('step3').classList.remove('bg-gray-300', 'text-gray-600');
        document.getElementById('step3').classList.add('bg-zoo-primary', 'text-white');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    currentStep = step;
}

document.getElementById('completeBooking').addEventListener('click', async () => {
    const button = document.getElementById('completeBooking');
    button.disabled = true;
    button.textContent = 'Processing...';

    try {
        let paymentMethodID = null;
        let paymentMethodDisplay = 'Simulated Payment';

        const selectedRadio = document.querySelector('input[name="paymentMethod"]:checked');
        if (selectedRadio) {
            paymentMethodID = parseInt(selectedRadio.value);
            const pm = savedPaymentMethods.find(p => p.paymentMethodID === paymentMethodID);
            if (pm) {
                paymentMethodDisplay = `${pm.cardType} •••• ${pm.lastFourDigits}`;
            }
        } else {
            const cardNumber = document.getElementById('cardNumber').value;
            if (cardNumber.length >= 13) {
                paymentMethodDisplay = `Card ending in ${cardNumber.slice(-4)}`;

                if (currentUser && document.getElementById('saveCard').checked) {
                    const cardHolder = document.getElementById('cardHolder').value;
                    const cardExpiry = document.getElementById('cardExpiry').value.split('/');

                    await fetch('/api/PaymentMethodsAPI', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            userID: currentUser.UserID || currentUser.userID,
                            cardHolderName: cardHolder,
                            cardNumber: cardNumber,
                            expiryMonth: parseInt(cardExpiry[0]),
                            expiryYear: 2000 + parseInt(cardExpiry[1]),
                            isDefault: savedPaymentMethods.length === 0
                        })
                    });
                }
            }
        }

        const bookingData = {
            userID: currentUser?.UserID || currentUser?.userID,
            customerName: document.getElementById('customerName').value.trim(),
            customerEmail: document.getElementById('customerEmail').value.trim(),
            customerPhone: document.getElementById('customerPhone').value.trim(),
            visitDate: document.getElementById('visitDate').value,
            items: Object.values(selectedTickets).map(t => ({
                ticketTypeID: t.ticketTypeID,
                quantity: t.quantity
            })),
            paymentMethodID: paymentMethodID,
            paymentMethodDisplay: paymentMethodDisplay
        };

        const response = await fetch('/api/BookingsAPI', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });

        if (!response.ok) throw new Error('Booking failed');

        const result = await response.json();

        document.getElementById('bookingReference').textContent = result.bookingReference;
        document.getElementById('modalTotal').textContent = '$' + result.totalAmount.toFixed(2);
        document.getElementById('successModal').classList.remove('hidden');
    } catch (error) {
        console.error('Error:', error);
        alert('Booking failed. Please try again.');
        button.disabled = false;
        button.textContent = 'Complete Booking';
    }
});
