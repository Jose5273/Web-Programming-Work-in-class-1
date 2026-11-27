import { useState } from "react";
import "./Form.css";

function Form({ onBack }) {
  // One state for each form field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [interests, setInterests] = useState([]);
  const [comments, setComments] = useState("");
  const [terms, setTerms] = useState(false);

  // State for the error messages and the confirmation
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Add or remove an interest from the list
  function handleInterest(event) {
    const value = event.target.value;
    if (event.target.checked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter((item) => item !== value));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};
    if (name.trim() === "") {
      newErrors.name = "This field is required";
    }
    // Simple email check: text@text.text
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!terms) {
      newErrors.terms = "You must accept the terms";
    }

    setErrors(newErrors);

    // If there are no errors, show the confirmation (nothing is sent to a server)
    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }

  // Reset everything to the initial values
  function handleClear() {
    setName("");
    setEmail("");
    setGender("");
    setCountry("");
    setInterests([]);
    setComments("");
    setTerms(false);
    setErrors({});
    setSuccess(false);
  }

  return (
    <div className="form-page">
      <button className="form-back" onClick={() => onBack()}>
        Back
      </button>

      <h2>Form</h2>

      <form className="form-panel" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {errors.name && <p className="form-error">{errors.name}</p>}

        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors.email && <p className="form-error">{errors.email}</p>}

        <label>Gender</label>
        <div className="form-options">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={gender === "Male"}
              onChange={(event) => setGender(event.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={gender === "Female"}
              onChange={(event) => setGender(event.target.value)}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={gender === "Other"}
              onChange={(event) => setGender(event.target.value)}
            />
            Other
          </label>
        </div>

        <label>Country</label>
        <select
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        >
          <option value="">Select an option</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Colombia">Colombia</option>
          <option value="Peru">Peru</option>
          <option value="Other">Other</option>
        </select>

        <label>Interests</label>
        <div className="form-interests">
          <label>
            <input
              type="checkbox"
              value="Sports"
              checked={interests.includes("Sports")}
              onChange={handleInterest}
            />
            Sports
          </label>
          <label>
            <input
              type="checkbox"
              value="Music"
              checked={interests.includes("Music")}
              onChange={handleInterest}
            />
            Music
          </label>
          <label>
            <input
              type="checkbox"
              value="Technology"
              checked={interests.includes("Technology")}
              onChange={handleInterest}
            />
            Technology
          </label>
          <label>
            <input
              type="checkbox"
              value="Reading"
              checked={interests.includes("Reading")}
              onChange={handleInterest}
            />
            Reading
          </label>
        </div>

        <label>Comments</label>
        <textarea
          rows="3"
          maxLength={200}
          value={comments}
          onChange={(event) => setComments(event.target.value)}
        />
        <p className="form-counter">{comments.length}/200</p>

        <label>
          <input
            type="checkbox"
            checked={terms}
            onChange={(event) => setTerms(event.target.checked)}
          />
          I accept the terms and conditions
        </label>
        {errors.terms && <p className="form-error">{errors.terms}</p>}

        {success && (
          <p className="form-success">Form submitted successfully.</p>
        )}

        <div className="form-buttons">
          <button type="button" className="form-clear" onClick={handleClear}>
            Clear
          </button>
          <button type="submit" className="form-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
