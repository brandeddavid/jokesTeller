const slackBot = require('slackbots');
const axios = require('axios');

const bot = new slackBot({
  token: 'xoxb-587609893589-587260394564-fsG8M47qEMgonlFHKqgo1UxJ',
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
bot.on('error', error => console.log('=====>', error))

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
  const api = 'https://api.icndb.com/jokes/random'
  axios.get(api)
    .then(response => {
      const joke = `Chuck Norris: ${response.data.value.joke}`;
      sendJoke(joke);
    })
    .catch(error => console.log(error));
}

yoMama = () => {
  console.log('Yo Mama Joke')
}

sendJoke = joke => {
  const params = {
    icon_emoji: ':laughing:'
  }

  bot.postMessageToChannel('general', joke, params)
}
