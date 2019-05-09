const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db');
const {ObjectID} = require('mongodb');
const {Marker} = require('./models/Marker');

var app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

app.get('/', (req, res) => {
    console.log("Hello world");
    
});

app.post('/Marker', (req, res) => {
    var marker = new Marker({
        name: req.body.name,
        description: req.body.Description,
        events: req.body.events,
        right: req.body.right,
        left: req.body.left
    });
    marker.save().then((doc) => {
        console.log(doc);
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/Marker/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Marker.findOne({_id: id}).then((marker) => {
        if (!marker) {
            return res.status(404).send();
        }

        res.send(marker);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.get('/Marker', (req, res) => {
    Marker.find({}).then((markers) => {
        res.send(markers);
    }).catch((e) => {
        res.status(400).send();
    })
});

app.listen(3000, () => {
    console.log('Start listen on Port 3000');
})