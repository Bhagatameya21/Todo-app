const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port=process.env.PORT || 3000;

require('dotenv').config()

app.use("/static",express.static("public"));

app.use(express.urlencoded({ extended: true }));


//connection to db

mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => {
console.log("Connected to db!");
app.listen(port,()=>console.log(`Server up and running at ${port}`));
})

//view engine configuration
app.set('view engine','ejs');

//GET
app.get('/',(req,res)=>{
    res.render('todo.ejs');
})

//POST
app.post('/',(req, res) => {
    console.log(req.body);
    });

app.listen();


