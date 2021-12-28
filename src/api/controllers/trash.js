const MongoDB  = require('../utils/mongo');
const db = MongoDB.getDB()
const discord = require('../utils/discord');
const dclient = discord.getDiscord();

const getCollectors = async (request, response, next) => {
    const status = await db.db("dishwasherDB").collection('trash').findOne({name: "collectors"})
    response.send(status)
}

const getCollector = async (request, response, next) => {
    const status = await db.db("dishwasherDB").collection('trash').findOne({name: "collector"})
    response.send(status)
}

const getCount = async (request, response, next) => {
    const status = await db.db("dishwasherDB").collection('trash').findOne({name: "count"})
    response.send(status)
}

const notifyCollector = async (request, response, next) => {
    const {collectors} = await db.db("dishwasherDB").collection('trash').findOne({name: "collectors"})
    const {collector} = await db.db("dishwasherDB").collection('trash').findOne({name: "collector"})
    const channel = dclient.channels.cache.find(channel => channel.name === "general")
    channel.send(`${collectors[collector]}, you have been notified to take out the trash sir`)
    response.status(200).send("Success")
}

const updateCollector = async (request, response, next) => {
    const newCollector = request.body.collector;
    const completed = request.body.completed;
    if (completed) {
        const {collectors} = await db.db("dishwasherDB").collection('trash').findOne({name: "collectors"})
        const {collector} = await db.db("dishwasherDB").collection('trash').findOne({name: "collector"})
        const updatedResult1 = await db.db("dishwasherDB").collection('trash').updateOne({"count.key": collector}, { $inc: { 'count.$.count' : 1 }})
        const nextCollector = (collector + 1) % 4
        const channel = dclient.channels.cache.find(channel => channel.name === "general")
        channel.send(`${collectors[collector]} has taken out the trash ${collectors[nextCollector]} it is your turn to take the trash`)
    }
    const updatedResult = await db.db("dishwasherDB").collection('trash').updateOne({name: "collector"}, { $set: {collector: newCollector}})
    response.send(updatedResult)
}

module.exports = {
    getCollectors,
    getCollector,
    getCount,
    updateCollector,
    notifyCollector
}