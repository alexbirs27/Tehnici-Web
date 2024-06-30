document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const errorMessage = document.getElementById('error-message');

    const regex = /^[A-Z]{2}\d{4}$/;

    if (!regex.test(username)) {
        errorMessage.textContent = 'Numele de utilizator trebuie să conțină 2 litere mari și 4 cifre.';
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';

        const players = JSON.parse(localStorage.getItem('players')) || [];
        const userExists = players.some(player => player.username === username);

        if (userExists) {
            errorMessage.textContent = 'Numele de utilizator este deja folosit.';
            errorMessage.style.display = 'block';
        } else {
            const newUser = { username: username, score: 0 };
            players.push(newUser);
            localStorage.setItem('players', JSON.stringify(players));
            localStorage.setItem('currentUser', username);
            window.location.href = 'memory-game.html';
        }
    }
});
