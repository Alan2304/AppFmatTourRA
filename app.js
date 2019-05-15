const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db');
const { ObjectID } = require('mongodb');
const { Marker } = require('./models/Marker');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
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

    Marker.findOne({ _id: id }).then((marker) => {
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

app.put('/Marker/:id', async (req, res) => {
    var id = req.params.id;
    var body = req.body;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    let marker = await Marker.findOne({ _id: id });

    if (marker) {
        marker.name = body.name;
        marker.description = body.description;
        marker.events = body.events;
        marker.right = body.right;
        marker.left = body.left;
        marker.save().then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(400).send()
        })
    } else {
        res.status(404).send();
    }
});

app.listen(port, () => {
    console.log('Start listen on Port 3000');
})