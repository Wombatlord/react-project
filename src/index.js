import React, { useState } from "react";

import ReactDOM from "react-dom/client";

import MyNavBar from "./Navbar/navbar"
import content from "./content.json";
import ProjectPage from "./ProjectPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

console.log(content);


function App() {
    const params = useParams();
    return (
      <div className="App">
        <div>
          <MyNavBar gitLink={"https://github.com/Wombatlord"}></MyNavBar>
        </div>
        <Routes>
          <Route path="/" element={<ProjectPage />} />
          <Route path="/show/project/:id" element={<ModalDeepLink id={params.id} />} />
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
function ModalDeepLink({id}) {

  // Here we can access assets/raw_content.json to inject the item sections into the project page as a prop

  return (
    <ProjectPage showModal={true} currentItem={{heading: "", sections: []}} />
  )
}

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
