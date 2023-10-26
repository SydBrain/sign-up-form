document.addEventListener("DOMContentLoaded", () => {

    // DOM Elements
    const form = document.querySelector("[data-form]");
    const passwordFormGroup = document.querySelector("[data-password-group]");
    const passwordInputElement = document.getElementById("password");
    const confirmPasswordInputElement = document.getElementById("confirm-password");
    const togglePasswordIcons = document.querySelectorAll('.toggle-password-icon');

    // Event Listeners
    togglePasswordIcons.forEach(passwordIcon => {
        passwordIcon.addEventListener('click', togglePasswordVisibility);
    });

    passwordFormGroup.addEventListener("focusout", (event) => {
        const password = passwordInputElement.value;
        const confirmPassword = confirmPasswordInputElement.value;

        markAsTouched(event.target);

        if (event.target === passwordInputElement || event.target === confirmPasswordInputElement) {
            if (!isValid(passwordInputElement)) {
                displayErrorMessage(passwordInputElement, "Invalid Password");
                markAsInvalid(passwordInputElement);
            } else {
                markAsValid(passwordInputElement);
            }

            if (!isValid(confirmPasswordInputElement)) {
                displayErrorMessage(confirmPasswordInputElement, "Invalid Password");
                markAsInvalid(confirmPasswordInputElement);
            } else {
                markAsValid(confirmPasswordInputElement);
            }

            // Check if the passwords match
            if (!doPasswordsMatch(password, confirmPassword)) {
                displayErrorMessage(confirmPasswordInputElement, "Passwords do not match!");
                markAsInvalid(passwordInputElement);
                markAsInvalid(confirmPasswordInputElement);
            } else if (isValid(passwordInputElement) && isValid(confirmPasswordInputElement)) {
                deleteErrorMessage(passwordInputElement);
                deleteErrorMessage(confirmPasswordInputElement);
                markAsValid(passwordInputElement);
                markAsValid(confirmPasswordInputElement);
            }
        }

    })

    // Initialization
    resetForm();

    // Functions
    function togglePasswordVisibility(event) {
        const passwordIcon = event.target;
        const passwordInput = passwordIcon.closest('.password-input').querySelector('[data-password]');
        const inputType = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", inputType);
        togglePasswordIcon(inputType, passwordIcon);
    }

    function togglePasswordIcon(inputType, passwordIcon) {
        const iconPath = inputType === "password" ? "/assets/images/eye-off.svg" : "/assets/images/eye.svg";
        passwordIcon.setAttribute("src", iconPath);
    }

    function displayErrorMessage(element, message) {
        const existingError = element.parentElement.querySelector('.helper-text-negative');
        if (existingError) {
            existingError.remove();
        }

        const errorMessage = document.createElement('p');
        errorMessage.classList.add('helper-text-negative');
        errorMessage.textContent = message;
        element.parentElement.insertBefore(errorMessage, element.nextSibling);
    }

    function deleteErrorMessage(element) {
        const errorMessage = element.parentElement.querySelector('.helper-text-negative');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    function doPasswordsMatch(password, confirmPassword) {
        if (password === "" || confirmPassword === "") return;
        return password === confirmPassword;
    }

    function isValid(inputElement) {
        return inputElement.checkValidity();
    }

    function markAsValid(element) {
        element.classList.remove('invalid');
        element.classList.add('valid');
    }

    function markAsInvalid(element) {
        element.classList.remove('valid');
        element.classList.add('invalid');
    }

    function markAsTouched(element) {
        element.classList.add('touched');
    }

    function resetForm() {
        form.reset();
    }
});
