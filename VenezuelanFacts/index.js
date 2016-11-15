'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Venezuela Facts';

/**
 * Array containing space facts.
 */
var FACTS = [
    "Venezuela's name comes from the Italian word Veneziola, meaning little Venice. The explorer Amerigo Vespucci saw native stilt houses built in Lake Maracaibo and they reminded him of Venice.",
    "With over 298 billion barrels of proven reserves, Venezuela is recognized as the country with the highest volume of proven oil reserves in the world today. This is why gas is cheaper than water in Venezuela!",
    "The world's tallest waterfall, Angel Falls, is located in Venezuela. Angel Fall is nearly 20 times taller than Niagara Falls.",
    "The spectacular scenery in Pixar's animated movie 'Up' was inspired by real-life locations in Venezuela, such as Angel Falls.",
    "Venezuela is located on the northern coast of South America. It is bordered by Colombia on the west, Brazil on the south, Guyana on the east, and the islands of Trinidad and Tobago to the north-east.",
    "Arepas are a traditional Venezuelan type of food. An arepa is a corn bread, made most often with white corn, salt and water. Arepas can be eaten for breakfast, lunch or dinner.",
    "Venezuelan women are the most beautiful women in the world. Venezuelan beauty queens have won the Miss Universe title 7 times, Miss World 6 times, Miss International 6 times, and Miss Earth 2 times.",
    "Caracas, the capital of Venezuela, is considered the most dangerous city in the world. As of 2016, the murder rate was 119.87 murders per 100,000 inhabitants.",
    "Venezuela reached the world's highest inflation rate in 2015 with over 180 percent.",
    "Venezuela is a multicultural and multiethnic country made up by immigrants that came from Spain, Italy, Portugal, Germany, the Middle East and Africa. Venezuelans are also descendants of various indigenous groups.",
    "Baseball is Venezuela’s most popular sport and there has been a professional league since 1945. Many Venezuelan players have moved to the United States to play in the U.S. Major Leagues.",
    "Simon Bolivar was the militar who led Venezuela, Colombia, Ecuador, Peru and Bolivia to independence.",
    "Venezuela, Colombia and Ecuador share the same colors in their flags: yellow, blue and red."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your Venezuelan fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a Venezuelan fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};