document.addEventListener("DOMContentLoaded", function () {
    const toastMessage = sessionStorage.getItem("toastMessage");
    if (toastMessage) {
        showToast(toastMessage);
        sessionStorage.removeItem("toastMessage"); 
    }
});

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('opacity-100');

    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.remove('opacity-0', 'opacity-100');
        }, 500);
    }, 2000);
}

