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
    a = +a;
    b = +b;
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

function doAction(actionLabel) {
    switch(actionLabel) {
        case "=":
            if(op2) {
                result = operate(op1, operator, op2);
                console.log(result);
                op1 = result;
                resetStates();
                clearDisplay();
                resultShown = true;
                display.innerText = result;
                break;
            }
            else {
                display.innerText = "Invalid";
            }
            break;
        case "BS":
            let text = display.innerText;
            text = text.substring(0, text.length - 1);
            display.innerText = text;
            if(operator && op2) {
                op2 = op2.substring(0, op2.length - 1);
            }
            else {
                op1 = op1.substring(0, op1.length - 1);
            }
            break;
        case "C":
            display.innerText = "";
            resetStates();
            op1 = "";
    }
}

let actionBtns = ["BS", "C", "="];
let operatorBtns = ["+", "-", "*", "/"];
let op1 = "";
let op2 = "";
let operator;
let result;
let needClear = false;
let resultShown = false;

function resetStates() {
    op2 = "";
    operator = null;
    result;
    resultShown = false;
}

btnBody.addEventListener("click", (event) => {
    btn = event.target;
    btnLabel = btn.innerText;
    let pastSelected = document.querySelector(".selected");
    if(pastSelected) {
        pastSelected.classList.remove("selected");
    }
    if( btn == btnBody) return;
    if(actionBtns.includes(btnLabel)) {
        doAction(btnLabel);
        console.log(op1, operator, op2);
        return;
    }

    if(operatorBtns.includes(btnLabel)) {
        if(operator && op2) {
            console.log("do past");
            result = operate(op1, operator, op2);
            display.innerText = result;
            op1 = result;
            op2 = "";
        }
        operator = btnLabel;
        needClear = true;
        btn.classList.add("selected");
        return;
    }

    if(needClear) {
        clearDisplay();
    }

    if(operator) {
        if(btnLabel == ".") {
            if(op2.includes("."))
                return;
        }
        needClear = false;
        display.innerText += btnLabel;
        op2 += btnLabel;
    }
    else {
        if(btnLabel == ".") {
            if(op1.includes("."))
                return;
        }
        op1 += btnLabel;
        display.innerText += btnLabel;
    }

    console.log(op1, operator, op2);
    

});