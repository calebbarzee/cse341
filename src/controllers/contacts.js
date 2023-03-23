const mongoDB = require("../config/db.js");
const ObjectId = require("mongodb").ObjectId;

const getAllContacts = async (req, res, next) => {
  const contacts = await mongoDB.getDB("contactsDB").collection("contacts").find({}).toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(contacts));
  };

const getContact = async (req, res, next) => {
  const id = new ObjectId(req.params.id);
  const query = { _id: { $eq: id }};
  const contact = await mongoDB.getDB("contactsDB").collection("contacts").findOne(query);
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(contact));
};

module.exports = { getAllContacts, getContact };

