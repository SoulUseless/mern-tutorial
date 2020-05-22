const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//triggers on all incoming requests
//if url specified on use(), refers to itself and child urls
app.use(bodyParser.urlencoded({extended: false})); //next is automatically called

//triggers on incoming POST requests with that exact url
app.post('/user', (req, res, next) => {
    res.send(`<h1> hello ${req.body.username} </h1>`);
})

//triggers on incoming GET requests
app.get('/', (req, res, next) => {
    res.send('<form action="/user" method="POST"><input type="text" name="username" /> <button type="submit"> submit</button> </form>')
});

app.listen(5000);