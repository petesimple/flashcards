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
  document.getElementById('flashcard').classList.remove('flipped');
  flipped = false;
}

function flipCard() {
  flipped = !flipped;
  const flashcard = document.getElementById('flashcard');
  flashcard.classList.toggle('flipped', flipped);
}

function nextCard() {
  currentIndex = (currentIndex + 1) % words.length;
  showCard();
}

function prevCard() {
  currentIndex = (currentIndex - 1 + words.length) % words.length;
  showCard();
}
