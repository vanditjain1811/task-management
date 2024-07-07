const express=require("express");
const mongoose= require("mongoose")
const dotenv=require("dotenv")
const bodyParser = require('body-parser');
const tasksRouter = require('./route/taskroutes');
const cors = require('cors');
const path = require("path");

const app=express();

dotenv.config();
app.use(bodyParser.json());
app.use(cors());



const PORT = process.env.PORT|| 5000;


mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});



app.use('/api/tasks', tasksRouter);

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
    

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});