const express = require('express')

const apiRouter = require('./routes/router')
const cors = require('cors')
const mongoose = require('mongoose')
const { badSessionMiddleware } = require('./middlewares/badSession')

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(badSessionMiddleware)
app.use('/api', apiRouter)

mongoose.connect("mongodb://localhost:27017/Project").then(() => {
    const listener = app.listen(8081, () => console.log(`Server online on port ${listener.address().port}.`))
}).catch(err => console.error(err))