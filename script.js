function hideCardsWithoutName() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.trim();
    if (!title || title.length === 0) {
      card.style.display = 'none'; 
    } else {
      card.style.display = 'block';
    }
  });
}

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

function searchFunction() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  let found = false;

  if (!searchTerm.trim()) {
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
  document.getElementById('error-message').style.display = found ? 'none' : 'block';
}

document.getElementById('search').addEventListener('input', searchFunction);


window.onload = hideCardsWithoutName;

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

window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(detectResolution, 200); 
});

window.addEventListener('load', detectResolution);

document.getElementById('search').addEventListener('input', searchFunction);
