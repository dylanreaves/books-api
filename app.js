const express = require("express");
const cors = require("cors")
const morgan = require("morgan")
const apiRouter = require("./api")
const app = express();

app.use(express.json());
app.use(cors())
app.use(morgan("dev"))
app.use("/api", apiRouter)

app.get("/", (req, res) => res.send("Books API is running"));

app.listen(8080, () => console.log("Server running on port 8080"));