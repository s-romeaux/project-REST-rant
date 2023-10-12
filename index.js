require('dotenv').config()
const express = require('express')
const app = express()

app.use('/places', require('./controllers/places'))

app.get('/', (res, req) => {
    res.setEncoding('Hey Worlly')
})

app.get('*', (req, res) => {
    res.status(404)send('<h1>404 Page</h1>')
})

app.listener(process.env.PORT)
