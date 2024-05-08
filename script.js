// script.js
// Function to hide the loading GIF
function hideLoadingGif() {
    document.querySelector('.center-text').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    // Get the animated monkey element
    var monkey = document.querySelector('.animated-monkey');

    // Hide the loading GIF before the monkey animation ends
    setTimeout(hideLoadingGif, 3100); 

    // Add an event listener to the monkey animation
    monkey.addEventListener('animationend', function() {
        monkey.classList.add('show-bubble');
    });

    // Get the logo element
    var logo = document.getElementById('logo');

    // Add a click event listener to the logo
    logo.addEventListener('click', function(event) {
        // Prevent the default behavior of following the link
        event.preventDefault();
        
        // Refresh the current page
        location.reload();
    });
});
