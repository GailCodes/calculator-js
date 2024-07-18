const ELEMENT_Display = document.getElementById('operation-display');
const ELEMENT_Result = document.getElementById('result-display');
const ELEMENT_Symbols = document.querySelectorAll('.symbol');
const ELEMENT_Numbers = document.querySelectorAll('.number');
const ELEMENT_Buttons = document.querySelectorAll('button');
const ELEMENT_Equals = document.querySelector('.equals');
const ELEMENT_Clear = document.querySelector('.clear');

const calculatorSymbols = [
    {
        name: 'addition',
        mathSymbol: '+',
        prettySymbol: '&#43;',
    },
    {
        name: 'subtraction',
        mathSymbol: '-',
        prettySymbol: '&#8722;',
    },
    {
        name: 'multiplication',
        mathSymbol: '*',
        prettySymbol: '&#215;',
    },
    {
        name: 'division',
        mathSymbol: '/',
        prettySymbol: '&#247;',
    },
    {
        name: 'decimal',
        mathSymbol: '.',
        prettySymbol: '.',
    },
];

let currentOperation = [];
let currentDisplayText = '';

ELEMENT_Buttons.forEach((ELEMENT_Button, index) => {
    ELEMENT_Button.addEventListener('click', () => {
        let selectedSymbolOrNumber;

        // Check to see if the button you clicked on is a symbol or a number
        // Also, don't allow sequential symbols like: +*
        if (
            ELEMENT_Button.classList.contains('symbol') &&
            !calculatorSymbols.find(
                (symbol) => symbol.mathSymbol == currentOperation[currentOperation.length - 1],
            )
        ) {
            // Match the clicked symbol with the calculatorSymbols objects to find the correct mathematical symbol
            selectedSymbolOrNumber = calculatorSymbols.find(
                (symbol) => symbol.name == ELEMENT_Button.id,
            ).mathSymbol;

            // If an ineteger then convert the buttons text string into a integer
        } else if (ELEMENT_Button.classList.contains('number')) {
            selectedSymbolOrNumber = parseInt(ELEMENT_Button.textContent);
        }

        // Only add a number or symbol to the current operation if it exists
        // Check for undefined because the number can be 0
        if (selectedSymbolOrNumber != undefined) {
            currentOperation.push(selectedSymbolOrNumber);
            updateDisplay();
        }
    });
});

// Calculate the operation when pressing the equals button
ELEMENT_Equals.addEventListener('click', () => {
    const operationResult = calculateArrayAsMath(currentOperation);

    ELEMENT_Result.textContent = `${operationResult}`;
    ELEMENT_Result.style.display = 'block';
});

// Clear the current operation and reset everything
ELEMENT_Clear.addEventListener('click', () => {
    currentOperation = [];
    currentDisplayText = '';

    ELEMENT_Display.textContent = 0;
    ELEMENT_Result.textContent = '';
    ELEMENT_Result.style.display = 'none';
});

// Every time a button is pressed, we need to show it on the display
function updateDisplay() {
    let numberOrSymbolToAdd;

    // Show the symbol the same as the one on the calculator button
    // * is instead x, etc..
    const prettySymbol = calculatorSymbols.find(
        (symbol) => symbol.mathSymbol == currentOperation[currentOperation.length - 1],
    )?.prettySymbol;

    if (prettySymbol) {
        numberOrSymbolToAdd = decodeHTMLCodes(prettySymbol);
    } else {
        numberOrSymbolToAdd = currentOperation[currentOperation.length - 1];
    }

    currentDisplayText += numberOrSymbolToAdd;

    ELEMENT_Display.textContent = currentDisplayText;
    adjustFontSize();
}

// When the operation display fills up with numbers and symbols we need to decrease the size of the text
function adjustFontSize() {
    const displayHeight = ELEMENT_Display.clientHeight;
    const contentHeight = ELEMENT_Display.scrollHeight;

    // Check if content overflows the container
    if (contentHeight > displayHeight) {
        let fontSize = parseInt(window.getComputedStyle(ELEMENT_Display).fontSize);
        fontSize -= 3;

        ELEMENT_Display.style.fontSize = fontSize + 'px';
    }
}

// Convert string like "&#43;" into actual symbols like +
function decodeHTMLCodes(encodedString) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = encodedString;
    return textarea.value;
}

function calculateArrayAsMath(operationArray) {
    const expression = operationArray.join('');
    return eval(expression);
}
