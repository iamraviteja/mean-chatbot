var express = require("express");
var path = require("path")
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var router = express.Router({mergeParams:true});

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

function handleError(res, reason, message, code){
    console.log("Error: "+ reason);
    res.send(code || 500).json({"error":message});
}

// application routes
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'dist/index.html'), function(err){
        handleError(res, "could not find file", err.message);
    });
});

// sample testing of facebook app
// EAASq8a5TmXcBAHJeo4Ls0WVKJZCvwgp2FXY6ObqVxz10LQLzUNFxKhzI0lniB9ZAfPOdCpOiZAiMcUDmGZCZCXGg3aLRCGntZCAFLX0KXHZBToXRbov8izCgsrGaMOos708KNmrkmW9WtuOX7JWIO4krczKB5en9SosDZBrbIeLM4AZDZD
// chatbot response object
var token = "EAASq8a5TmXcBAHJeo4Ls0WVKJZCvwgp2FXY6ObqVxz10LQLzUNFxKhzI0lniB9ZAfPOdCpOiZAiMcUDmGZCZCXGg3aLRCGntZCAFLX0KXHZBToXRbov8izCgsrGaMOos708KNmrkmW9WtuOX7JWIO4krczKB5en9SosDZBrbIeLM4AZDZD";
var verify_token = "sample_token";

var resObj = {
    url:"https://graph.facebook.com/v2.6/me/messages",
    qs:{access_token: token},
    method: "POST"
};

// response error handler 
var resErrorHandler = function(error, response, body){
    if(error){
        console.log("Sending Error: ", error);
    }else if(response.body.error){
        console.log("Response Body Error:", response.body.error);
    }
};

var botAppSchema = mongoose.Schema({
    name:String,
    verify_token:String,
    access_token:String
});

var botAppModel = mongoose.model('botAppModel', botAppSchema);

router.post('/sendApp',function(req, res){
    console.log('post data; ',req.params);
    console.log('post body; ',req.body);
    res.json(req);
});

router.param('appid',function(req, res, next){
    console.log(req.params['appid']);
    // if(req.params['appid'] && req.params['appid'] == "FirstApp"){
    //     req.params['verify_token'] = "sample_token";
    // }else{
    //     console.log('failed....');
    //     req.params['verify_token'] = "dummy";
    // }
    next();
});

router.get('/:appid/webhook/',function(req, res){
    console.log(req.params);
    res.status(200).send('hey connected');
    // console.log(req.params['appid'] +" ***** "+ req.params['verify_token']);
    // if(req.query["hub.verify_token"] === req.params['verify_token']){
    //     console.log("webhook verification success !!");
    //     res.status(200).send(req.query["hub.challenge"]);
    // }else{
    //     console.log("webhook verification failed !!");
    //     res.sendStatus(403);
    // }
});

app.use('/fbroute', router);
