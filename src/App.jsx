import { useState } from "react";
import Login from "./components/Login.jsx";
import Menu from "./components/Menu.jsx";
import Sum from "./components/Sum.jsx";
import Calculator from "./components/Calculator.jsx";
import Api from "./components/Api.jsx";
import Form from "./components/Form.jsx";

function App() {
  const [screen, setScreen] = useState("login");

  // Navigate from the menu
  function handleNavigate(destination) {
    setScreen(destination);
  }

  // Return to login
  function handleLogout() {
    setScreen("login");
  }

  // Return to menu from any screen
  function handleBack() {
    setScreen("menu");
  }

  // Simple conditional rendering
  if (screen === "login") {
    return <Login onLogin={() => setScreen("menu")} />;
  }

  if (screen === "menu") {
    return <Menu onNavigate={handleNavigate} onLogout={handleLogout} />;
  }

  if (screen === "sum") {
    return <Sum onBack={handleBack} />;
  }

  if (screen === "calculator") {
    return <Calculator onBack={handleBack} />;
  }

  if (screen === "api") {
    return <Api onBack={handleBack} />;
  }

  if (screen === "form") {
    return <Form onBack={handleBack} />;
  }

  return null;
}

export default App;