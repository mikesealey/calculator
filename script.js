a = ""
symbol = undefined
b = ""
currentOperand = ""
previousOperand = ""
numbers = "0123456789"
possibleSymbols = "+-*/"
equalsbuttonpressed = false

function test() {
    console.log("a = " + a)
    console.log("typeOf a = " + typeof a)
    console.log("symbol = " + symbol)
    console.log("typeOf symbol = " + typeof symbol)
    console.log("b = " + b)
    console.log("typeOf b = " + typeof b)
    console.log("previousOperand = " + previousOperand)
    console.log("typeOf previousOperand = " + typeof previousOperand)
    console.log("currentOperand = " + currentOperand)
    console.log("currentOperand typeof = " + typeof currentOperand)
    console.log("equalsbuttonpressed T/F = " + equalsbuttonpressed)
}

function maths(a, b, c) {
    console.log("function maths() was called with arguments")
    console.log("a = " + a + "  b = " + b + "  c = " + c)
    if (b == "+") {
        previousOperand = Number(a) + Number(c) 
    } else if (b == "-") {
        previousOperand = Number(a) - Number(c)
    } else if (b == "*") {
        previousOperand = Number(a) * Number(c)
    } else if (b == "/") {
        previousOperand = Number(a) / Number(c)
    } else {
        console.log("Error with b-argument in  function maths(a, b, c)")
        console.log(previousOperand[-1])
    }
    console.log("previousOperand = " + previousOperand)
}

function deleteButton() { // Happy with this (25/11/22 10:00)
    console.log("deleteButton pressed")
    if (currentOperand.length > 0) {
            console.log("currentOperand before deletion = " + currentOperand)
            currentOperand = currentOperand.substring(0, currentOperand.length-1)
            console.log("currentOperand after deletin = " + currentOperand)
    } else {
        currentOperand = previousOperand
        previousOperand = ""
    }
    updateDisplay()
}

function clearOutput() {
    previousOperand = ""
    currentOperand = ""
    updateDisplay()
}
function updateDisplay() {// 0.2 * 3 == 0.6000000001 Write something to fix this
    previousOperand = previousOperand.toString() 
    currentOperand = currentOperand.toString()
    document.getElementById("previous-operand").innerHTML = previousOperand
    document.getElementById("current-operand").innerHTML = currentOperand
}

function operatorButton(operator) {
    // Is there a symbol anywhere in the top row?
    equalsbuttonpressed = false
    if (currentOperand.includes("+") || currentOperand.includes("-") || currentOperand.includes("*") || currentOperand.includes("/")) {
        console.log("Option 1")
        console.log("Operator " + operator + " pressed, but already present") // Could write something to change symbol from the one already pressed to the newly pressed one
        return 

    // Is there a symbol in the top row? AND is the last character a number?
    } else if ((previousOperand.includes("+") || previousOperand.includes("-") || previousOperand.includes("*") || previousOperand.includes("/")) && Number(previousOperand.charAt(previousOperand.length-1)) != NaN) {
        console.log("There is a symbol in the top row AND the last character is a number")
        console.log("Option 2")
        previousOperand = currentOperand + operator
        currentOperand = ""
        updateDisplay()

    // Is there a symbol in the top row?   
    } else if (previousOperand.includes("+") || previousOperand.includes("-") || previousOperand.includes("*") || previousOperand.includes("/")) {
        // If previousOperand includes a symbol when the next operator button is pressed
        // you need to do the maths between
        // (previousOperand numbers) (previousOperand symbol) and (currentOperand numbers)
        // and set previousOperand to be the answer, followed by this operator button
        console.log("Option 3")
        b = previousOperand.charAt(previousOperand.length-1) // defining the symbol for maths(b)
        previousOperand = previousOperand.substring(0, previousOperand.length - 1) // cutting the last character (which is the symbol)
        maths(previousOperand, b, currentOperand)
        currentOperand = ""
        updateDisplay()
    } else {
        console.log("Option 4")
        console.log("Operator " + operator + " pressed")
        currentOperand += operator
        updateDisplay()
    }
}

function numberButton(n) {
    // even more messy logic, needs improving
    if (currentOperand.includes("+") || currentOperand.includes("-") || currentOperand.includes("*") || currentOperand.includes("/")) {
        previousOperand = currentOperand
        currentOperand = ""
        currentOperand += n
        console.log("numberButton called " + n)
        updateDisplay()
    } else if (currentOperand.includes(".") && n == ".") {
        console.log("User tried to add a multiple decimal points to a number")
        return
    } else if ((previousOperand.includes("+") || previousOperand.includes("-") || previousOperand.includes("*") || previousOperand.includes("/")) && numbers.includes(previousOperand.charAt(previousOperand.length-1))) { // If the next calculation begins and is unrelated to that which is currently displayed
        clearButton()
        currentOperand += n
        updateDisplay()
    } else {
        console.log("numberButton called " + n)
        currentOperand += n
        updateDisplay()
    }

}

function clearButton() {
    a = ""
    symbol = undefined
    b = ""
    previousOperand = ""
    currentOperand = ""
    updateDisplay()
    
}

function equalsButton() { 
    console.log("equals button pressed")
    if (equalsbuttonpressed == true) {
        console.log("equals button was pressed, but was already set to true")
        return
    } else {
    // sets symbol from last character from previousOperand
    console.log("equation = " + previousOperand + currentOperand)
    symbol = previousOperand.charAt(previousOperand.length - 1)
    // cuts symbol off from previousOperand
    console.log("previousOperand last character = " + previousOperand.charAt(previousOperand.length - 1))
    previousOperand = previousOperand.substring(0, previousOperand.length - 1)
    console.log("previousOperand last character has been cut")
    console.log("previousOperand last character is now = " + previousOperand.charAt(previousOperand.length - 1))
    console.log(previousOperand)
    console.log("symbol is = " + symbol)
    console.log(currentOperand)
    let placeholder = previousOperand
    if (symbol == "+") {
        previousOperand = previousOperand + symbol + currentOperand
        console.log("typeof previousOperand " + previousOperand + typeof previousOperand + " typeof currentOperand " + currentOperand + typeof currentOperand)
        currentOperand = Number(placeholder) + Number(currentOperand)
    } else if (symbol == "-") {
        previousOperand = previousOperand + symbol + currentOperand
        currentOperand = Number(placeholder) - Number(currentOperand)
    } else if (symbol == "*") {
        previousOperand = previousOperand + symbol + currentOperand
        currentOperand = Number(placeholder) * Number(currentOperand)
    } else if (symbol == "/") {
        previousOperand = previousOperand + symbol + currentOperand
        currentOperand = Number(placeholder) / Number(currentOperand)
    } else {
        console.log("Error in function equalsButton symbol selection")
    }
    updateDisplay()
    equalsbuttonpressed = true
    }

}

