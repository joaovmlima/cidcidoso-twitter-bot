const Twitter = require('twitter-lite')
const db = require('../db')

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

async function tweetMessage(message, replyTo) {
  try {
    await client.post('statuses/update', {
      status: `${message}`,
      in_reply_to_status_id: `${replyTo}`
    })
  } catch (error) {
    console.log(error)
  }
}

async function getKeywordTweet(keyword) {
  try {
    let data = await client.get('search/tweets', {
      q: `${keyword}`,
      count: 1
    })
    let id = data.statuses[0].id_str
    return id
  } catch (error) {
    console.log(error)
  }
}

async function retweetKeyword(id) {
  try {
    await client.post('statuses/retweet', {
      id: `${id}`
    })
  } catch (error) {
    console.log(error)
  }
}

async function getLastTweetFrom(screen_name) {
  try {
    let data = await client.get('statuses/user_timeline', {
      screen_name: screen_name,
      count: 1,
      include_rts: false,
      exclude_replies: true
    })
    let id = data[0].id_str
    return id
  } catch (error) {
    console.log(error)
  }
}

function addToHistory(tweetId) {
  db.query(`INSERT INTO public.history (tweetid) VALUES (${tweetId})`, (err, res) => {
    if (err) throw err
    console.log(res)
  })
}

async function searchHistory(tweetId) {
  let foundHistory = await db.query(`SELECT * FROM public.history WHERE tweetid = '${tweetId}'`)
    .then(res => res.rowCount)
  return foundHistory
}

module.exports = { tweetMessage, getKeywordTweet, retweetKeyword, getLastTweetFrom, addToHistory, searchHistory }
