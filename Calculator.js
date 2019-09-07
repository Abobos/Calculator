const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".calculator_keys");
const display = document.querySelector(".calculator_display");
keys.addEventListener("click", e => {
  if (e.target.matches("button")) {
    const key = e.target;
    const keyContent = key.textContent;
    const keyAction = key.dataset.action;
    var displayNum = display.textContent;

    if (!keyAction) {
      if (displayNum == "0") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayNum + keyContent;
      }
    }

    if (keyAction == "decimal") {
      if (!displayNum.includes(".")) {
        display.textContent = displayNum + ".";
      } else {
        display.textContent = "0";
      }
    }

    if (
      keyAction == "add" ||
      keyAction == "subtract" ||
      keyAction == "multiply" ||
      keyAction == "divide"
    ) {
      calculator.dataset.operator = keyAction;
      key.classList.add("depressed");
      calculator.dataset.firstValue = displayNum;
      calculator.dataset.previousKeyType = "operator";
    } else {
      Array.from(key.parentNode.children).forEach(k =>
        k.classList.remove("depressed")
      );
    }

    if (keyAction == "decimal") {
      calculator.dataset.previousKeyType = "decimal";
    }

    const previousKey = calculator.dataset.previousKeyType;

    if (!keyAction) {
      if (previousKey == "operator") {
        display.textContent = keyContent;
      }

      if (previousKey == "operator" && displayNum == keyContent) {
      }
    }

    const calculate = (n1, operator, n2) => {
      if (operator == "add") {
        return parseFloat(n1) + parseFloat(n2);
      }

      if (operator == "subtract") {
        return parseFloat(n1) - parseFloat(n2);
      }

      if (operator == "divide") {
        return parseFloat(n1) / parseFloat(n2);
      }

      if (operator == "multiply") {
        return parseFloat(n1) * parseFloat(n2);
      }
    };

    if (keyAction == "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayNum;
      display.textContent = calculate(firstValue, operator, secondValue);
    }

    if (keyAction == "clear") {
      display.textContent = "";
      keyContent == "AC" ? (key.textContent = "CE") : (key.textContent = "AC");
    }
  }
});
