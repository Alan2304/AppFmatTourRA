const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
//Connection URL
//const url = "mongodb+srv://sanchezalan95@gmail.com:Chocolate12_@cluster0-f7bux.mongodb.net/test?retryWrites=true";
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url, {useNewUrlParser: true});
const dbName = 'myApp';

client.connect((err) => {
    console.log("Connected succesfully to the database");
    const db = client.db(dbName);

    insertDocuments(db, function() {
        client.close();
      });
});

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }
