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
            data:{
                firstNum: $(`#firstNum`).val(),
                lastNum: $(`#lastNum`).val(),
                op: $(`.equalsButton`).data("op")
            }
        }).then(function(response){
            console.log('This is the ');
        }).catch(function(response){
            console.log('Request Failed');
        })
    }


    function getCalculations(){
        //get calculations from the server
        $.ajax({
            method: 'GET',
            url: '/results'
        }).then(function(response){
            console.log('this is the calculations array', response);
            renderToDom(response);
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
        }).catch(function(response){
            console.log('Request failed');
        })
    }

    function add(){
    $(`.equalsButton`).data("op", "+");
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
        $(`.total`).empty();
        for(let index of array){
            console.log('render to DOM the results', array);
            if 
        }
    }


