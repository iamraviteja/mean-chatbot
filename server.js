var express = require("express");
var path = require("path")
var bodyParser = require("body-parser");
var request = require('request')
var mongoose = require('mongoose');
var router = express.Router({mergeParams:true});

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017');
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

// response error handler 
var resErrorHandler = function(error, response, body){
    if(error){
        console.log("Sending Error: ", error);
    }else if(response.body.error){
        console.log("Response Body Error:", response.body.error);
    }
};

var appIds = {};

var botAppSchema = mongoose.Schema({
    name:String,
    verify_token:String,
    access_token:String
});

var botAppModel = mongoose.model('botAppModel', botAppSchema);

router.post('/sendApp',function(req, res){
    var _res = res;
    botAppModel.create(req.query, function(err){
        if(err){
            _res.send(JSON.stringify({err:err}));
        }else{
            _res.send(JSON.stringify({req:req.query}));
        }
    })
    
});

router.param('appid',function(req, res, next){
    console.log(req.params['appid']);
    var appId = req.params['appid'];
    if(appIds[appId]){
        console.log('app id present');
        req.params['verify_token'] = appIds[appId].verify_token;
        req.params['access_token'] = appIds[appId].access_token;
        next();
    }else{
        botAppModel.findOne({'name':appId}, function(err, botAppModel){
            if(err) console.log(err);
            console.log(botAppModel);
            if(botAppModel){
                req.params['verify_token'] = botAppModel.verify_token; 
                req.params['access_token'] = botAppModel.access_token;
                appIds[botAppModel.name] = botAppModel;
            } 
            next();
        });
    }
    
    // if(req.params['appid'] && req.params['appid'] == "FirstApp"){
    //     req.params['verify_token'] = "sample_token";
    // }else{
    //     console.log('failed....');
    //     req.params['verify_token'] = "dummy";
    // }
});

router.get('/:appid/webhook/',function(req, res){
    console.log(req.params);
    console.log(req.params['appid'] +" ***** "+ req.params['verify_token']);
    if(req.query["hub.verify_token"] === req.params['verify_token']){
        console.log("webhook verification success !!");
        res.status(200).send(req.query["hub.challenge"]);
    }else{
        console.log("webhook verification failed !!");
        res.sendStatus(403);
    }
});

router.post('/:appid/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    console.log("::: ::: ",req);
    for (let i = 0; i < messaging_events.length; i++) {
	    let event = req.body.entry[0].messaging[i]
	    let sender = event.sender.id
	    if (event.message && event.message.text) {
		    let text = event.message.text
		    sendTextMessage(req.params['access_token'], sender, "Text received, echo: " + text.substring(0, 200))
	    }
    }
    res.sendStatus(200)
})

function sendTextMessage(token, sender, text) {
    let messageData = { text:text }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

app.use('/fbroute', router);
