var botkit = require('botkit');

var controller = botkit.slackbot({
  debug: false,
  json_file_store: './simple_storage/'
}).configureSlackApp({
  clientId: process.env.BOTKIT_SLACK_CLIENT_ID,
  clientSecret: process.env.BOTKIT_SLACK_CLIENT_SECRET,
  scopes: ['commands']
});

controller.setupWebserver(process.env.PORT, function(err, webserver) {
  controller.createWebhookEndpoints(controller.webserver);
  controller.createOauthEndpoints(controller.webserver, function(err, req, res) {
    if (err) {
      res.status(500).send('Error: ' + JSON.stringify(err));
    } else {
      res.send('Success');
    }
  });
});

controller.on('slash_command', function(bot, message) {
  switch (message.command) {
  case '/remind-ja':
    var reminds = message.text.split(',');
    var when = reminds[2];
    switch(when){
      case '明日':
        reminds[2] = "tomorrow";
        break;
    }
    bot.replyPrivate(message,"/remind" + reminds + "");
    break;
  }
});
