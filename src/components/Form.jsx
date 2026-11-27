import { useState } from "react";
import "./Form.css";

function Form({ onBack }) {
  // Un estado para cada campo del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [interests, setInterests] = useState([]);
  const [comments, setComments] = useState("");
  const [terms, setTerms] = useState(false);

  // Estados para los errores y la confirmación
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Agrega o quita un interés de la lista
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
      newErrors.name = "Este campo es obligatorio";
    }
    // Correo sencillo: texto@texto.texto
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newErrors.email = "Ingresa un correo válido";
    }
    if (!terms) {
      newErrors.terms = "Debes aceptar los términos";
    }

    setErrors(newErrors);

    // Si no hay errores, mostramos la confirmación (no se envía a ningún servidor)
    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }

  // Deja todo como al inicio
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

      <h2>Formulario</h2>

      <form className="form-panel" onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {errors.name && <p className="form-error">{errors.name}</p>}

        <label>Correo electrónico</label>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors.email && <p className="form-error">{errors.email}</p>}

        <label>Género</label>
        <div className="form-options">
          <label>
            <input
              type="radio"
              name="gender"
              value="Masculino"
              checked={gender === "Masculino"}
              onChange={(event) => setGender(event.target.value)}
            />
            Masculino
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Femenino"
              checked={gender === "Femenino"}
              onChange={(event) => setGender(event.target.value)}
            />
            Femenino
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Otro"
              checked={gender === "Otro"}
              onChange={(event) => setGender(event.target.value)}
            />
            Otro
          </label>
        </div>

        <label>País</label>
        <select
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        >
          <option value="">Selecciona una opción</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Colombia">Colombia</option>
          <option value="Perú">Perú</option>
          <option value="Otro">Otro</option>
        </select>

        <label>Intereses</label>
        <div className="form-interests">
          <label>
            <input
              type="checkbox"
              value="Deportes"
              checked={interests.includes("Deportes")}
              onChange={handleInterest}
            />
            Deportes
          </label>
          <label>
            <input
              type="checkbox"
              value="Música"
              checked={interests.includes("Música")}
              onChange={handleInterest}
            />
            Música
          </label>
          <label>
            <input
              type="checkbox"
              value="Tecnología"
              checked={interests.includes("Tecnología")}
              onChange={handleInterest}
            />
            Tecnología
          </label>
          <label>
            <input
              type="checkbox"
              value="Lectura"
              checked={interests.includes("Lectura")}
              onChange={handleInterest}
            />
            Lectura
          </label>
        </div>

        <label>Comentarios</label>
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
          Acepto los términos y condiciones
        </label>
        {errors.terms && <p className="form-error">{errors.terms}</p>}

        {success && (
          <p className="form-success">Formulario enviado correctamente.</p>
        )}

        <div className="form-buttons">
          <button type="button" className="form-clear" onClick={handleClear}>
            Limpiar
          </button>
          <button type="submit" className="form-submit">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
