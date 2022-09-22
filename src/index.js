import React from "react";
import ReactDOM from "react-dom/client";
import ReactMarkdown from "react-markdown";
import Modal from "./Modal/Modal";
import content from "./content.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import all from "./assets/raw_content.json";
import remarkGfm from "remark-gfm";
import HTML2down from "./converter";

console.log(content);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: content,
      modalContent: "",
      showModal: false,
      modalFragment: this.makeFragment({ markdown: "" }),
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
      console.log(e);
      this.setState({
        modalContent: all[name],
        modalFragment: this.makeFragment({ markdown: all[name] }),
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

  getMarkdownFragment() {
    return this.makeFragment({ markdown: this.state.modalContent });
  }
  makeFragment({ markdown }) {
    return (
      <React.Fragment>
        <MarkdownView markdown={markdown} />
      </React.Fragment>
    );
  }

  setMarkdownFragment(md) {
    this.setState({ modalFragment: md });
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
          <ReHyped
            content={this.state.modalFragment}
            setContent={(frag) => this.setMarkdownFragment(frag)}
          />
        </Modal>
      </div>
    );
  }
}

const ReHyped = ({ Content, setContent }) => {
  return <HTML2down Content={Content} setContent={setContent} />;
};

const MarkdownItem = ({ item, onClick }) => {
  return <li onClick={onClick}>{item.name}</li>;
};

const MarkdownView = (props) => {
  return (
    <div className="markdown-view">
      <ReactMarkdown
        children={props.markdown ? props.markdown : "No markdown to display"}
        remarkPlugins={[remarkGfm]}
      ></ReactMarkdown>
    </div>
  );
};

// ========================================
// This is the application bootstrap
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
