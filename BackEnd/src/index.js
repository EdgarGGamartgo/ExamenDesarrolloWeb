const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
console.log("Test")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})