var mongoose = require('mongoose');
//Conection to local host
mongoose.connect('mongodb://localhost:27017/myApp', {useNewUrlParser: true});

module.exports = {
    mongoose
}
