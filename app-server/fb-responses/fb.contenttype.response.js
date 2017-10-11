// CONTENT TYPE RESPONSE

var textResponse = function(_msg){
    return {
        text:_msg
    };
};

var imageRespose = function(_url, _isReusable){
    if(!_isReusable) _isReusable = false;
    return {
        attachment:{
            type:"image",
            payload:{
                url:_url,
                is_reusable:_isReusable
            }
        }
    };
};

// export the response functions
module.exports = {
    "CONTENT_TYPE_TEXT":textResponse,
    "CONTENT_TYPE_IMAGE":imageRespose
}