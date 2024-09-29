const generateBtn = document.getElementById('generateBtn');
const inputText = document.getElementById('inputText');
const qrCodeContainer = document.getElementById('qrCode');
const qrImage = document.getElementById('qrImage');
const movingElements = document.querySelectorAll('.moving-element');

// Function to randomly position moving elements
function randomizePositions() {
  movingElements.forEach((element) => {
    const randomX = Math.random() * 100; // Random x position
    const randomY = Math.random() * 100; // Random y position
    element.style.left = `${randomX}vw`;
    element.style.top = `${randomY}vh`;
  });
}

// Call the function to set initial positions
randomizePositions();

generateBtn.addEventListener('click', generateQRCode);

// Move elements on click
movingElements.forEach((element) => {
  element.addEventListener('click', (event) => {
    event.stopPropagation();
    
    // Get random translate values for moving away
    const randomX = Math.random() * 100 + 100; // Random x offset
    const randomY = Math.random() * 100 + 100; // Random y offset
    
    // Move away and fade out
    element.style.transition = 'transform 0.5s, opacity 0.5s'; // Smooth transition
    element.style.transform = `translate(${randomX}px, ${randomY}px)`; // Move away
    element.style.opacity = '0'; // Fade out

    setTimeout(() => {
      element.style.display = 'none'; // Hide element after animation
    }, 500); // Match duration of animation
  });
});

function generateQRCode() {
  const inputValue = inputText.value.trim();

  if (inputValue !== '') {
    qrImage.style.display = 'none'; // Hide previous QR code image
    qrCodeContainer.innerHTML = ''; // Clear previous QR code
    const qrAPIUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(inputValue)}`;
    qrImage.src = qrAPIUrl;
    qrImage.style.display = 'block'; // Show new QR code image
    qrCodeContainer.appendChild(qrImage); // Append QR code back to the container
  }
}
