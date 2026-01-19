const btnBody = document.querySelector("#btnBody");
const display = document.querySelector("#display");
let btnList = [];

function genrateBtns() {
    for(let i = 0 ; i < 19 ; i++) {
        let btn = document.createElement("button");
        btn.classList.add("btnClass");
        if(i == 15){
            btn.classList.add("hBtn");
        }
        else {
            btn.classList.add("b" + i);
            btn.classList.add("workingBtn");
        }
        btnList.push(btn);
        btnBody.appendChild(btn);
    }
}


genrateBtns();

// create and add style to the "=" button
const hiddenBtn = document.querySelector(".btnClass.hBtn"); // hidden button, only a placeholder for the "=" button
const enter = document.createElement("button");
enter.classList.add("b15");
enter.classList.add("workingBtn"); // workingBtn are the buttons that are not hidden/placeholder.
hiddenBtn.appendChild(enter);

//repalce the hidden button 15 with the "=" button
btnList.splice(15, 1, enter);

// these labels will be put in all the working buttons in the order same as below.
const buttonLabels = ["+", "-", "*", "/", "7", "8", "9", "BS", "4", "5", "6", "C", "1", "2", "3", "=", "00", "0", "."];
buttonLabels.map((label, index) => {
    btnList[index].innerText = label;
    btnList[index].style.fontWeight = 700;
    btnList[index].style.fontSize = "30px";
})
 
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function devide(a, b) {
    return a / b;
}

function operate(a, op, b) {
    if(isNaN(a) || isNaN(b))
        return "Invalid";
    a = parseFloat(a);
    b = parseFloat(b);
    switch(op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return devide(a, b);
    }
}

function clearDisplay() {
    display.innerText = "";
}

let actionBtns = ["BS", "C", "="];
let operatorBtns = ["+", "-", "*", "/"];

function runActions (btn) {
    switch(btn.innerText) {
        case "=":
            if(op2) {
                console.log("operating");
                display.innerText = operate(op1, operator, op2);
                resetState();
                needDisplayClear = true;
            }
            else {
                console.log("empty equal");
            }
            break;
        case "C":
            clearDisplay();
            resetState();
            needDisplayClear = true;
            break;
    }
}

function takeOperator(btn) {
}


let firstPress = true;
let operatorPressed = false;
let needDisplayClear = false;
let op1 = "";
let op2 = "";
let operator = "";

function resetState() {
    firstPress = true;
    operatorPressed = false;
    needDisplayClear = false;
    op1 = "";
    op2 = "";
    operator = "";
}

btnBody.addEventListener("click", (event) => {

    if(event.target.id == "btnBody") return; // do nothing if just the button container is pressed

    if(actionBtns.includes(event.target.innerText)) { // check if action buttons(clear/backspace/equal) are pressed
        runActions(event.target);
        return;
    }

    console.log("non and nonAction is non");
    
    if(operatorBtns.includes(event.target.innerText)) { // check if operator button is pressed
        if(firstPress) {
            op1 += event.target.innerText;
            return;
        }
        if(operatorPressed && op2) {
            pastResult = operate(op1, operator, op2);
            display.innerText = pastResult;
            op1 = pastResult;
            op2 = "";
            needDisplayClear = true;
            operator = event.target.innerText;
            console.log(op1,operator, op2)
            return;
        }
        needDisplayClear = true;
        operatorPressed = true;
        operator = event.target.innerText;
        console.log(operator);
        return;
    }
    
    if(needDisplayClear) {
        console.log("need clearn");
        clearDisplay();
        needDisplayClear = false;
    }
    if(!operatorPressed) {
        op1 += event.target.innerText;
        display.innerText += event.target.innerText;
    }
    if(operatorPressed) {
        display.innerText += event.target.innerText;
        op2 += event.target.innerText;
    }

    firstPress = false;


    console.log(op1,operator, op2)
});