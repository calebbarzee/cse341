const { ObjectId, getDB } = require("./../config/db.js");

// GET
const getAllContacts = async (req, res, next) => {
  const contacts = await getDB("contactsDB").collection("contacts").find({}).toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(contacts));
  };

const getContact = async (req, res, next) => {
  const id = new ObjectId(req.params.id);
  const query = { _id: { $eq: id }};
  const contact = await getDB("contactsDB").collection("contacts").findOne(query);
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(contact));
};

// POST
const createContact = async (req, res, next) => {
  const contacts = await getDB("contactsDB").collection("contacts").insertOne(req.body, (err) => {
  if (err) {
    res.status(404);
    res.send("Error creating document.");
  }
  else {
  res.status(201);
  res.send(`Document created successfully, id: ${contacts.insertedId.toString()}`);
  }
  });
};

// DELETE
const deleteContact = async (req, res, next) => {
  const id = new ObjectId(req.params.id);
  await getDB("contactsDB").collection("contacts").deleteOne({ _id: id }, (err) => {
    
    if (err) {
    res.status(404);
    res.send(`Document with ID: ${req.params.id} successfully deleted.`);
    }
    else
    res.status(200);
    res.send("Error deleting document.");
  });
};

// PUT
const updateContact = async (req, res, next) => {
  const id = new ObjectId(req.params.id);
  await getDB("contactsDB").collection("contacts").updateOne({ _id: id }, { $set: req.body }, (err) => {
      if (err) {
        res.status(404);
        res.send("Error updating document.");
      }
      else {
        res.status(204);
        res.send(`Document with ID: ${req.params.id} successfully updated.`);
      }
  });
};

module.exports = { getAllContacts, getContact, createContact, deleteContact, updateContact };

