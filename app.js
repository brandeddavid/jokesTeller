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

  handleMessage(data.text)
})

// Handles user message
handleMessage = message => {
  if(message.includes(' chuck')){
    chuckNorris()
  } else if (message.includes(' mama')){
    yoMama()
  }
}

chuckNorris = () => {
  console.log('Chuck Norris Joke')
}

yoMama = () => {
  console.log('Yo Mama Joke')
}
