$(onReady);

function onReady(){
    console.log('jquery loaded!');

    //click listeners\
    $(`.addButton`).on(`click`, add)
    $(`.subtractButton`).on(`click`, subtract)
    $(`.multiplyButton`).on(`click`, multiply)
    $(`.divideButton`).on(`click`, divide)
    $(`.equalsButton`).on(`click`, equals)
    $(`.clearButton`).on(`click`, clear)

    getCalculations();
}
    function equals(){
        $.ajax({
            method: 'POST',
            url: '/calculate',
            data:{ //grabbing values from input fields and assigning operator to property 
                firstNum: $(`#firstNum`).val(),
                lastNum: $(`#lastNum`).val(),
                op: $(`.equalsButton`).data("op")
            }
        }).then(function(response){
            console.log('This is the response', response);
            $(`#firstNum`).val('');
            $(`#lastNum`).val('');//clearing input fields after using 
            getCalculations();
        }).catch(function(response){
            console.log('Request Failed');
        })
    }


    function getCalculations(){
        //get calculations from the server
        $.ajax({
            method: 'GET',
            url: "/results"
        }).then(function(response){
            console.log('this is the calculations array', response);
            renderToDom(response);//displaying results array to DOM
            $(`.equalsButton`).data("op");//clearing the operator assigned to it 
        }).catch(function(response){
            console.log('Request failed');
        })
    }

    function clear(){
        $.ajax({
            method: 'GET',
            url: '/clear'
        }).then(function(response){
            console.log('this is the calculations array', response);
            renderToDom(response);
            $(`.total`).empty();//clear the total class, since in code it appears out of the clear in renderToDOM bracket
        }).catch(function(response){
            console.log('Request failed');
        })
    }

    function add(){//probably a more efficient way to assign operator, but this concept worked for me, so I went with it 
    $(`.equalsButton`).data("op", "+");
    console.log('This is adding!');
    }
    function subtract(){
    $(`.equalsButton`).data("op", "-");
    }
    function multiply(){
    $(`.equalsButton`).data("op", "*");
    }
    function divide(){
    $(`.equalsButton`).data("op", "/");
    }

    function renderToDom(array){
        $(`.history`).empty();
        for(let index of array){
            console.log('render to DOM the results', array);
         $(`.history`).append(`
            <li>${index.firstNum}${index.op}${index.lastNum} = ${index.total}
            </li>
         `)  //grab values from each index and append it to the dom
         $(`.total`).empty();//empty out most recent result
         $(`.total`).append(`<h1>${index.total}</h1>`);  //append most recent result to dom  
         }

    }


