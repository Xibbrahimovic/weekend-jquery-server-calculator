const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;
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
    let equation = req.body;
    console.log('this is the equation data!', equation);
    resultsArray.unshift({
        firstNum: equation.firstNum,
        lastNum: equation.lastNum,
        op: equation.op,
        total: calculate(equation)
    })
    res.sendStatus(201);
})

app.get("/results", (req, res) => {
    console.log('This is the getCalculations button');
    res.send(resultsArray);
})

app.get("/clear", (req, res) =>{
    console.log("This is the clear button GET");
    resultsArray = [];
    res.send(resultsArray);
})

function calculate(equation){
    if(equation.op === "+"){
        let result = 
        (equation.firstNum + equation.lastNum);
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
    if(equation.op === "+"){
        let result = (equation.firstNum / equation.lastNum);
        return result; 
    }
    if(equation.op === ""){
        alert('No operator selected');
    }
}