const express = require("express");

const app = express();

app.get("/", (req, res) => res.json({ message: "Contact Management API" }));

// HTTP Requests: GET(getting data from server), POST(Submitting info to server), PUT(Update info on server), DELETE(Delete info on server)

// define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
