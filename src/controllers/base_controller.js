const base_controller = {};

base_controller.deliver_name = (req, res) => {
  // send back name in response
  res.send("Caleb Barzee");
};

module.exports = base_controller;