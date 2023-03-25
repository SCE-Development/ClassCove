require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT;
const express = require("express");
const { connectDB } = require("./db/conn");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(require("./routes/router"));

connectDB();

app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
});
