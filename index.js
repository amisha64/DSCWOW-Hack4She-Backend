const express = require('express')
const mongoose = require('mongoose')

const Reports = require('./dbModel')

//App Config
const app = express()
const port = process.env.PORT || 9000

//Middlewares
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
})

//DB Config

mongoose.connect('mongodb+srv://hack4she:5X4fcfCqsXTcg0x1@cluster0.5rxty.mongodb.net/reports?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection.once('open', () => console.log('DB Connected'))

//api routes --- POSTMAN
app.get('/', (req, res) => res.status(200).send('hello world'))

app.get('/getreports', (req, res) => {
    Reports.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/reports', (req, res) => {
    const dbReport = req.body

    Reports.create(dbReport, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})


//listen
app.listen(port, () => console.log(`listening on localhost: ${port}`))