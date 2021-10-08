const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

//this needs to be added for GET and POST routes
app.use(bodyParser.urlencoded({ extended: true}));

//serving up the static files 
app.use(express.static("server/public"));

app.listen(PORT, () =>{
    console.log("Server is running on port", PORT);
});