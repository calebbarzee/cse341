const router = require('express').Router();

router.get("/", (req, res) => {
  // send back name in response
  res.send("Caleb Barzee");
});

module.exports = router;