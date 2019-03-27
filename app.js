const slackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const bot = new slackBot({
  token: process.env.token,
  name: 'jokesBot',
});

// Bot Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:',
  }

  bot.postMessageToChannel('general', `Get ready for the fun with @jokesBot. Use the 'help' command to know what you can doqq`, params)
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
    chuckNorrisJoke();
  } else if (message.includes(' mama')){
    yoMamaJoke();
  } else if (message.includes(' random')){
    randomJoke();
  } else if (message.includes(' help')){
    getHelp();
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
      sendJoke(joke);
    }).catch(error => console.log(error));
}

randomJoke = () => {
  const choice = Math.floor(Math.random()*2 + 1)

  if (choice === 1){
    chuckNorrisJoke();
  } else if (choice === 2){
    yoMamaJoke();
  }
}

sendJoke = joke => {
  const params = {
    icon_emoji: ':laughing:'
  }

  bot.postMessageToChannel('general', joke, params)
}

// Improvement: random jokes, send to user instead of to a channel, help, tests

getHelp = () => {
  const params = {
    icon_emoji: ':question:'
  }
  helpMessage = `Please use the following commands 'chuck' for a Chuck Norris joke, 'mama' for a Yo Mama joke and, 'random' for a random joke`

  bot.postMessageToChannel('general', helpMessage, params)
}
