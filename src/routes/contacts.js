const router = require("express").Router();
const contacts_controller = require("../controllers/contacts.js");

router.get("", contacts_controller.getAllContacts);
router.get("/:id", contacts_controller.getContact);
router.post("/new", contacts_controller.createContact);
router.delete("/:id", contacts_controller.deleteContact);
router.put("/:id", contacts_controller.updateContact);

module.exports = router;