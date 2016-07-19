var restify = require('restify');
var builder = require('botbuilder');
var Nexmo = require('nexmo');

//Nexmo account setup
var nexmo = new Nexmo({ apiKey: "NEXMO_API_KEY", apiSecret: "NEXMO_API_SECRET" }, { debug: false });

function consolelog(err, messageResponse) {
    if (err) {
        console.log(err);
    } else {
        console.log(messageResponse);
    }
}
//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(8080, function() {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: "SKYPE_APP_ID",
    appPassword: "SKYPE_APP_PASSWORD"
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

var intents = new builder.IntentDialog();
bot.dialog('/', intents);

var sms_details = {};

intents.matches(/^sms/i, [
    function(session) {
        builder.Prompts.text(session, "hey, what do you want to send via sms?");
    },
    function(session, results, next) {
        var message = results.response;
        sms_details.message = message;
        session.send("Ok, got the message: %s", sms_details.message);
        next()
    },
    function(session) {
        builder.Prompts.text(session, "where to?");
    },
    function(session, results) {
        sms_details.receiver = results.response;
        session.send("Ok :) sending: '%s' to '%s'", sms_details.message, sms_details.receiver);
        nexmo.message.sendSms(sender, sms_details.receiver, sms_details.message, consolelog);
    }
]);