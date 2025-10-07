document.addEventListener('DOMContentLoaded', function () {
    // Example: Add event listeners or initialize components based on home.html

    // Example: Handle a button click
    const greetBtn = document.getElementById('greet-btn');
    if (greetBtn) {
        greetBtn.addEventListener('click', function () {
            alert('Welcome to the Home Page!');
        });
    }

    // Example: Toggle a section
    const toggleSectionBtn = document.getElementById('toggle-section-btn');
    const section = document.getElementById('toggle-section');
    if (toggleSectionBtn && section) {
        toggleSectionBtn.addEventListener('click', function () {
            section.classList.toggle('hidden');
        });
    }

    // Add more JS logic as needed for home.html
});