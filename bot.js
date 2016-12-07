/*var botkit = require('botkit');

var controller = botkit.slackbot({
  debug: false,
  json_file_store: './simple_storage/'
}).configureSlackApp({
  clientId: process.env.BOTKIT_SLACK_CLIENT_ID,
  clientSecret: process.env.BOTKIT_SLACK_CLIENT_SECRET,
  scopes: ['commands']
});
*/
var botkit = require('botkit');

var controller = Botkit.slackbot({
    debug: false
});


controller.setupWebserver(3000, function(err, webserver) {
    controller.createWebhookEndpoints(webserver);
});

controller.on('/remindja', function(bot, message) {
    // check message.command
    // and maybe message.text...
    // use EITHER replyPrivate or replyPublic...
    bot.replyPrivate(message, 'This is a private reply to the ' + message.command + ' slash command!');

    // and then continue to use replyPublicDelayed or replyPrivateDelayed
    bot.replyPublicDelayed(message, 'This is a public reply to the ' + message.command + ' slash command!');

    bot.replyPrivateDelayed(message, ':dash:');

});