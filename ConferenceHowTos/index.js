'use strict';

var Alexa = require('alexa-sdk');
var APP_ID = undefined; //OPTIONAL: replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';
var SKILL_NAME = 'Conference Helper';
var recipes = require('./recipes');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.attributes['speechOutput'] = 'Welcome to ' + SKILL_NAME + '. You can ask a question like, what is an elevator pitch?,' +
            ' or, what does business attire mean? ... Now, what can I help you with?';
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes['repromptSpeech'] = 'For instructions on what you can say, please say help me.';
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'RecipeIntent': function () {
        var itemSlot = this.event.request.intent.slots.Item;
        var itemName;
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }

        var cardTitle = SKILL_NAME + ' - Advice on ' + itemName;
        var recipe = recipes[itemName];

        if (recipe) {
			// Modified version to prompt user to ask for another tip or to say end to finish the session
			this.attributes['speechOutput'] = recipe;
            var speechOutput = recipe + ' If you want another conference tip you can ask a question like,' +
            ' what is an elevator pitch?, or, you can say end.';
            this.attributes['repromptSpeech'] = 'Try saying repeat.';
            this.emit(':askWithCard', speechOutput, this.attributes['repromptSpeech'], cardTitle, recipe);

        } else {
            var speechOutput = 'I\'m sorry, I currently do not know ';
            var repromptSpeech = 'What else can I help with?';
            if (itemName) {
                speechOutput += 'advice on ' + itemName + '. '; //the recipe for
            } else {
                speechOutput += 'that term. '; //that recipe
            }
            speechOutput += repromptSpeech;

            this.attributes['speechOutput'] = speechOutput;
            this.attributes['repromptSpeech'] = repromptSpeech;

            this.emit(':ask', speechOutput, repromptSpeech);
        }
    },
    'AMAZON.HelpIntent': function () {
        this.attributes['speechOutput'] = 'You can ask specific questions such as, what are good tips on networking, or you can say end... ' + //what\'s the recipe
            'Now, what can I help you with?';
        this.attributes['repromptSpeech'] = 'You can say things like, what are good tips on networking, or you can say end...' + //what\'s the recipe
            ' Now, what can I help you with?';
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    // Changed to 'tell' so session ends after one repeat
    'AMAZON.RepeatIntent': function () {
        var speechOutput = this.attributes['speechOutput'] + ' Goodbye!';
        this.emit(':tell', speechOutput, this.attributes['repromptSpeech'])
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest':function () {
        this.emit(':tell', 'Goodbye!');
    }
};