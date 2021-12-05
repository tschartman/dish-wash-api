const { MongoClient } = require('mongodb');
require('dotenv').config()

const uri = `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}`;
let _db;

const connectDB = async (callback) => {
    try {
        MongoClient.connect(uri, (err, db) => {
            _db = db
            return callback(err)
        })
    } catch (e) {
        throw e
    }
}

const getDB = () => _db

const disconnectDB = () => _db.close()

module.exports = { connectDB, getDB, disconnectDB }