const dotenv = require("dotenv");
dotenv.config();
const mongoClient = require("mongodb").MongoClient;

const url = process.env.MONGODB_URI;
let db;

// initialize db
const initDB = (callback) => {
  if (db) {
    console.log("Database is already initialized.");
    return callback(null, db);
  }
  mongoClient.connect(url)
      .then((client) => {
        db = client;
        callback(null, db);
      }).catch((err) => {
      callback(err, null);
    });
};

// get db
const getDB = (dbName) => {
  if(!db) {
    console.log("Database is not initialized.");
    return null;
  }
  return db.db(dbName);
};
module.exports = { initDB, getDB };

