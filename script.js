let a = "" // left side of the equation
let b = "" // right side of the equation
let alternator = 0
let symbol = ""
let equation = ""
let operatorCount = 0
let answer = 0



function test() {
    console.log("a = " + a)
    console.log("b = " + b)
    console.log("symbol = " + symbol)
    console.log("equation = " + equation)
    console.log("Operator count = " + operatorCount)
}

function clearOutput() {
    console.log("clearOutput called")
    a = ""
    document.getElementById("output").innerHTML = "0"
}

function updateOutput() {
    console.log("updateOutput called")
    document.getElementById("output").innerHTML = output
}

function clearButton() {
    console.log("clearButton called")
    a = ""
    document.getElementById("output").innerHTML = 0 // 0 is placeholder text
    console.log("Output row cleared")
    equation = ""
    answer = 0
}

function numberButton(n) {
    console.log("numberButton called " + n)
    if (alternator % 2 == 0) {
        a += n
        document.getElementById("output").innerHTML = a
    } else {
        b += n
        document.getElementById("output").innerHTML = b
    }
    test()
}

function deleteButton() {
    console.log("Delete button called")
    if (a.length <= 1) {
        a = "0"
        updateOutput()
    } else {
    a = a.substring(0, a.length -1)
    }
    document.getElementById("output").innerHTML = a
}

    // altenator makes input go to var a
function operatorButton(operator) {
    console.log("operator " + operator + " called")
    // when func called, alternator makes the next input go to var b
    alternator ++


    // do some maths
    if (operator == "+") {
        output = Number(a) + Number(b)
        a = output
        b = ""
        updateOutput()
    } else if (operator == "-") {
        output = Number(a) - Number(b)
        a = output
        b = ""
        updateOutput()
    } else if (operator == "*") {
        output = (Number(a) * Number(b))
        a = output
        b = ""
        updateOutput()
    } else if (operator == "/") {
        output = Number(a) / Number(b)
        a = output
        b = ""
        updateOutput()
    } else if (operator == "=") {
        console.log("equals button pressed")
        // Do the sum to = output
        // or ditch this option and use func equalsButton
        updateOutput()
    }

}
/*
function equalsButton() {
    alternator ++
    output = answer
    updateOutput()


}*/

// Add button to change the postivity/negativity (polarity?) of a number without the "-" symbol being added to the equation
