// TEMPLATE RESPONSE TYPES

var buttonTypes  = require('./fb.buttons.response.js');

var formTemplateButtons = function(_buttonArray){
    var _returnArray = [];

    _buttonArray.forEach(function(item, index){
        _returnArray.push(buttonTypes[item.buttonType](item.title, item.payload));
    });

    return _returnArray;
}

var buttonTemplate = function(_text, _buttonArray){
    var _buttons = formTemplateButtons(_buttonArray);
    return {
        attachment:{
            type:"template",
            payload:{
                template_type:"button",
                text:_text,
                buttons:_buttons
            }
        }
    };
};

var genericTemplate = function(_item, _defaultAction, _buttonArray){
    var _buttons = formTemplateButtons(_buttonArray);
    return {
        attachment:{
            type:"template",
            payload:{
                template_type:"generic",
                elements:[
                    {
                        title:_item.title,
                        image_url:_item.image_url,
                        subtitle:_item.subtitle,
                        default_action:_defaultAction,
                        buttons:_buttons
                    }
                ]
            }
        }
    };
};

var listTemplate = function(_item, _globalButton){
    var _elements = [], _element;

    _item.elements.forEach(function(value, index){
        _element = {
            title:value.title,
            subtitle:value.subtitle
        };

        if(value.image_url) _element.image_url = value.image_url;

        if(value.default_action) _element.default_action = value.default_action;

        if(value.buttons) _element.buttons = formTemplateButtons(value.buttons);

        _elements.push(_element);
    });

    var _listTemplate = {
        attachment:{
            type:"template",
            payload:{
                template_type:"list",
                top_element_style:_item.top_element_style,
                elements:_elements
            }
        }
    };

    if(_globalButton && _globalButton.payload){
        _listTemplate.payload.buttons = [
            buttonTypes.POSTBACK_BUTTON(_globalButton.title, _globalButton.payload)
        ];
    }

    return _listTemplate;
};

module.exports = {
    "BUTTON_TEMPLATE":buttonTemplate,
    "GENERIC_TEMPLATE":genericTemplate,
    "LIST_TEMPLATE":listTemplate
}