const form = document.querySelector("form"),
    emailField = form.querySelector(".email-field"),
    emailInput = emailField.querySelector(".email"),
    passField = form.querySelector(".create-password"),
    passInput = passField.querySelector(".password"),
    cPassField = form.querySelector(".confirm-password"),
    cPassInput = cPassField.querySelector(".cPassword");


const loginData = {
    email: emailInput.value,
    password: passInput.value
};


// Email Validtion
function checkEmail() {
    const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailInput.value.match(emaiPattern)) {
        return emailField.classList.add("invalid"); //adding invalid class if email value do not matched with email pattern
    }
    emailField.classList.remove("invalid"); //removing invalid class if email value matched with emaiPattern
}


// Hide and show password
const eyeIcons = document.querySelectorAll(".show-hide");

eyeIcons.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
        const pInput = eyeIcon.parentElement.querySelector("input"); //getting parent element of eye icon and selecting the password input
        if (pInput.type === "password") {
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return (pInput.type = "text");
        }
        eyeIcon.classList.replace("bx-show", "bx-hide");
        pInput.type = "password";
    });
});

// Password Validation
function createPass() {
    const passPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passInput.value.match(passPattern)) {
        return passField.classList.add("invalid"); //adding invalid class if password input value do not match with passPattern
    }
    passField.classList.remove("invalid"); //removing invalid class if password input value matched with passPattern
}

// Confirm Password Validtion
function confirmPass() {
    if (passInput.value !== cPassInput.value || cPassInput.value === "") {
        return cPassField.classList.add("invalid");
    }
    cPassField.classList.remove("invalid");
}


const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let captcha = "";
for (let i = 0; i < 4; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
}
document.querySelector(".captcha-charaters").textContent += captcha;

const captchaInput = document.querySelector(".captcha");
const captchaError = document.querySelector(".captcha-error");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (captchaInput.value !== captcha) {
        captchaError.style.display = "block";
    } else {
        captchaError.style.display = "none";
    }
});


function checkCaptcha() {
    if (captchaInput.value !== captcha) {
        return captchaError.classList.add("invalid");
    }
    captchaError.classList.remove("invalid");
}


form.addEventListener("submit", (e) => {
    e.preventDefault(); //preventing form submitting
    checkEmail();
    createPass();
    confirmPass();
    checkCaptcha();

    //calling function on key up
    emailInput.addEventListener("keyup", checkEmail);
    passInput.addEventListener("keyup", createPass);
    cPassInput.addEventListener("keyup", confirmPass);
    captchaInput.addEventListener("keyup", checkCaptcha);

    if (
        !emailField.classList.contains("invalid") &&
        !passField.classList.contains("invalid") &&
        !cPassField.classList.contains("invalid") &&
        !captchaError.classList.contains("invalid")
    ) {
        location.href = form.getAttribute("action");
    } else {
        alert("You must fill all the fields correctly before submitting!");
    }

});


form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Erstelle das JSON-Objekt mit den Logindaten
    const loginData = {
        email: emailInput.value,
        password: passInput.value,
    };

    // Konvertiere das JSON-Objekt in einen String und speichere es im Browser
    localStorage.setItem("loginData", JSON.stringify(loginData));
});

// Wandle das Logindaten-Objekt in einen JSON-String um
const loginDataJSON = JSON.stringify(loginData);

// Speichere den JSON-String im lokalen Speicher des Browsers
localStorage.setItem("loginData", loginDataJSON);

// Check password strength and update progress bar
function updatePasswordStrength() {
    const password = passInput.value;
    let strength = 0;

    // Check password length
    if (password.length >= 8) {
        strength += 25;
    }

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
        strength += 25;
    }

    // Check for lowercase letters
    if (/[a-z]/.test(password)) {
        strength += 25;
    }

    // Check for numbers
    if (/[0-9]/.test(password)) {
        strength += 25;
    }

    // Update progress bar value
    const passwordStrengthBar = form.querySelector(".password-strength-bar");
    passwordStrengthBar.value = strength;
}

// Update password strength when password is typed
passInput.addEventListener("keyup", updatePasswordStrength);
