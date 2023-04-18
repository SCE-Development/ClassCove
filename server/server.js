// Configures path to retrieve 'PORT' from .env file
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT;

// Retrieves express() and connectDB() functions
const express = require("express");
const { connectDB } = require("./db/conn");

// Creates the express application and sets app to use dependencies
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(require("./routes/userRouter"));
app.use(require("./routes/courseRouter"));

// Connects to Mongo
connectDB();

app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
});

