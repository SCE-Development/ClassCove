import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';

const app = express();
const PORT = 3000;

// MONGO
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/practiceDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// BODY PARSER
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get('/', (req, res) => 
    res.send(`Our web app is working!!!! ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`The server is working on port ${PORT}`)
);