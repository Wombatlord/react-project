import React from "react";
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
    };
  }

  toggleModal() {
    const current = this.state.showModal;
    this.setState({ showModal: current ? this.hideModal() : this.showModal() });
  }

  showModal() {
    this.setState({ showModal: true });
  }

  fetchContent(name) {
    return (e) => {
      this.setState({
        modalContent: all[name],
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
        <ul>
          {this.state.content.map((item, index) => (
            <MarkdownItem
              key={index}
              item={item}
              onClick={this.fetchContent(item.name)}
            />
          ))}
        </ul>
        <Modal
          show={this.state.showModal}
          onHide={this.hideModal.bind(this)}
          setShow={this.setShowModal.bind(this)}
        >
          <RenderedMarkdown Markdown={this.state.modalContent} />
        </Modal>
      </div>
    );
  }
}

const MarkdownItem = ({ item, onClick }) => {
  return <li onClick={onClick}>{item.name}</li>;
};

// ========================================
// This is the application bootstrap
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
