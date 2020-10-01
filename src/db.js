const { Client } = require('pg')

const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:foodfy@192.168.0.42:5050/cidcidoso-twitter-bot',
    ssl: false
})

client.connect()

client.query('SELECT * FROM history', (err, res) => {
    if (err) throw err
})

module.exports = client