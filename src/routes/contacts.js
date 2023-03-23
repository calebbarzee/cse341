const router = require("express").Router();
const contacts_controller = require("../controllers/contacts.js");

router.get("", contacts_controller.getAllContacts);
router.get("/:id", contacts_controller.getContact);

module.exports = router;