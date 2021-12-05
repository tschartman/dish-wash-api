const MongoDB  = require('../utils/mongo');
const db = MongoDB.getDB()
const discord = require('../utils/discord');
const dclient = discord.getDiscord();

const getWasherStatus = async (request, response, next) => {
    const status = db.db("dishwasherDB").collection('dishwashers').find().toArray((err, res) => {
        if (err) {
            console.log(err)
            response.send("Error")
        }
        response.send(res)
    })
}

const updateWasherStatus = async (request, response, next) => {
    const clean = request.body.clean;
    const updatedResult = await db.db("dishwasherDB").collection('dishwashers').updateOne({}, { $set: {clean: clean}})
    const channel = dclient.channels.cache.find(channel => channel.name === "general")
    const status = clean ? 'Clean' : 'Dirty'
    channel.send(`Dishwasher is ${status}`)
    response.send(updatedResult)
}

module.exports = {
    getWasherStatus,
    updateWasherStatus
}