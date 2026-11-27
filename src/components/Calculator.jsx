import { useState } from "react";
import "./Calculator.css";

// Solves an operation between two numbers. Returns null on division by zero.
function calculateResult(first, second, operator) {
  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      return second === 0 ? null : first / second;
    default:
      return null;
  }
}

// Removes long decimals that JavaScript sometimes produces (0.1 + 0.2).
function cleanNumber(value) {
  return Number(value.toFixed(10));
}

function Calculator({ onBack }) {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNumber, setWaitingForNumber] = useState(true);

  // Writes a digit. If coming from a result, starts a new number.
  function writeDigit(digit) {
    if (display === "Error") {
      setDisplay(digit);
      setFirstOperand(null);
      setOperator(null);
      setWaitingForNumber(false);
      return;
    }

    if (waitingForNumber) {
      setDisplay(digit);
      setWaitingForNumber(false);
    } else if (display === "0") {
      setDisplay(digit);
    } else {
      setDisplay(display + digit);
    }
  }

  // Adds two zeros, but never leaves an invalid initial value such as "00".
  function writeDoubleZero() {
    if (display === "Error") {
      setDisplay("0");
      setFirstOperand(null);
      setOperator(null);
      setWaitingForNumber(false);
      return;
    }

    if (waitingForNumber || display === "0") {
      setDisplay("0");
      setWaitingForNumber(false);
      return;
    }

    setDisplay(display + "00");
  }

  // Adds a single decimal point.
  function writeDot() {
    if (display === "Error") {
      setDisplay("0.");
      setFirstOperand(null);
      setOperator(null);
      setWaitingForNumber(false);
      return;
    }

    if (waitingForNumber) {
      setDisplay("0.");
      setWaitingForNumber(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  // Stores the first value and the chosen operator.
  function chooseOperator(nextOperator) {
    if (display === "Error") {
      return;
    }

    // If an operator was already chosen and the second number has not been
    // typed yet, just replace the operator.
    if (operator !== null && waitingForNumber) {
      setOperator(nextOperator);
      return;
    }

    // If the second number was already typed, solve the pending operation.
    if (operator !== null && !waitingForNumber) {
      const partial = calculateResult(firstOperand, Number(display), operator);

      if (partial === null) {
        setDisplay("Error");
        setFirstOperand(null);
        setOperator(null);
        setWaitingForNumber(true);
        return;
      }

      const cleanPartial = cleanNumber(partial);
      setDisplay(String(cleanPartial));
      setFirstOperand(cleanPartial);
      setOperator(nextOperator);
      setWaitingForNumber(true);
      return;
    }

    setFirstOperand(Number(display));
    setOperator(nextOperator);
    setWaitingForNumber(true);
  }

  // Calculates the result when "=" is pressed.
  function calculate() {
    if (operator === null || firstOperand === null || display === "Error") {
      return;
    }

    const secondOperand = waitingForNumber ? firstOperand : Number(display);
    const result = calculateResult(firstOperand, secondOperand, operator);

    if (result === null) {
      setDisplay("Error");
      setFirstOperand(null);
      setOperator(null);
      setWaitingForNumber(true);
      return;
    }

    setDisplay(String(cleanNumber(result)));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForNumber(true);
  }

  // Deletes the last character of the displayed number.
  function deleteLast() {
    if (display === "Error") {
      setDisplay("0");
      setFirstOperand(null);
      setOperator(null);
      setWaitingForNumber(true);
      return;
    }

    if (waitingForNumber) {
      setDisplay("0");
      setWaitingForNumber(false);
      return;
    }

    const shorter = display.slice(0, -1);
    setDisplay(shorter === "" || shorter === "-" ? "0" : shorter);
  }

  // Resets the whole calculator.
  function clearAll() {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForNumber(true);
  }

  return (
    <div className="calculator-panel">
      <div className="calculator-display" aria-label="display" aria-live="polite">
        {display}
      </div>

      <div className="calculator-keys">
        <button type="button" className="calculator-key calculator-function" onClick={clearAll}>
          C
        </button>
        <button
          type="button"
          className="calculator-key calculator-function"
          onClick={() => chooseOperator("/")}
        >
          ÷
        </button>
        <button
          type="button"
          className="calculator-key calculator-function"
          onClick={() => chooseOperator("*")}
        >
          ×
        </button>
        <button type="button" className="calculator-key calculator-function" onClick={deleteLast}>
          DEL
        </button>

        <button type="button" className="calculator-key" onClick={() => writeDigit("7")}>
          7
        </button>
        <button type="button" className="calculator-key" onClick={() => writeDigit("8")}>
          8
        </button>
        <button type="button" className="calculator-key" onClick={() => writeDigit("9")}>
          9
        </button>
        <button
          type="button"
          className="calculator-key calculator-operator"
          onClick={() => chooseOperator("-")}
        >
          −
        </button>

        <button type="button" className="calculator-key" onClick={() => writeDigit("4")}>
          4
        </button>
        <button type="button" className="calculator-key" onClick={() => writeDigit("5")}>
          5
        </button>
        <button type="button" className="calculator-key" onClick={() => writeDigit("6")}>
          6
        </button>
        <button
          type="button"
          className="calculator-key calculator-operator"
          onClick={() => chooseOperator("+")}
        >
          +
        </button>

        <button type="button" className="calculator-key" onClick={() => writeDigit("1")}>
          1
        </button>
        <button type="button" className="calculator-key" onClick={() => writeDigit("2")}>
          2
        </button>
        <button type="button" className="calculator-key" onClick={() => writeDigit("3")}>
          3
        </button>
        <button type="button" className="calculator-key calculator-equals" onClick={calculate}>
          =
        </button>

        <button type="button" className="calculator-key" onClick={writeDoubleZero}>
          00
        </button>
        <button type="button" className="calculator-key" onClick={() => writeDigit("0")}>
          0
        </button>
        <button type="button" className="calculator-key" onClick={writeDot}>
          .
        </button>
      </div>

      <button type="button" className="calculator-back" onClick={onBack}>
        Back
      </button>
    </div>
  );
}

export default Calculator;
