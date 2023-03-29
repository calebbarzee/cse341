const express = require("express");
const app = express();
const { initDB } = require("./src/config/db.js");

// middleware
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/contacts", require("./src/routes/contacts.js"));

initDB((err) => {
	if (err) {
		console.log("Error connecting to database.");
	} else {
		console.log("Successfully connected to database.");
	}
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}.`);
});
