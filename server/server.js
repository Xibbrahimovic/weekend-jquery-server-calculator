const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
let resultsArray = [];

//this needs to be added for GET and POST routes
app.use(bodyParser.urlencoded({ extended: true}));

//serving up the static files 
app.use(express.static("server/public"));

app.listen(PORT, () =>{
    console.log("Server is running on port", PORT);
});


app.post("/calculate", (req,res) => {
    console.log('This is the req.body ', req.body);
    //grabs the input values and equalsButton op value
    let equation = req.body;//reassigning value to equation variable 
    console.log('this is the equation data!', equation);
    resultsArray.push({ //pushing data into resultsArray
        firstNum: equation.firstNum,
        lastNum: equation.lastNum,
        op: equation.op, 
        total: calculate(equation) //call function and pass in property values for calculation
    })

    res.sendStatus(201);
})

app.get("/results", (req, res) => {
    console.log('This is the getCalculations button get request');
    res.send(resultsArray);
})

app.get("/clear", (req, res) =>{
    console.log("This is the clear button GET");
    resultsArray = [];
    res.send(resultsArray);//
})
//if statements help pull in operator and carry out calculation properly 
function calculate(equation){
    if(equation.op === "+"){
        let result = 
        (parseFloat(equation.firstNum) + parseFloat(equation.lastNum));
        return result; 
    }
    if(equation.op === "-"){
        let result = (equation.firstNum - equation.lastNum);
        return result; 
    }
    if(equation.op === "*"){
        let result = (equation.firstNum * equation.lastNum);
        return result; 
    }
    if(equation.op === "/"){
        let result = (equation.firstNum / equation.lastNum);
        return result; 
    }
    if(equation.op === ""){
        alert('No operator selected');
    }
}