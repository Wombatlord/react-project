import React, { useState } from "react";

import ReactDOM from "react-dom/client";

import MyNavBar from "./Navbar/navbar"
import content from "./content.json";
import rawContent from "./assets/raw_content.json";
import ProjectPage from "./ProjectPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

console.log(content);


function App() {
  return (
    <div className="App">
      <div>
        <MyNavBar gitLink={"https://github.com/Wombatlord"} />
      </div>
      <Routes>
        <Route path="/" element={<ModalDeepLink showModal={false} />} />
        <Route path="/about" element={<p>about placeholder</p>} />
        <Route path="/contact" element={<p>contact placeholder</p>} />
        <Route path="/show/project/:id" element={<ModalDeepLink showModal={true} />} />
      </Routes>
    </div>
  );
}

// getPost pulls the post content from the raw_content.json by the post id.
const getPost = (postId) => {
  // Here we can access assets/raw_content.json to inject the item sections into the project page as a prop

  if (typeof postId !== 'string') {
    return { currentItem: { heading: "", sections: [] } }
  }

  console.log("postId", typeof postId)
  console.log("getPost Called")

  const newModalContent = rawContent[postId];
  const modalProps = {
    currentItem: {
      heading: newModalContent.name,
      sections: [
        {
          heading: "Readme.md",
          syntax: "markdown",
          content: newModalContent.raw,
        },
        {
          heading: "other",
          content: "text"
        }
      ],
    }
  }
  console.log("modalProps", modalProps)
  return modalProps
}

/*
let preferredSyntax = (<ModalDeepLink prop1={1} prop2={"2"}><p id="child1"><p id="child2"></ModalDeepLink>)

let technicallyCorrectClassSyntax = (new ModalDeepLink({prop1: 1, prop2: "2", children:[<p id="child1">, <p id="child2">]})).render()

let technicallyCorrectFunctionSyntax = ModalDeepLink({prop1: 1, prop2: "2", children:[<p id="child1">, <p id="child2">]})

assert preferredSytax === technicallyCorrectSyntax
*/
function ModalDeepLink({ showModal }) {
  // url path paramater access
  let { id } = useParams();
  console.log("id", typeof id);

  const item = getPost(id).currentItem;

  const [show, setShow] = useState(showModal);

  console.log("showModal", showModal);
  console.log("ModalDeepLink", item);
  return (
    <ProjectPage show={show} setShow={setShow} currentItem={item} content={content} />
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
