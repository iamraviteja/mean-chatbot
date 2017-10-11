// Buttons Response
// for postback button the _payload is STRING for other button types it will be OBJECT

var postbackButton = function(_title, _payload){
    return {
        type:"postback",
        title:_title,
        payload:_payload
    };
};


module.exports = {
    "POSTBACK_BUTTON":postbackButton
}