const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

var login = "fernando";
var password = "123";

//middleware
app.use(session({
    secret: 'token',
    resave: false,
    saveUninitialized: true
}));

//bodyParse
app.use(bodyParser.urlencoded({extended: true}));

//Requisição HTTP

//login
app.post('/', (req, res) => {

    if (req.body.password === password && req.body.login == login) {
        // Logado
        req.session.login = login;

        res.sendFile(path.join(__dirname, 'logado.html'));
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }

    
})

//PAGE PRINCIPAL
app.get('/', (req, res) => {
    //Ver se esta logado
    if (req.session.login) {
        res.sendFile(path.join(__dirname, 'logado.html'));
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
    
});

//Porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor está funcionando na porta ${PORT}`);
});
