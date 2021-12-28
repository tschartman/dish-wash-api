const MongoDB  = require('../utils/mongo');
const db = MongoDB.getDB()
const discord = require('../utils/discord');
const dclient = discord.getDiscord();

const getItems = async (request, response, next) => {
    const status = db.db("dishwasherDB").collection('grocery').find().toArray((err, res) => {
        if (err) {
            console.log(err)
            response.send("Error")
        }
        response.send(res)
    })
}

const insertItem = async (request, response, next) => {
    const item = request.body.name;
    const updatedResult = await db.db("dishwasherDB").collection('grocery').insertOne({name: item})
    const channel = dclient.channels.cache.find(channel => channel.name === "general")
    channel.send(`${item} has been added to the grocery list`)
    response.send(updatedResult)
}

const deleteItem = async (request, response, next) => {
    const item = request.body.name;
    const updatedResult = await db.db("dishwasherDB").collection('grocery').deleteOne({name: item})
    const channel = dclient.channels.cache.find(channel => channel.name === "general")
    channel.send(`${item} has been removed from the grocery list`)
    response.send(updatedResult)
}

module.exports = {
    getItems,
    insertItem,
    deleteItem
}