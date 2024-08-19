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

function isLastOperationSymbol() {
    return calculatorSymbols.some(
        (symbol) => symbol.mathSymbol === currentOperation[currentOperation.length - 1],
    );
}

ELEMENT_Buttons.forEach((ELEMENT_Button) => {
    ELEMENT_Button.addEventListener('click', () => {
        let selectedSymbolOrNumber;

        if (ELEMENT_Button.classList.contains('symbol')) {
            // Prevent adding another symbol if the last operation is already a symbol
            if (isLastOperationSymbol()) return;

            selectedSymbolOrNumber = calculatorSymbols.find(
                (symbol) => symbol.name == ELEMENT_Button.id,
            ).mathSymbol;
        } else if (ELEMENT_Button.classList.contains('number')) {
            selectedSymbolOrNumber = parseInt(ELEMENT_Button.textContent);
        }

        if (selectedSymbolOrNumber != undefined) {
            currentOperation.push(selectedSymbolOrNumber);
            updateDisplay();
        }
    });
});

ELEMENT_Equals.addEventListener('click', calculateResult);
ELEMENT_Clear.addEventListener('click', clearInput);

function updateDisplay() {
    let numberOrSymbolToAdd;

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

function adjustFontSize() {
    const displayHeight = ELEMENT_Display.clientHeight;
    const contentHeight = ELEMENT_Display.scrollHeight;

    if (contentHeight > displayHeight) {
        let fontSize = parseInt(window.getComputedStyle(ELEMENT_Display).fontSize);
        fontSize -= 3;

        ELEMENT_Display.style.fontSize = fontSize + 'px';
    }
}

function decodeHTMLCodes(encodedString) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = encodedString;
    return textarea.value;
}

function calculateArrayAsMath(operationArray) {
    const expression = operationArray.join('');
    return eval(expression);
}

function calculateResult() {
    if (currentOperation.length >= 1) {
        const operationResult = calculateArrayAsMath(currentOperation);
        ELEMENT_Result.textContent = `${operationResult}`;
        ELEMENT_Result.style.display = 'block';
    }
}

function clearInput() {
    currentOperation = [];
    currentDisplayText = '';

    ELEMENT_Display.textContent = 0;
    ELEMENT_Result.textContent = '';
    ELEMENT_Result.style.display = 'none';
}

// Numpad support
window.addEventListener('keydown', (event) => {
    const key = event.key;
    let selectedSymbolOrNumber;

    if (key >= '0' && key <= '9') {
        selectedSymbolOrNumber = parseInt(key);
    } else if (key == '=') {
        calculateResult();
    } else {
        if (isLastOperationSymbol()) {
            return;
        }
        selectedSymbolOrNumber = calculatorSymbols.find(
            (symbol) => symbol.mathSymbol === key,
        ).mathSymbol;
    }

    if (selectedSymbolOrNumber != undefined) {
        currentOperation.push(selectedSymbolOrNumber);
        updateDisplay();
    }
});
