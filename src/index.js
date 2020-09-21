require('dotenv/config')
const express = require('express')
const twitter = require('./utils/twitter')
const getRandomMessage = require('./messages')

const app = express()

app.use(express.json())

let screen_name = 'naosalvo' //Twitter @ (username) of the account you want to reply to
let lastId = 0

app.post('/trigger', async (req, res) => {
  try {
    const { secret } = req.body

    if (secret != process.env.ACCESS_TOKEN_SECRET) return res.status(401).end()

    let id = await twitter.getLastTweetFrom(`${screen_name}`)

    if (lastId === id) return res.status(406).send("Tweet already replied").end()

    await twitter.tweetMessage(`@${screen_name} ${getRandomMessage()}`, id)
    lastId = id
    res.status(204).end()

  } catch (error) {
    res.status(500).send(error.message)
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
