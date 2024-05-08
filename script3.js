// script3.js
// JavaScript Code for the game
// Game Component constructor
function component(width, height, color, x, y, type) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }
}

// Game initialization function
function startGame() {
    var canvasWidth = myGameArea.canvas.width;
    var canvasHeight = myGameArea.canvas.height;

    // Set random starting position for the game piece
    var startX = Math.floor(Math.random() * (canvasWidth - 30)); // 30 is the width of the game piece
    var startY = Math.floor(Math.random() * (canvasHeight - 30)); // 30 is the height of the game piece

    myGamePiece = new component(30, 30, "green", startX, startY); // Use the random coordinates
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

// Game area object
var myGameArea = {
    canvas: document.getElementById("gameCanvas"),
    start: function() {
        // Get the width and height of the window
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        // Set the canvas width and height
        this.canvas.width = 500;
        this.canvas.height = 333;

        // Calculate the left and top position to center the canvas
        var left = (windowWidth - this.canvas.width) / 2;
        var top = (windowHeight - this.canvas.height) / 2;

        // Set the style of the canvas to position it
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = left + 'px';
        this.canvas.style.top = top + 'px';

        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Game update function
function updateGameArea() {
    myGameArea.clear();
    // Draw border lines
    myGameArea.context.strokeStyle = "black"; // Set the color of the border
    myGameArea.context.lineWidth = 5; // Set the width of the border
    myGameArea.context.strokeRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height); // Draw the border around the canvas
    // Check if the game piece is within the boundaries of the canvas
    if (myGamePiece.x <= 0 || myGamePiece.x >= myGameArea.canvas.width - myGamePiece.width || myGamePiece.y <= 0 || myGamePiece.y >= myGameArea.canvas.height - myGamePiece.height) {
        // If the game piece touches the border, stop the game
        clearInterval(myGameArea.interval);
        // Update high score
        updateHighScore();
        // Display high score
        myHighScore.text = "High Score: " + highScore;
        myHighScore.update();
        return;
    }
    // Update and render the game piece
    myGamePiece.newPos();
    myGamePiece.update();
    // Update the score
    updateScore();
}

// Function to move the game piece left
function moveLeft() {
    myGamePiece.speedX -= 3;
}

// Function to move the game piece right
function moveRight() {
    myGamePiece.speedX += 3;
}

// Function to move the game piece up
function moveUp() {
    myGamePiece.speedY -= 3;
}

// Function to move the game piece down
function moveDown() {
    myGamePiece.speedY += 3;
}

// Start the game when the page loads
startGame();

// Initialize high score variable
var highScore = 0;

// Initialize high score variable only if it's not already set
if (!localStorage.getItem('highScore')) {
    localStorage.setItem('highScore', '0');
}

// Retrieve high score from local storage
var highScore = parseInt(localStorage.getItem('highScore'));

// Update high score if the current score is higher
function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore); // Save high score to local storage
        document.getElementById('highScore').innerText = highScore; // Update high score display
    }
}

/// Function to reset the high score
function resetHighScore() {
    highScore = 0;
    localStorage.setItem('highScore', highScore); // Reset high score in local storage
    document.getElementById('highScore').innerText = highScore; // Update high score display
}

// Add event listener to the reset high score button
document.getElementById('resetHighScoreBtn').addEventListener('click', resetHighScore);

// Function to start a new game
function newGame() {
    // Clear the interval
    clearInterval(myGameArea.interval);
    // Reset score
    score = 0;
    // Start the game
    startGame();
    // Update high score display
    document.getElementById('highScore').innerText = highScore; // Update high score display
}

// Add event listener to the new game button
document.getElementById('newGameBtn').addEventListener('click', newGame);

// Global variables for score and high score
var score = 0;
var highScore = localStorage.getItem('highScore') || 0;

// Update the score in the game loop
function updateScore() {
    score++; // Increment score
    document.getElementById('score').innerText = score; // Update score display
}

// Update high score if the current score is higher
function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore); // Save high score to local storage
        document.getElementById('highScore').innerText = highScore; // Update high score display
    }
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

// Add event listeners for arrow key presses
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
});

// Function to display instructions
function showInstructions() {
    document.getElementById('instructions').style.display = 'block';
}

// Function to close instructions
function closeInstructions() {
    document.getElementById('instructions').style.display = 'none';
}
