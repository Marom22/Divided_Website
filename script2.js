// script2.js
// JavaScript Code
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-guess');
const newGameButton = document.getElementById('new-game');
const resultDisplay = document.getElementById('result');
let randomNumber = generateRandomNumber(); // Generate random number when the page loads
let guessAttempts = 0; // Counter for guess attempts

submitButton.addEventListener('click', checkGuess);
newGameButton.addEventListener('click', startNewGame); // Event listener for the new game button
guessInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

function checkGuess() {
    const guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        resultDisplay.textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }
    guessAttempts++; // Increment guess attempts
    if (guess < randomNumber) {
        resultDisplay.textContent = 'Too low! Try again.';
    } else if (guess > randomNumber) {
        resultDisplay.textContent = 'Too high! Try again.';
    } else {
        resultDisplay.textContent = `Congratulations! You guessed the correct number: ${randomNumber}`;
    }
    // Display the number of attempts
    let attemptsLine = document.getElementById('attempts-line');
    if (!attemptsLine) {
        resultDisplay.insertAdjacentHTML('afterend', `<p id="attempts-line">Number of guesses: ${guessAttempts}</p>`);
    } else {
        attemptsLine.textContent = `Number of guesses: ${guessAttempts}`;
    }
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function startNewGame() {
    randomNumber = generateRandomNumber(); // Generate a new random number for the new game
    resultDisplay.textContent = ''; // Clear the result display
    guessInput.value = ''; // Clear the input field
    document.getElementById('instruction').textContent = 'Guess a number between 1 and 100:'; // Reset the instruction
    let attemptsLine = document.getElementById('attempts-line');
    if (attemptsLine) {
        attemptsLine.remove(); // Remove the line indicating the number of guesses
    }
    guessAttempts = 0; // Reset guess attempts
}

document.addEventListener('DOMContentLoaded', function() {
    // Get the logo element
    var logo = document.getElementById('logo');

    // Add a click event listener to the logo
    logo.addEventListener('click', function(event) {
        // Prevent the default behavior of following the link
        event.preventDefault();

        // Log a message to the console to check if the event listener is triggered
        console.log("Logo clicked!");

        // Refresh the current page
        location.reload();
    });
});
