const dotenv = require("dotenv");
dotenv.config();
const { MongoClient, ObjectId } = require("mongodb");

const url = process.env.MONGODB_URI;
let db;

// initialize db
const initDB = (callback) => {
  if (db) {
    console.log("Database is already initialized.");
    return callback(null, db);
  }
  MongoClient.connect(url)
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
module.exports = { initDB, getDB, MongoClient, ObjectId };

