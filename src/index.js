import React, { useState } from "react";
import { Collapse, Container, Row, Col, Stack } from "react-bootstrap";
import ReactDOM from "react-dom/client";
import Modal from "./Modal/Modal";
import MyNavBar from "./Navbar/navbar"
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
      gitLink: "https://github.com/Wombatlord",
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
      console.log("fetchContent called with", index);

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
        <div>
          <MyNavBar gitLink={this.state.gitLink}></MyNavBar>
        </div>
        <PageBody>
          <h1 className="markdownViewer">Projects</h1>
          <ProjectList items={this.state.content} clickHandlers={this.fetchContent.bind(this)}>
          </ProjectList>
        </PageBody>
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

function PostSection({ heading, content }) {
  return (<Collapsible title={heading}>{content}</Collapsible>)
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

function ProjectList({ items, clickHandlers }) {
  return (
    <Container
      className="mdItem"
    >
      <Col>{
        items.map((item, index) => (
          <Row>
            <MarkdownItem
              key={index}
              item={item}
              onClick={clickHandlers(index)}
              left={(index % 2 === 0)}
            />
          </Row>
        ))}</Col>
    </Container>
  );
}

function PageBody({ children }) {
  return (<div className="mx-auto" style={{ width: "65%" }}>{children}</div >);
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

const MarkdownItem = ({ item, onClick, left }) => {
  return (
    <Stack gap={4}>
      <Stack direction="horizontal">
          <h2 className={(left ? "" : "ms-auto ") + (left ? "projectTitleLeft" :"projectTitleRight") } onClick={onClick}>{item.name}</h2>
      </Stack>
      <Stack direction="horizontal" gap={4}>
        <Synopsis item={item} left={left} />
      </Stack>
    </Stack>
  );
};

const Synopsis = ({ item, left }) => {
  return (
    <p className={left ? "" : "ms-auto"} style={{paddingInline: "5%"}}>{item.description ? item.description : "No Description More Text More Text More Text"}</p>
  );
};

// ========================================
// This is the application bootstrap
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
