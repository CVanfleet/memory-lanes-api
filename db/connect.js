require('dotenv').config();
const {MongoClient} = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

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

module.exports = {
    connect,
    getConnection,
}