const express = require('express')
const MongoDB  = require('./src/api/utils/mongo')
const discord = require('./src/api/utils/discord')
require('dotenv').config()
const bodyParser= require('body-parser') 
const app = express()  
const cors = require('cors')
app.use(express.json())
app.use(cors())


MongoDB.connectDB(async (err) => {
    const router = require('./src/api/routes')

    if (err) {
        console.log(err)
    }

    discord.login()

    app.use(router)

    app.listen(process.env.PORT || 3000, function() {
        console.log('listening on 3000')
    })

});



