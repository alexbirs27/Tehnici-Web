const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(express.static(path.join(__dirname, 'public')));

let users = [];
fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading users.json:", err);
        return;
    }
    try {
        users = JSON.parse(data);
        console.log("Loaded users:", users);
    } catch (parseError) {
        console.error("Error parsing users.json:", parseError);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pagina.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt with username:", username);
    const user = users.find(u => u.username === username);

    if (user && user.password === password) {
        req.session.user = user;
        return res.redirect('/register.html');  
    } else {
        console.log("Invalid username or password for username:", username);
    }
    res.send('Invalid username or password');
});

app.get('/register.html', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'register.html'));
    } else {
        res.redirect('/login');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
