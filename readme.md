## Description

Bot created as a fun little challenge I made for myself.

Also, I used it to learn more about API integrations and JS promises.

### What does it do?

The bot twitter account (@CidBacanoso) will automatically tweet a reply to **@naosalvo** (AKA **Cid**) containing one of the preset messages when he posts a new tweet.

(The messages and caracter of the bot are part of an inside joke with his followers)

### How does it work?

As for the time of creation, the bot is hosted on Heroku and a webhook is set to @naosalvo on Twitter via IFTTT.

When there's a new tweet from him, the IFTTT sends a GET method to the bot URL on Heroku, which then triggers the bot to get the new tweet ID and send a random message in the tweet replies.
