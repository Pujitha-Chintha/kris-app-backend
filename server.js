const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require('cors')
const indexRoute = require('./routes/index.route')



const app = express();
app.use(cors())
app.use(express.json());


app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/user', indexRoute)






mongoose.connect(
    "mongodb+srv://pujithachintha0507:ny0McMC85uILSQQt@cluster0.edpwm.mongodb.net/kris_db?retryWrites=true&w=majority&appName=Cluster0",


).then(() => {
    console.log('MongoDB connection successfully');
})
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });



app.listen(5000, function () {
    console.log("server is listening to port no .5000")
})