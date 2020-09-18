require('dotenv/config')
const express = require('express')
const twitter = require('./utils/twitter')
const getRandomMessage = require('./messages')

const app = express()

app.use(express.json())

app.post('/trigger', async (req, res) => {
  try {
    const { secret } = req.body

    if (secret != process.env.ACCESS_TOKEN_SECRET) return res.status(401).end()

    let id = await twitter.getNewTweetFrom('naosalvo')

    await twitter.tweetMessage(`@naosalvo ${getRandomMessage()}`, id)
    res.status(204).end()
  } catch (error) {
    res.status(500).send(error.message)
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
