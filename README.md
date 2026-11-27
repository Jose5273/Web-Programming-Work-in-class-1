# Web-Programming-Work-in-class-1

First React application: a small educational web app with six screens
(Login, Menu, Sum, Calculator, API and Form), built with React, Vite,
JavaScript (JSX) and basic CSS.

## Requirements

- Node.js and npm
- Internet connection (only for the API screen)

## How to run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

Other commands:

```bash
npm run build    # production build in dist/
npm run preview  # serve the production build
npm run lint     # check the code with oxlint
```

## Demo credentials

- Username: `admin`
- Password: `1234`

This is a local simulation only; credentials are not sent or stored.

## Screens

| Screen     | What it does |
|------------|--------------|
| Login      | Validates the demo credentials and opens the menu. |
| Menu       | Buttons for Sum, Calculator, API and Form, plus Logout. |
| Sum        | Adds two numbers and shows the result. |
| Calculator | Basic calculator (+, -, ×, ÷) with C, DEL, 00 and decimal point. |
| API        | Loads 30 products from [DummyJSON](https://dummyjson.com/docs/products) and filters them by title. |
| Form       | Form with validation (name, email, terms), clear button and simulated submit. |

Navigation is handled with React state in `App.jsx` (no router).
Reloading the page always returns to the Login screen.

## Project structure

```
index.html
package.json
vite.config.js
public/
src/
  main.jsx
  App.jsx
  App.css
  components/
    Login.jsx
    Menu.jsx
    Sum.jsx          Sum.css
    Calculator.jsx   Calculator.css
    Api.jsx          Api.css
    Form.jsx         Form.css
```

## Team responsibilities

| Member   | Files |
|----------|-------|
| Member 1 | `main.jsx`, `App.jsx`, `App.css`, `Login.jsx`, `Menu.jsx`, Vite setup |
| Member 2 | `Sum.jsx`, `Sum.css`, `Calculator.jsx`, `Calculator.css` |
| Member 3 | `Api.jsx`, `Api.css`, `Form.jsx`, `Form.css` |
