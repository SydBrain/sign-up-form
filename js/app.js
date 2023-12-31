document.addEventListener("DOMContentLoaded", () => {

    // DOM Elements
    const form = document.querySelector("[data-form]");
    const passwordFormGroup = document.querySelector("[data-password-group]");
    const passwordInputElement = document.getElementById("password");
    const confirmPasswordInputElement = document.getElementById("confirm-password");
    const togglePasswordIcons = document.querySelectorAll('.toggle-password-icon');

    const emailInputElement = document.getElementById("email");

    // Event Listeners
    togglePasswordIcons.forEach(passwordIcon => {
        passwordIcon.addEventListener('click', togglePasswordVisibility);
    });

    form.addEventListener("focusout", (event) => {
        markAsTouched(event.target);
        if (!isValid(event.target)) {
            markAsInvalid(event.target);
        } else {
            markAsValid(event.target);
        }
        updateSubmitButtonState();
    })

    emailInputElement.addEventListener("focusout", () => {
        if (!isValid(emailInputElement)) {
            displayErrorMessage(emailInputElement, "Invalid email format");
        } else {
            deleteErrorMessage(emailInputElement);
        }
        updateSubmitButtonState();
    })

    passwordFormGroup.addEventListener("focusout", (event) => {
        const password = passwordInputElement.value;
        const confirmPassword = confirmPasswordInputElement.value;

        if (event.target === passwordInputElement || event.target === confirmPasswordInputElement) {
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
        updateSubmitButtonState();
    });


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
        const iconPath = inputType === "password" ? "assets/images/eye-off.svg" : "assets/images/eye.svg";
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

    function isFormValid() {
        const isValidEmail = isValid(emailInputElement);
        const isValidPassword = isValid(passwordInputElement) && isValid(confirmPasswordInputElement) &&
            doPasswordsMatch(passwordInputElement.value, confirmPasswordInputElement.value);
        return isValidEmail && isValidPassword;
    }

    function updateSubmitButtonState() {
        const submitButton = document.getElementById('submit-button');
        if (isFormValid()) {
            submitButton.removeAttribute('disabled');
        } else {
            submitButton.setAttribute('disabled', 'true');
        }
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
        updateSubmitButtonState();
    }
});
