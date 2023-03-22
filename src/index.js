const express = require("express");
const app = express();

// identify src as root
app.use(express.static("src"));

app.use("/", require("./routes/base_route.js"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}.`);
});
