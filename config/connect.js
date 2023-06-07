require('dotenv').config();
const {MongoClient} = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const mongoose = require('mongoose')

let _db;

const connect = (callback) => {
    if(_db) { // if _db already exists, that means it is already connect. If connected, will return current connection (callback)
        console.log("Db is already connected");
        return callback(null, _db);
    }
    // Connect to database, return error 
    MongoClient.connect(uri)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getConnection = () => {
    if(!_db){
        throw Error("Db has not been connected yet!");
    }
    return _db;
}

const mongooseConnect = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Mongoose connected')
    } catch(err){
        console.error(err);
        process.exit(1)
    }
}

module.exports = {
    connect,
    getConnection,
    mongooseConnect,
}


