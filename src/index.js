require('dotenv/config')
const express = require('express')
const twitter = require('./utils/twitter')
const getRandomMessage = require('./messages')

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

let screen_name = 'CidBacanoso' //Twitter @ (username) of the account you want to reply to

app.post('/trigger', async (req, res) => {
  try {
    const { secret } = req.body
    //denies the request if the token isn't right
    if (secret != process.env.ACCESS_TOKEN_SECRET) return res.status(401).end()

    let id = await twitter.getLastTweetFrom(screen_name)

    //searches in the DB if the tweet has already been replied
    let foundTweet = await twitter.searchHistory(id)

    if (foundTweet === 0) {
      await twitter.tweetMessage(`@${screen_name} ${getRandomMessage()}`, id)
      twitter.addToHistory(id)
      res.status(204).end()
    }
    else {
      res.status(406).send('tweet already replied!')
    }

  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

