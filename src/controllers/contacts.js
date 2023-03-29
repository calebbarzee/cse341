const mongoDB = require("./../config/db.js");
const ObjectId = require("mongoDB").ObjectId;

// GET
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

// POST
const createContact = async (req, res, next) => {
  try {
    const contacts = await mongoDB.getDB("contactsDB").collection("contacts").insertOne(req.body, (err) => {
    !err ? res.status(201)
    .json({ message: "Document created successfully", docId: contacts.insertedId.toString() }) 
    : res.status(404)
    .json({ message: "Error creating document." });
    });
  } catch (error) {
    console.log(error);
  }
};

// DELETE
const deleteContact = async (req, res, next) => {
  try {
    const id = new ObjectId(req.params.id);
    await mongoDB.getDB("contactsDB").collection("contacts").deleteOne({ _id: id }, (err) => {
      !err ? res.status(200)
      .json({ message: `Document with ID: ${req.params.id} successfully deleted.` })
      : res.status(404)
      .json({ message: "Error deleting document." });
    });
  } catch (err) {
    console.log(err);
  }
};

// PUT
const updateContact = async (req, res, next) => {
  try {
    const id = new ObjectId(req.params.id);
    await mongoDB.getDB("contactsDB").collection("contacts").updateOne({ _id: id }, { $set: req.body }, (err) => {
        res.setHeader(`Content-Type`, `application/json`);
        !err ? res.status(204).send()
        : res.status(404)
        .json({ message: "Error updating document." });
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllContacts, getContact, createContact, deleteContact, updateContact };

