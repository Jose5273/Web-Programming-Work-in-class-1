function Menu({ onNavigate, onLogout }) {
  return (
    <div className="menu-panel">
      <h2>Menu</h2>
      <button onClick={() => onNavigate("sum")}>Sum</button>
      <button onClick={() => onNavigate("calculator")}>Calculator</button>
      <button onClick={() => onNavigate("api")}>API</button>
      <button onClick={() => onNavigate("form")}>Form</button>
      <button className="menu-logout" onClick={() => onLogout()}>
        Logout
      </button>
    </div>
  );
}

export default Menu;