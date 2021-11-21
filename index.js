const express = require('express')
require('dotenv').config()
const bodyParser= require('body-parser') 
const app = express()  
const cors = require('cors')
app.use(express.json())
const { MongoClient } = require('mongodb');

app.use(cors())

const uri = `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    
    if (err) {
        console.log(err)
    }

    app.listen(process.env.PORT || 3000, function() {
        console.log('listening on 3000')
    })
    
    const db = client.db("dishwasherDB")

    app.get('/washer/status', function (request, response) {
        const status = db.collection('dishwashers').find().toArray((err, res) => {
            if (err) {
                console.log(err)
                response.send("Error")
            }
            response.send(res)
        })
    })
    
    app.post('/washer/update', async (req, res) => {
        const clean = req.body.clean;
        const updatedResult = await db.collection('dishwashers').updateOne({}, { $set: {clean: clean}})
        res.send(updatedResult)
    })
});



