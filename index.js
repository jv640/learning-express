const express = require('express');
const { static, urlencoded } = require('express');
const path = require('path');


const app = express();

// app.get('/', (req, res) => {
//     // res.send('<h1>Homepage buddy!! </h1>');
//     // we can send anything here for example we sended html above but we can send json using res.json and render 
//     // using res.render

// })
// to return a json file we just need res.json

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// to use a static server we have specific option for that in express 
app.use(express.static(path.join(__dirname, 'public')));
//using only this express.static we dont have to care about conext type like we did in nodejs 
// using express it is simple and easy to do 

//Members Api routes
app.use('/api/members', require('./routes/api/members')); 


const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`server started at ${PORT}`));