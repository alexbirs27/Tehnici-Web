document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { name: 'A', img: 'A' }, { name: 'A', img: 'A' },
        { name: 'B', img: 'B' }, { name: 'B', img: 'B' },
        { name: 'C', img: 'C' }, { name: 'C', img: 'C' },
        { name: 'D', img: 'D' }, { name: 'D', img: 'D' },
        { name: 'E', img: 'E' }, { name: 'E', img: 'E' },
        { name: 'F', img: 'F' }, { name: 'F', img: 'F' },
        { name: 'G', img: 'G' }, { name: 'G', img: 'G' },
        { name: 'H', img: 'H' }, { name: 'H', img: 'H' },
        { name: 'I', img: 'I' }, { name: 'I', img: 'I' },
        { name: 'J', img: 'J' }, { name: 'J', img: 'J' },
        { name: 'K', img: 'K' }, { name: 'K', img: 'K' },
        { name: 'L', img: 'L' }, { name: 'L', img: 'L' },
        { name: 'M', img: 'M' }, { name: 'M', img: 'M' },
        { name: 'N', img: 'N' }, { name: 'N', img: 'N' },
        { name: 'O', img: 'O' }, { name: 'O', img: 'O' },
        { name: 'P', img: 'P' }, { name: 'P', img: 'P' },
        { name: 'Q', img: 'Q' }, { name: 'Q', img: 'Q' },
        { name: 'R', img: 'R' }, { name: 'R', img: 'R' }
    ];

    cardsArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('#game-board');
    const timerDisplay = document.createElement('div');
    timerDisplay.setAttribute('id', 'timer');
    document.body.insertBefore(timerDisplay, grid);
    const nextLevelButton = document.createElement('button');
    nextLevelButton.textContent = 'Nivelul 3';
    nextLevelButton.setAttribute('id', 'next-level');
    nextLevelButton.style.display = 'none';
    // nextLevelButton.onclick = () => window.location.href = 'memory-game-level3.html';  // Uncomment this line if you create level 3
    document.body.appendChild(nextLevelButton);

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let timeLeft = 60;  // Setat la 60 de secunde
    let timerId;

    function createBoard() {
        cardsArray.forEach((_, i) => {
            const card = document.createElement('div');
            card.setAttribute('data-id', i);
            card.setAttribute('class', 'card');
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        });
        startTimer();
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        cardsChosen.push(cardsArray[cardId].name);
        cardsChosenId.push(cardId);
        this.classList.add('flipped');
        this.textContent = cardsArray[cardId].img;
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const [optionOneId, optionTwoId] = cardsChosenId;
        if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
            updateScore(1); // Adaugăm 1 punct la scor pentru fiecare pereche nimerită
        } else {
            cards[optionOneId].classList.remove('flipped');
            cards[optionOneId].textContent = '';
            cards[optionTwoId].classList.remove('flipped');
            cards[optionTwoId].textContent = '';
        }
        cardsChosen = [];
        cardsChosenId = [];
        if (cardsWon.length === cardsArray.length / 2) {
            clearInterval(timerId);
            nextLevelButton.style.display = 'block';
            alert('Felicitări! Ai găsit toate perechile!');
        }
    }

    function startTimer() {
        timerId = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Timp rămas: ${timeLeft} secunde`;
            if (timeLeft < 55) {
                const shakeIntensity = Math.min((55 - timeLeft) / 10, 1);  // Progresia mai abruptă
                document.documentElement.style.setProperty('--shake-x', `${shakeIntensity}px`);
                document.documentElement.style.setProperty('--shake-y', `${shakeIntensity}px`);
                document.body.classList.add('shake');
            }
            if (timeLeft === 0) {
                clearInterval(timerId);
                endGame();
            }
        }, 1000);
    }

    function updateScore(points) {
        const currentUser = localStorage.getItem('currentUser');
        let players = JSON.parse(localStorage.getItem('players'));
        let player = players.find(player => player.username === currentUser);
        player.score += points;
        localStorage.setItem('players', JSON.stringify(players));
        document.querySelector('h2').textContent = `Scorul tău: ${player.score}`;
    }

    function endGame() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.removeEventListener('click', flipCard);
        });
        document.body.classList.remove('shake');
        timerDisplay.textContent = 'Ai pierdut. Încearcă iar!';
    }

    createBoard();
});
