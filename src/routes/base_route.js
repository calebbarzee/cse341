const router = require("express").Router();
const base_controller = require("../controllers/base_controller.js");

router.get("/", base_controller.deliver_name);

module.exports = router;