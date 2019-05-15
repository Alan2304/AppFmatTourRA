var mongoose = require('mongoose');
//Conection to local host
mongoose.connect('mongodb+srv://alan:Chocolate12@cluster0-f7bux.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});
//mongoose.connect('mongodb://localhost:27017/myApp', {useNewUrlParser: true});

module.exports = {
    mongoose
}
