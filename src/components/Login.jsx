import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // Validate empty fields
    if (username.trim() === "" || password.trim() === "") {
      setError("Username and password are required");
      return;
    }

    // Validate demo credentials
    if (username === "admin" && password === "1234") {
      setError("");
      onLogin();
    } else {
      setError("Incorrect username or password");
    }
  }

  return (
    <form className="login-panel" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {error !== "" && <p className="login-error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;