// Setup empty JS object to act as endpoint for all routes
const express = require('express')
const app = express();
const cors = require('cors')
// Require Express to run server and routes

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(3000,()=>{console.log('server is running at port 3000')})

let projectData = {};

app.get('/all',async(req,res)=>{
    res.status(200).json(projectData)
    // projectData = [];
})

app.post('/add',(req,res)=>{
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;
    res.send({ msg: "data posted successfully" });
})