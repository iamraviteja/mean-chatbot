var express = require("express");
var path = require("path")
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  // Initialize the app.
  console.log('db connected')
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});



// application routes
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

