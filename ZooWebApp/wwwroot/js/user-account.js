const buttons = document.querySelectorAll(".tab-btn");
const tabs = document.querySelectorAll(".tab-content");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const tabId = btn.dataset.tab;
        tabs.forEach(tab => tab.classList.add("hidden"));
        document.getElementById(tabId).classList.remove("hidden");
    });
});

