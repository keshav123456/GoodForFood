var http = require("http");
var url = require("url");
var fs = require('fs');
const express = require('express');
const app = express();
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var d3 = require("d3");
var data = "";
var sortedbyname = "";
var docs = ""

// Connection URL - please set up mongodb on your local server 

var urldb = 'mongodb://localhost:27017/goodforfood';
app.set('view engine', 'ejs');

// ------------------------- end of defining basic stuff ------------------- 
// NOTES
// this is divided into two servers - one running at 8080 to take in data 
// and one running on 3000 to display data
// mongodb is used to store data, d3.js to manipulate/display data, ability to handle multiple restaurants is neccessary




app.listen(3000, function() {
  console.log('listening on 3000')
});


//find and display data by restaurant name  

app.get('/rest/:id', function(req, res) {

//connecting to db
MongoClient.connect(urldb, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
//calling find function
	findDocumentsxyz(db, req.params.id, function() {
	db.close();
	});

});
//passing data to views
	res.render('index', { 'title':'Dashboard: Food for Thought', 'namedata' : docs });

});

//------------------find documents functions ----------------------------//



var findDocumentsxyz = function(db, id, callback) {
  // Get the documents collection
  var collectionxyz = db.collection('documents');
  // Find some documents
  collectionxyz.find({'Restaurant': id }).toArray(function(err, docsxyz) {
    assert.equal(err, null);
    console.log("Found the following records");
    docs = docsxyz;
    callback(docsxyz);
  });      
}




//                            end of front end server 
//---------------------------------------------------------------------------------////
//                                 start of recieving server  - to take in data 
// example query - 8080/?Restaurant=(name)&name=(item)&weight=(weight)&service=(service)


http.createServer(function(request,response){


response.writeHead(200,{'Content-Type':'text/plain'});
var querystring = url.parse(request.url,true).query;
var tempstring = JSON.stringify(querystring);


console.log(tempstring);
console.log(tempstring.length);
if (tempstring.length >2) {
	

// function to insert documents     
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    querystring 
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted document into the collection");
    callback(result);
  });
}

// writing it into the mongodb 
MongoClient.connect(urldb, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
insertDocuments(db, function() {
	db.close();
	});
});

			}

response.end(JSON.stringify(querystring));

}).listen('8080');

console.log('Server running on port 8080');