const { ObjectId, getDB } = require("./../config/db.js");

// GET
const getAllContacts = async (req, res, next) => {
/* 
  #swagger.description = "Gets all contacts from the database."
  #swagger.produces = ["application/json"]
*/
  const contacts = await getDB("contactsDB").collection("contacts").find({}).toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(contacts));
  };

const getContact = async (req, res, next) => {
/* 
  #swagger.description = "Gets a contact from the database."
  #swagger.produces = ["application/json"]
*/
  const id = new ObjectId(req.params.id);
  const query = { _id: { $eq: id }};
  const contact = await getDB("contactsDB").collection("contacts").findOne(query);
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(contact));
};

// POST
const createContact = async (req, res, next) => {
 /* #swagger.description = "Creates a new contact and adds it to the database."
    #swagger.consumes = ["application/json"]
    #swagger.parameters["obj"] = {
      in: "body",
      required: true,
      schema: {
        $firstName: "john",
        $lastName: "doe",
        $email: "jdoe@email.com",
        $favoriteColor: "blue",
        $birthday: "12/25/2020"
      },
    }
  */
  const result = await getDB("contactsDB").collection("contacts").insertOne(req.body);
  if (!result.acknowledged) {
    res.status(404);
    res.send("Error creating document.");
  }
  else {
  res.status(201);
  res.send(`Document created successfully, id: ${result.insertedId.toString()}`);
  }
};

// DELETE
const deleteContact = async (req, res, next) => {
  /* 
   #swagger.description = "Deletes a contact from the database."
  */
 
  const id = new ObjectId(req.params.id);
  const result = await getDB("contactsDB").collection("contacts").deleteOne({ _id: id });
    if (result.deletedCount <= 0) {
    res.status(404);
    res.send("Error deleting document.");
  }
  else {
    res.status(200);
    res.send(`Document with ID: ${req.params.id} successfully deleted.`);
  }
};

// PUT
const updateContact = async (req, res, next) => {
   /* #swagger.description = "Updates a contact in the database."
    #swagger.consumes = ["application/json"]
    #swagger.parameters["obj"] = {
      in: "body",
      schema: {
        firstName: "jane",
        lastName: "doe",
        email: "jdoe@email.com",
        favoriteColor: "orange",
        birthday: "01/01/1010"
      },
    }
  */
  const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
  const result = await getDB("contactsDB").collection("contacts").updateOne({ _id: id }, contact);
    if (result.modifiedCount <= 0) {
      res.status(500);
      res.send("Error updating document.");
    }
    else {
      res.status(204);
      res.send(`Document with ID: ${req.params.id} successfully updated.`);
    }
};

module.exports = { getAllContacts, getContact, createContact, deleteContact, updateContact };

