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
  /* 
   #swagger.description = "Deletes a contact from the database."
  */
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

