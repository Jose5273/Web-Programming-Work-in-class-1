import { useState } from "react";
import "./Sum.css";

function Sum({ onBack }) {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // First, check that both fields have a value.
    if (num1.trim() === "" || num2.trim() === "") {
      setError("Both numbers are required.");
      setResult("");
      return;
    }

    // Convert the input text to numbers and add them.
    const total = Number(num1) + Number(num2);
    setResult(total);
    setError("");
  }

  return (
    <div className="sum-panel">
      <form className="sum-form" onSubmit={handleSubmit}>
        <div className="sum-inputs">
          <input
            type="number"
            placeholder="num1"
            aria-label="num1"
            value={num1}
            onChange={(event) => {
              setNum1(event.target.value);
              setError("");
            }}
          />
          <input
            type="number"
            placeholder="num2"
            aria-label="num2"
            value={num2}
            onChange={(event) => {
              setNum2(event.target.value);
              setError("");
            }}
          />
        </div>

        <div className="sum-result-row">
          <input
            type="text"
            className="sum-result"
            placeholder="Result"
            aria-label="Result"
            value={result}
            readOnly
          />
          <button type="submit" className="sum-button">
            Sum
          </button>
        </div>

        {error !== "" && <p className="sum-error">{error}</p>}
      </form>

      <button type="button" className="sum-back" onClick={onBack}>
        Back
      </button>
    </div>
  );
}

export default Sum;
