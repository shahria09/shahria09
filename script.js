// script.js

const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('include-uppercase');
const lowercaseEl = document.getElementById('include-lowercase');
const numbersEl = document.getElementById('include-numbers');
const symbolsEl = document.getElementById('include-symbols');
const passwordEl = document.getElementById('password');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const lengthValue = document.getElementById('length-value');
const strengthValue = document.getElementById('strength-value');
const errorMessage = document.getElementById('error-message');

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

lengthEl.addEventListener('input', () => {
    lengthValue.textContent = lengthEl.value;
});

generateBtn.addEventListener('click', () => {
    errorMessage.style.display = 'none';
    const length = parseInt(lengthEl.value);
    let charset = '';

    if (uppercaseEl.checked) charset += uppercase;
    if (lowercaseEl.checked) charset += lowercase;
    if (numbersEl.checked) charset += numbers;
    if (symbolsEl.checked) charset += symbols;

    if (charset === '') {
        showError("Please select at least one character type.");
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    passwordEl.value = password;
    checkStrength(password);
});

copyBtn.addEventListener('click', () => {
    if (passwordEl.value === '') {
        showError("No password to copy. Generate a password first.");
    } else {
        passwordEl.select();
        document.execCommand('copy');
        alert('Password copied to clipboard!');
    }
});

function checkStrength(password) {
    let strength = 'Weak';
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
        strength = 'Strong';
    } else if (password.length >= 6 && (/[A-Z]/.test(password) || /[0-9]/.test(password))) {
        strength = 'Medium';
    }
    strengthValue.textContent = strength;
    strengthValue.style.color = strength === 'Strong' ? '#4CAF50' : strength === 'Medium' ? '#FF9800' : '#FF5722';
}

function showError(message) {
    errorMessage.style.display = 'block';
    errorMessage.textContent = message;
}
