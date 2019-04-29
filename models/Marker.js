var mongoose = require('mongoose');

var MarkerSchema = new mongoose.Schema({
    name: String,
    description: String,
    events: [
        {
            name: String,
            description: String,
            date: Date
        }
    ],
    right: String,
    left: String
});

var Marker = mongoose.model('Marker', MarkerSchema);

module.exports = {
    Marker
}