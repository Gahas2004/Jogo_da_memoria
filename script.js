// script.js
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const size = parseInt(params.get('size'));
    const gameBoard = document.getElementById('game-board');
    
    initializeGame(size);

    function initializeGame(size) {
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${size}, 100px)`;
        const totalCards = size * size;
        const cardValues = createCardValues(totalCards);
        const shuffledValues = shuffleArray(cardValues);
        let flippedCards = [];
        let matchedPairs = 0;

        shuffledValues.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.width = `${400 / size}px`; 
            card.style.height = `${400 / size}px`;
            card.innerHTML = `<div class="card-content">${value}</div>`;
            card.addEventListener('click', () => flipCard(card, value));
            gameBoard.appendChild(card);
        });

        function flipCard(card, value) {
            if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
                card.classList.add('flipped');
                flippedCards.push({ card, value });

                if (flippedCards.length === 2) {
                    checkForMatch();
                }
            }
        }

        function checkForMatch() {
            const [firstCard, secondCard] = flippedCards;

            if (firstCard.value === secondCard.value) {
                matchedPairs++;
                flippedCards = [];
                if (matchedPairs === totalCards / 2) {
                    setTimeout(() => {
                        alert('Você ganhou! Retornando à página inicial...');
                        window.location.href = 'index.html';
                    }, 500);
                }
            } else {
                setTimeout(() => {
                    firstCard.card.classList.remove('flipped');
                    secondCard.card.classList.remove('flipped');
                    flippedCards = [];
                }, 1000);
            }
        }

        function createCardValues(total) {
            const values = [];
            for (let i = 0; i < total / 2; i++) {
                const value = String.fromCharCode(65 + i);
                values.push(value, value);
            }
            return values;
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    }
});