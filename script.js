function downloadFile(cardElement) {
  const filePath = cardElement.getAttribute("data-file");

  if (filePath && filePath.trim() !== "") {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = filePath.split('/').pop();
    link.click();
  } else {
    console.error("No valid file found to download.");
  }
}

function searchFunction() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  let found = false;

  cards.forEach(card => {
    const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();

    if (cardTitle.includes(searchTerm)) {
      card.style.display = 'block';
      found = true;
    } else {
      card.style.display = 'none';
    }
  });

  if (!found) {
    document.getElementById('error-message').style.display = 'block';
  } else {
    document.getElementById('error-message').style.display = 'none';
  }
}

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

  window.location.href = `mailto:tabakuaurel68@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
}
