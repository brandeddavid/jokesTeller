const slackBot = require('slackbots');
const axios = require('axios');

const bot = new slackBot({
  token: 'xoxb-587609893589-587260394564-qdkYLGOAvV0ZYQrkiShYtIga',
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
    chuckNorrisJoke()
  } else if (message.includes(' mama')){
    yoMamaJoke()
  }
}

chuckNorrisJoke = () => {
  const api = 'https://api.icndb.com/jokes/random'
  axios.get(api)
    .then(response => {
      const joke = `Chuck Norris: ${response.data.value.joke}`;
      sendJoke(joke);
    })
    .catch(error => console.log(error));
}

yoMamaJoke = () => {
  const api = 'https://api.yomomma.info';
  axios.get(api)
    .then(response => {
      const joke = `Yo Mama: ${response.data.joke})`;
      sendJoke(joke)
    }).catch(error => console.log(error));
}

sendJoke = joke => {
  const params = {
    icon_emoji: ':laughing:'
  }

  bot.postMessageToChannel('general', joke, params)
}
