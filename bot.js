var botkit = require('botkit');

var token = process.env.BOTKIT_SLACK_VERIFY_TOKEN;
var controller = botkit.slackbot({
  debug: false
}).configureSlackApp({
  clientId: process.env.BOTKIT_SLACK_CLIENT_ID,
  clientSecret: process.env.BOTKIT_SLACK_CLIENT_SECRET,
  scopes: ['commands']
  }
);
controller.setupWebserver(process.env.PORT,function(err,webserver){
  controller.createWebhookEndpoints(controller.webserver);
  controller.createOauthEndpoints(controller.webserver, function(err, req, res) {
    if (err) {
      res.status(500).send('Error: ' + JSON.stringify(err));
    } else {
      res.send('Success!');
    }
  });
});

controller.on('slash_command', function(bot, message) {
  if (message.token !== token) {
    return bot.res.send(401, 'Unauthorized');
  }
  switch (message.command) {
    case '/remindja':
      //var reminds = message.text.split(' ');
      //var when = reminds[2];
      bot.replyPrivate(message, message.text);
    break;
  }
});