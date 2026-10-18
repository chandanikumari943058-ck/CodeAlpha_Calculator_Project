let display = document.getElementById("display");
let history = document.getElementById("history");
let themeBtn = document.getElementById("themeBtn");

let expression = "";
let dark = true;

function safeEval(expr) {
    return Function('"use strict"; return (' + expr + ')')();
}

function updateDisplay() {
    display.innerText = expression || "0";
}

function add(value) {
    if (expression === "Error") {
        expression = "";
    }

    expression += value;
    updateDisplay();
}

function clearAll() {
    expression = "";
    history.innerText = "";
    updateDisplay();
}

function clearEntry() {
    expression = "";
    updateDisplay();
}

function deleteLast() {
    if (expression === "Error") {
        expression = "";
    } else {
        expression = expression.slice(0, -1);
    }

    updateDisplay();
}

function toggleSign() {
    if (expression === "" || expression === "Error") {
        return;
    }

    if (expression.startsWith("-")) {
        expression = expression.slice(1);
    } else {
        expression = "-" + expression;
    }

    updateDisplay();
}

function percent() {
    if (expression === "" || expression === "Error") {
        return;
    }

    try {
        expression = String(safeEval(expression) / 100);
        history.innerText = "";
        updateDisplay();
    } catch {
        expression = "Error";
        history.innerText = "";
        updateDisplay();
    }
}

function sqrtValue() {
    if (expression === "" || expression === "Error") {
        return;
    }

    try {
        expression = String(Math.sqrt(Number(safeEval(expression))));
        history.innerText = "";
        updateDisplay();
    } catch {
        expression = "Error";
        history.innerText = "";
        updateDisplay();
    }
}

function squareValue() {
    if (expression === "" || expression === "Error") {
        return;
    }

    try {
        expression = String(Number(safeEval(expression)) ** 2);
        history.innerText = "";
        updateDisplay();
    } catch {
        expression = "Error";
        history.innerText = "";
        updateDisplay();
    }
}

function reciprocal() {
    if (expression === "" || expression === "Error") {
        return;
    }

    try {
        let value = Number(safeEval(expression));

        if (value === 0) {
            throw new Error("Division by zero");
        }

        expression = String(1 / value);
        history.innerText = "";
        updateDisplay();
    } catch {
        expression = "Error";
        history.innerText = "";
        updateDisplay();
    }
}

function calculate() {
    if (expression === "" || expression === "Error") {
        return;
    }

    try {
        let result = safeEval(expression);
        history.innerText = expression + " =";
        expression = String(result);
        updateDisplay();
    } catch {
        expression = "Error";
        history.innerText = "";
        updateDisplay();
    }
}

function updateTheme() {
    document.body.classList.toggle("light-theme", !dark);
    themeBtn.textContent = dark ? "☀" : "☾";
    themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}

document.addEventListener("keydown", function(event) {
    let key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "."
    ) {
        add(key);
    }
    else if (key === "Enter" || key === "=") {
        calculate();
    }
    else if (key === "Backspace") {
        deleteLast();
    }
    else if (key === "Escape") {
        clearAll();
    }
    else if (key === "%") {
        percent();
    }
});

themeBtn.addEventListener("click", function() {
    dark = !dark;
    updateTheme();
});

updateTheme();
updateDisplay();