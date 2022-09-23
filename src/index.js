import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import ReactDOM from "react-dom/client";
import Modal from "./Modal/Modal";
import content from "./content.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import all from "./assets/raw_content.json";
import { RenderedMarkdown } from "./converter";

console.log(content);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: content,
      modalContent: "",
      showModal: false,
      currentItem: {
        heading: "",
        sections: [],
      }
    };
  }

  setCurrentItem(item) {
    this.setState({ currentItem: item });
  }

  toggleModal() {
    const current = this.state.showModal;
    this.setState({ showModal: current ? this.hideModal() : this.showModal() });
  }

  showModal() {
    this.setState({ showModal: true });
  }

  fetchContent(index) {
    return (e) => {
       const newModalContent = all[index]

      this.setState({
        modalContent: newModalContent.raw,
        currentItem: {
          heading: newModalContent.name,
          sections: [{
            heading: "Readme.md",
            content: <RenderedMarkdown Markdown={newModalContent.raw}></RenderedMarkdown>,
          },
          {
            heading: "other",
            content: "text"
          }],
        }
      });
      this.showModal();
    };
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  setShowModal(flag) {
    this.setState({ showModal: flag });
  }

  render() {
    return (
      <div className="App">
        <h1>Markdown Viewer</h1>
        <div>
          {this.state.content.map((item, index) => (
            <MarkdownItem
              key={index}
              item={item}
              onClick={this.fetchContent(index)}
            />
          ))}
        </div>
        <CurrentPost
          show={this.state.showModal}
          onHide={this.hideModal.bind(this)}
          setShow={this.setShowModal.bind(this)}
          heading={this.state.currentItem.heading}
          sections={this.state.currentItem.sections}
        >
        </CurrentPost>
      </div>
    );
  }
}

function PostSection({ heading, content, key }) {
  return (<Collapsible key={key} title={heading}>{content}</Collapsible>)
}


function CurrentPost(props) {
  return (<><Modal
    show={props.show}
    onHide={props.onHide}
    setShow={props.setShow}
    heading={props.heading}
  >
    {
      props.sections.map(
        (section, key) => (<PostSection heading={section.heading} key={key} content={section.content} ></PostSection>)
      )
    }
  </Modal>
  </>
  )
}

function Collapsible({ children, title }) {
  const [open, setOpen] = useState(false);

  return (
    <div onClick={() => setOpen(!open)} >
      <h3>{title ? title : "No Title."}</h3>
      <Collapse in={open}>
        <div id="testing collapse">
          {children}
        </div>
      </Collapse>
    </div>
  )
}

const MarkdownItem = ({ item, onClick }) => {
  return (<div onClick={onClick}>
    <h2>{item.name}</h2>
    <p>lorem ipsum</p>
    <p>test test test</p>
  </div>
  );
};

// ========================================
// This is the application bootstrap
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
