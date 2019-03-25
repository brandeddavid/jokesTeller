const slackBot = require('slackbots');

const bot = new slackBot({
  token: 'xoxb-587609893589-587260394564-dmaPT4OrRHolIyoYER4c8IYP',
  name: 'jokesBot',
});

// Bot Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:',
  }

  bot.postMessageToChannel('general', 'Get ready for the fun with @jokesBot', params)
});

// Error handler
bot.on('error', error => console.log(error))

// Message Handler
bot.on('message', data => {
  if (data.type !== 'message'){
    return;
  }

  console.log(data);
})
