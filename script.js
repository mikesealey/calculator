a = ""
symbol = undefined
b = ""
currentOperand = ""
previousOperand = ""
numbers = "0123456789"
symbols = "+-*/"
equalsbuttonpressed = false

function test() { // Left in for debugging purposes
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

function includesSymbol(arg) { // pass argument to check if it includes any symbols
    // This function only ever gets called from within another function 
    if (arg != undefined) {
        if (symbols.includes(arg.charAt(arg.length-1))) {    
            // symbol is the last item in the string return "last"
            // "12 + "
            return "last"
        } else if (arg.includes("+") ||
                   arg.includes("-") ||
                   arg.includes("*") ||
                   arg.includes("/")) { // symbol is present, but not the last item
                                        // "12 + 7"
                        return "present"
        } else {
            return false // no symbol is present
        }
    }



}

function maths(a, b, c) {
    if (b == "+") {
        previousOperand = Number(a) + Number(c) 
    } else if (b == "-") {
        previousOperand = Number(a) - Number(c)
    } else if (b == "*") {
        previousOperand = Number(a) * Number(c)
    } else if (b == "/") {
        previousOperand = Number(a) / Number(c)
    } else {
        return
    }
}

function deleteButton() {
    if (currentOperand.length > 0) {  // If there's some thing to delete
            currentOperand = currentOperand.substring(0, currentOperand.length-1) // Then delete!
    // If currentOperand is empty, AND previousOperand ends on a symbol
    } else if (currentOperand.length == 0 && includesSymbol(previousOperand) === "last") { 
        // Pull it down from previousOperand and delete the symbol
        currentOperand = previousOperand.substring(0, previousOperand.length-1)
        previousOperand = ""
    } else {// Nothing in currentOperand, pull previousOperand down to currentOperand
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
    // Rounding stuff
    
    // /rounding

    previousOperand = previousOperand.toString() 
    currentOperand = currentOperand.toString()
    document.getElementById("previous-operand").innerHTML = previousOperand
    document.getElementById("current-operand").innerHTML = currentOperand
}

function operatorButton(operator) {
    if (includesSymbol(previousOperand) === "present" && Number(currentOperand) != NaN) { // Stagered string calculation
        previousOperand = currentOperand
        previousOperand += operator
        currentOperand = ""
    } else if (previousOperand === "") { // simple calculation
        previousOperand = currentOperand
        previousOperand += operator
        currentOperand = ""
    } else if (includesSymbol(previousOperand) === "last" && currentOperand == "") { // Repeated click
        return // or consider replacing previously selected symbol with new symbol
    } else if (includesSymbol(previousOperand) === "last" && currentOperand.length > 0) { // string calculation
        symbol = previousOperand.charAt(previousOperand.length-1)
        previousOperand = previousOperand.substring(0, previousOperand.length - 1)
        maths(previousOperand, symbol, currentOperand)
        previousOperand += operator
        currentOperand = ""
        updateDisplay()
    } else if (includesSymbol(previousOperand) === "last" && currentOperand.length > 0) {       // String calculation
        symbol = previousOperand.charAt(previousOperand.length-1)
        previousOperand = previousOperand.substring(0, previousOperand.length - 1)
        maths(previousOperand, symbol, currentOperand)
        previousOperand += operator
    } else {
        return
    }
    equalsbuttonpressed = false
    updateDisplay()
}

function numberButton(n) {
    equalsbuttonpressed = false
    if (currentOperand.length >= 15) { // Calculator screen will overflow
        return
    } else {
        if (includesSymbol(currentOperand) === "last") {
            currentOperand = ""
            currentOperand += n
            updateDisplay()
        } else if (currentOperand.includes(".") && n == ".") { // Cannot add multiple decimal points
            return
        } else if ((previousOperand.includes("+") || previousOperand.includes("-") || previousOperand.includes("*") || previousOperand.includes("/")) && numbers.includes(previousOperand.charAt(previousOperand.length-1))) { // If the next calculation begins and is unrelated to that which is currently displayed
            clearButton()
            currentOperand += n
            updateDisplay()
        } else {
            currentOperand += n
            updateDisplay()
        }
    }
}

function clearButton() {
    a = ""
    symbol = undefined
    b = ""
    previousOperand = ""
    currentOperand = ""
    equalsbuttonpressed = false
    updateDisplay()
}

function equalsButton() { 
    if (equalsbuttonpressed == true) { // Pressing a number reverts this to false for staggered-string calcs
        return
    } else {
    // sets symbol from last character from previousOperand
    symbol = previousOperand.charAt(previousOperand.length - 1)
    // cuts symbol off from previousOperand
    previousOperand = previousOperand.substring(0, previousOperand.length - 1)
    let placeholder = previousOperand
    if (symbol == "+") {
        previousOperand = previousOperand + symbol + currentOperand
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
        return
    }
    updateDisplay()
    equalsbuttonpressed = true
    }

}

/*

Tests - 
NB: Later on in The Odin Project TDD is covered, and the sylabus requires the student
    to write the test for a project they've made, so whilst this is currently primative
    it will be replaced at a later date.

1 + 2 = 3               Simple addition                   Passed 02/12/22
1 + 2 + 3 = 6           String addition                   Passed 06/12/22
12 + 5 = 17 + 4 = 21    Staggered String Addition         Passed 06/12/22

100 - 45 = 55           Simple subtraction                Passed 02/12/22
100 - 45 - 21 = 34      String subtraction                Passed 06/12/22
100 - 33 = 67 - 5 = 62  Staggered String Subtraction      Passed 06/12/22

4 * 3 = 12              Simple Multiplication             Passed 02/12/22
4 * 3 * 5 = 60          String Multiplication             Passed 06/12/22
4 * 5 = 20 * 3 = 60     Staggered String Multiplication   Passed 06/12/22

12 / 3 = 4              Simple Division                   Passed 02/12/22
12 / 3 / 2 = 2          String Division                   Passed 06/12/22
24 / 3 = 8 / 2 = 4      Staggered String Division         Passed 06/12/22

I should actually do some proper TDD, but I think that happens later on in TOP...

Still To Do:

Numbers greater than approximately 18 characters long will overflow
the calculator screen. Consider adding in a function to limit their apparent length
    edit to add - currently limiting the input length, but addition and multiplication circumnavigate this

Tweak display or clear-function to negate the placeholder text in the HTML file

Address the rounding error involved with floats/IEEE754
*/