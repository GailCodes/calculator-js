const ELEMENT_Symbols = document.querySelectorAll(".symbol");
const ELEMENT_Numbers = document.querySelectorAll(".number");
const ELEMENT_Buttons = document.querySelectorAll("button");
const ELEMENT_Display = document.getElementById("operation-display");
const ELEMENT_Equals = document.querySelector(".equals");
const ELEMENT_Clear = document.querySelector(".clear");

const calculatorSymbols = [
  {
    name: "addition",
    mathSymbol: "+",
    prettySymbol: "&#43;",
  },
  {
    name: "subtraction",
    mathSymbol: "-",
    prettySymbol: "&#8722;",
  },
  {
    name: "multiplication",
    mathSymbol: "*",
    prettySymbol: "&#215;",
  },
  {
    name: "division",
    mathSymbol: "/",
    prettySymbol: "&#247;",
  },
  {
    name: "decimal",
    mathSymbol: ".",
    prettySymbol: ".",
  },
  // {
  //   name: "equals",
  //   mathSymbol: "=",
  //   prettySymbol: "&#61;",
  // },
];

const currentOperation = [];
let currentDisplayText = "";

ELEMENT_Buttons.forEach((ELEMENT_Button, index) => {
  ELEMENT_Button.addEventListener("click", () => {
    let selectedSymbolOrNumber;

    // Check to see if the button you clicked on is a symbol or a number
    if (ELEMENT_Button.classList.contains("symbol")) {
      // Match the clicked symbol with the calculatorSymbols objects to find the correct mathematical symbol
      selectedSymbolOrNumber = calculatorSymbols.find(
        (symbol) => symbol.name == ELEMENT_Button.id
      ).mathSymbol;
    } else if (ELEMENT_Button.classList.contains("number")) {
      // If a number then convert the buttons text string into a integer
      selectedSymbolOrNumber = parseInt(ELEMENT_Button.textContent);
    }

    // Only add a number or symbol to the current operation if it exists
    if (selectedSymbolOrNumber) {
      currentOperation.push(selectedSymbolOrNumber);
      updateDisplay();
    }
  });
});

// Calculate the operation when pressing the equals button
ELEMENT_Equals.addEventListener("click", () => {
  console.log("Operation: " + JSON.stringify(currentOperation));
});

// Every time a button is pressed, we need to show it on the display
function updateDisplay() {
  let numberOrSymbolToAdd;

  // Show the symbol the same as the one on the calculator button
  // * is instead x, etc..
  const prettySymbol = calculatorSymbols.find(
    (symbol) =>
      symbol.mathSymbol == currentOperation[currentOperation.length - 1]
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

    ELEMENT_Display.style.fontSize = fontSize + "px";
  }
}

// Convert string like "&#43;" into actual symbols like +
function decodeHTMLCodes(encodedString) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = encodedString;
  return textarea.value;
}
