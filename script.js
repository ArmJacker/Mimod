// Hide cards without titles
function hideCardsWithoutName() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.trim();
    if (!title || title.length === 0) {
      card.style.display = 'none';  // Hide cards without titles
    } else {
      card.style.display = 'block';  // Show cards with titles
    }
  });
}

// File download function
function downloadFile(cardElement) {
  const filePath = cardElement.getAttribute("data-file");

  if (filePath && filePath.trim() !== "" && (filePath.endsWith('.apk') || filePath.endsWith('.zip'))) {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = filePath.split('/').pop();
    link.click();
  } else {
    console.error("No valid file found to download.");
    alert("Invalid file. Please try again.");
  }
}

// Search function
function searchFunction() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  let found = false;

  if (!searchTerm.trim()) {
    // If the search is empty, show all cards with valid titles
    hideCardsWithoutName();
    document.getElementById('error-message').style.display = 'none';
    return;
  }

  cards.forEach(card => {
    const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();

    if (cardTitle.includes(searchTerm)) {
      card.style.display = 'block';
      found = true;
    } else {
      card.style.display = 'none';
    }
  });

  // Show error message if no matching cards are found
  document.getElementById('error-message').style.display = found ? 'none' : 'block';
}

// Send message function with file attachment (via mailto link)
function sendMessage() {
  const message = document.getElementById('messageInput').value;
  const fileInput = document.getElementById('file');
  const file = fileInput.files[0];

  if (message.trim() === "") {
    alert("Please enter a message.");
    return;
  }

  let emailBody = `Message: ${message}\n\n`;
  if (file) {
    emailBody += `File: ${file.name}\n`;
  }

  const emailSubject = "Message from Your Website";
  const mailtoLink = `mailto:tabakuaurel68@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  window.location.href = mailtoLink;
}

// Initialize card visibility when the page loads
window.onload = hideCardsWithoutName;

// Resize detection for responsive layout
let resizeTimer;
function detectResolution() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const message = `Your screen resolution is ${width}x${height}`;

  console.log(message);

  if (width <= 768) {
    document.body.classList.add('small-screen');
    document.body.classList.remove('large-screen');
  } else {
    document.body.classList.add('large-screen');
    document.body.classList.remove('small-screen');
  }
}

// Event listener to detect resolution changes on resize
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(detectResolution, 200);  // Delay detection to prevent too many calls during resizing
});

// Initialize screen resolution on page load
window.addEventListener('load', detectResolution);

// Event listener for search input field to update search dynamically
document.getElementById('search').addEventListener('input', searchFunction);
