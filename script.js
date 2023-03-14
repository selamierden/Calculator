const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = 0;
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateValue() {
    display.value = displayValue;
}

keys.addEventListener("click",function(e) {
    const element = e.target;
    

    if (!element.matches("button")) return;

    if (element.classList.contains("operator")) {
        handleOperator(element.value);
        updateValue();   
        return;
    }

    if (element.classList.contains("decimal")) {
        inputDecimal();
        updateValue()
        return;
    }

    if (element.classList.contains("clear")) {
        clear();
        updateValue();
        return;
    }

    // console.log("number",element.value);
    inputNumber(element.value);
    updateValue();

});

function handleOperator(nextoperator) {
    const value = parseFloat(displayValue);

    if(operator && waitingForSecondValue) {
        operator = nextoperator;
        return
    }

    if(firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = String(result);
        firstValue = result;
    }
    waitingForSecondValue = true;
    operator = nextoperator;

    
}

function calculate(first, second, operator){
    if ( operator === "+" ) {
        return first + second;
    } else if (operator === "-"){
        return first - second;
    } else if (operator === "*") {
        return first * second;
    } else (operator === "/"); {
        return first / second;
    }

    return second;

}

function inputNumber(num) {
    if(waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === 0? num: displayValue + num;
    }
    
    
    

}

function inputDecimal() {
    if (!displayValue.includes(".")) {
        displayValue += ".";
    }
}

function clear() {
    displayValue = 0;
}
