let words = [];
let currentIndex = 0;
let flipped = false;

fetch('words.csv')
  .then(response => response.text())
  .then(data => {
    const lines = data.trim().split('\n').slice(1); // Skip header
    words = lines.map(line => {
      const [english, tewa] = line.split(',');
      return { english, tewa };
    });
    showCard();
  });

function showCard() {
  const card = words[currentIndex];
  document.getElementById('front').textContent = card.english;
  document.getElementById('back').textContent = card.tewa;
  document.getElementById('front').classList.remove('d-none');
  document.getElementById('back').classList.add('d-none');
  flipped = false;
}

function flipCard() {
  flipped = !flipped;

  const front = document.getElementById('front');
  const back = document.getElementById('back');

  if (flipped) {
    front.classList.add('d-none');
    back.classList.remove('d-none');
  } else {
    front.classList.remove('d-none');
    back.classList.add('d-none');
  }
}

function nextCard() {
  currentIndex = (currentIndex + 1) % words.length;
  showCard();
}

function prevCard() {
  currentIndex = (currentIndex - 1 + words.length) % words.length;
  showCard();
}
