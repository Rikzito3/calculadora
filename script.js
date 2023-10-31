document.addEventListener("DOMContentLoaded", function () {
  let inputBuffer = "";
  let currentOperator = "";
  let currentResult = 0;

  function updateDisplay() {
    document.getElementById("resultado").value = inputBuffer || currentResult;
  }

  function updateDisplay() {
    const resultadoElement = document.getElementById("resultado");

    if (resultadoElement) {
      resultadoElement.value = inputBuffer || currentResult;
    } else {
      console.error("Elemento 'resultado' não encontrado.");
    }
  }

  function handleInput(value) {
    if (value === ",") {
      if (!inputBuffer.includes(",")) {
        inputBuffer += value;
      }
    } else if (isNaN(value)) {
      if (value === "=") {
        calculateResult();
      } else if (value === "AC") {
        clearAll();
      } else if (value === "apagar") {
        backspace();
      } else {
        currentOperator = value;
        inputBuffer += ` ${value} `;
      }
    } else {
      inputBuffer += value;
    }

    updateDisplay();
  }

  function backspace() {
    inputBuffer = inputBuffer.slice(0, -1);
    updateDisplay();
  }

  function calculateResult() {
    const expression = inputBuffer.split(" ");

    if (expression.length === 3) {
      const num1 = parseFloat(expression[0].replace(",", "."));
      const op = expression[1];
      const num2 = parseFloat(expression[2].replace(",", "."));

      switch (op) {
        case "+":
          currentResult = num1 + num2;
          break;
        case "-":
          currentResult = num1 - num2;
          break;
        case "X":
          currentResult = num1 * num2;
          break;
        case "÷":
          currentResult = num1 / num2;
          break;
        case "%":
          currentResult = (num1 * num2) / 100;
          break;
        default:
          break;
      }
    }

    inputBuffer = currentResult.toString();
    currentOperator = "";
    updateDisplay();
  }

  function clearAll() {
    inputBuffer = "";
    currentOperator = "";
    currentResult = 0;
    updateDisplay();
  }

  const buttons = document.querySelectorAll(".operacao button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const value = this.textContent;
      const isApagarButton = this.classList.contains("apagar");

      if (isApagarButton) {
        backspace();
      } else {
        handleInput(value);
      }
    });
  });
});
