import React from "react";
import ReactDOM from "react-dom/client";
import MyNavBar from "./Navbar/navbar"
import content from "./content.json";
import ProjectPage from "./ProjectPage";
import AboutPage from "./AboutPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// The top level component for the project.
// New routes should be added here with an appropriate path
// Any component included specifically here instead of at an endpoint will render on all pages.
// eg. MyNavBar will currently render above content at all routes.
function App() {
  return (
    <div className="App">
      <div>
        <MyNavBar gitLink={"https://github.com/Wombatlord"} />
      </div>
      <Routes>
        <Route path="/" element={<ProjectPage content={content}/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<p>contact placeholder</p>} />
      </Routes>
    </div>
  );
}

/*
let preferredSyntax = (<ModalDeepLink prop1={1} prop2={"2"}><p id="child1"><p id="child2"></ModalDeepLink>)

let technicallyCorrectClassSyntax = (new ModalDeepLink({prop1: 1, prop2: "2", children:[<p id="child1">, <p id="child2">]})).render()

let technicallyCorrectFunctionSyntax = ModalDeepLink({prop1: 1, prop2: "2", children:[<p id="child1">, <p id="child2">]})

assert preferredSytax === technicallyCorrectSyntax
*/

// ========================================
// This is the application bootstrap
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
