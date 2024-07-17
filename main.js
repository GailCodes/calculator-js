const ELEMENT_Symbols = document.querySelectorAll(".symbol");
const ELEMENT_Numbers = document.querySelectorAll(".number");
const ELEMENT_Display = document.getElementById("operation-display");

const currentOperation = [];

const calculatorSymbols = [
  {
    name: "addition",
    mathSymbol: "+",
  },
  {
    name: "subtraction",
    mathSymbol: "-",
  },
  {
    name: "multiplication",
    mathSymbol: "*",
  },
  {
    name: "division",
    mathSymbol: "+",
  },
  {
    name: "decimal",
    mathSymbol: ".",
  },

  {
    name: "equals",
    mathSymbol: "=",
  },
];

ELEMENT_Symbols.forEach((ELEMENT_Symbol, index) => {
  ELEMENT_Symbol.addEventListener("click", () => {
    // Match the clicked symbol with the calculatorSymbols objects to find the correct mathematical symbol
    const selectedSymbol = calculatorSymbols.find(
      (symbol) => symbol.name == ELEMENT_Symbol.id
    ).mathSymbol;

    currentOperation.push(selectedSymbol);

    console.log(selectedSymbol);

    updateDisplay();
  });
});

ELEMENT_Numbers.forEach((ELEMENT_Number, index) => {
  ELEMENT_Number.addEventListener("click", () => {
    // Get the current number when clicking on the respective button
    // Convert it to a number and add it to the operation order
    const selectedNumber = parseInt(ELEMENT_Number.textContent);
    currentOperation.push(selectedNumber);

    console.log(selectedNumber);

    updateDisplay();
  });
});

function updateDisplay() {
  let currentOperationText = "";

  currentOperation.forEach((currentItem, index) => {
    currentOperationText += currentItem.toString();
  });

  ELEMENT_Display.textContent = currentOperationText;
}
