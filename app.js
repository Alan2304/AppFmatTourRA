const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db');
const {Marker} = require('./models/Marker');

var app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log("Hello world");
    
});

app.post('/Marker', (req, res) => {
    
});

app.get('/Marker/:id', (req, res) => {

});

app.listen(3000, () => {
    console.log('Start listen on Port 3000');
})