/* 
CALCULATOR STATE MANAGEMENT:

Variables:
- op1: first number (string)
- op2: second number (string)  
- operator: current operator (+, -, *, /)
- result: calculation result
- needClear: flag to clear display before next input
- resultShown: flag indicating we just showed a result

Flow:
1. User types numbers -> goes into op1
2. User presses operator -> saves to operator variable, sets needClear
3. User types more numbers -> goes into op2
4. User presses = -> calculates op1 operator op2, stores in result and op1
5. User can continue (press operator) or start fresh (press number)

Key insight: display and variables are SEPARATE - always update both
*/

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
    let result = 0;
    switch(op) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "*":
            result = multiply(a, b);
            break;
        case "/":
            result = devide(a, b);
            break;
    }
    result = result.toFixed(5);
    if(result % 1 == 0)
        return parseInt(result);
    return result;
}

function clearDisplay() {
    display.innerText = "";
}

function doAction(actionLabel) {
    switch(actionLabel) {
        case "=":
            if(op2) {
                result = operate(op1, operator, op2);
                resetStates();
                op1 = result;
                clearDisplay();
                resultShown = true;
                needClear = true;
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
            if(!operator) {
                display.innerText = "";
                break;
            }
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
            needClear = false;
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
    op1 = "";
    op2 = "";
    operator = null;
    result;
    resultShown = false;
}


function buttonPressHandler(btnLabel, btn) {
    let pastSelected = document.querySelector(".selected");
    if(pastSelected) {
        pastSelected.classList.remove("selected");
    }
    if(actionBtns.includes(btnLabel)) {
        doAction(btnLabel);
        return;
    }

    if(operatorBtns.includes(btnLabel)) {
        if(operator && op2) {
            result = operate(op1, operator, op2);
            display.innerText = result;
            op1 = result;
            op2 = "";
        }
        if(btn) btn.classList.add("selected");
        operator = btnLabel;
        needClear = true;
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
        if(resultShown) {
            op1 = "";
            display.innerText = "";
            resultShown = false;
            needClear = false;
        }
        if(btnLabel == ".") {
            if(op1.includes("."))
                return;
        }
        op1 += btnLabel;
        display.innerText += btnLabel;
    }
}

btnBody.addEventListener("click", (event) => {
    btn = event.target;
    if( btn == btnBody) return;
    return buttonPressHandler(btn.innerText, btn);
});

document.addEventListener("keydown", (event) => {
    const key = event.key;
    let btnElement = null;
    if(operatorBtns.includes(key)) {
        btnElement = Array.from(btnList).find(b => b.innerText === key);
    }
    if(key == "Enter") {
        event.preventDefault(); 
        let enter = document.querySelector(".b15");
        buttonPressHandler("=", enter);
    }
    else if(key == "Escape") {
        buttonPressHandler("C");
    }
    else if(key == "Backspace") {
        buttonPressHandler("BS");
    }
    else if("0123456789.+-*/".includes(key)) {
        buttonPressHandler(key, btnElement);
    }
})