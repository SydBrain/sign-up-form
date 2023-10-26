document.addEventListener("DOMContentLoaded", () => {

    // DOM Elements
    const passwordInputs = document.querySelectorAll('[data-password]');
    const togglePasswordIcons = document.querySelectorAll('.toggle-password-icon');

    // Event Listeners
    togglePasswordIcons.forEach(passwordIcon => {
        passwordIcon.addEventListener('click', togglePasswordVisibility);
    });

    // Functions
    function togglePasswordVisibility(event) {
        const passwordIcon = event.target;
        const passwordInput = passwordIcon.closest('.password-input').querySelector('[data-password]');
        const inputType = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", inputType);
        const iconPath = inputType === "password" ? "/assets/images/eye-off.svg" : "/assets/images/eye.svg";
        passwordIcon.setAttribute("src", iconPath);
    }
});
