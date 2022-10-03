import React, { useState } from "react";
import { Collapse, Container, Row, Col, Stack } from "react-bootstrap";
import Modal from "./Modal/Modal";
import content from "./content.json";
import all from "./assets/raw_content.json";
import { RenderedMarkdown } from "./converter";


class ProjectPage extends React.Component {
    constructor(props) {
        super(props);

        // TODO: Remove the current item from the state

        this.state = {
            content: content,
            modalContent: "",
            showModal: props.showModal,
            currentItem: {
                heading: "",
                sections: [],
            }
        };
    }

    componentDidMount() {
        console.log("component did mount called")
        const currentItemNumber = this.props.currentItemNumber;
        if (currentItemNumber != undefined) {
            this.fetchContent(currentItemNumber)
        }
    }

    render() {
        // TODO: For the heading and sections props of current post change this.state to this.props
        return (
            <div>
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
        )
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
        // 
        return (e) => {
            // retrieve the content at the supplied index.
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

function CurrentPost(props) {
    return (
        <>
            {
                props.sections.length === 0 ? "" : (
                    <Modal
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
                )
            }
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
                    <Row key={index}>
                        <MarkdownItem
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

function PostSection({ heading, content }) {
    return (<Collapsible title={heading}>{content}</Collapsible>)
}

const MarkdownItem = ({ item, onClick, left }) => {
    return (
        <Stack gap={4}>
            <Stack direction="horizontal">
                <h2 className={(left ? "" : "ms-auto ") + (left ? "projectTitleLeft" : "projectTitleRight")} onClick={onClick}>{item.name}</h2>
            </Stack>
            <Stack direction="horizontal" gap={4}>
                <Synopsis item={item} left={left} />
            </Stack>
        </Stack>
    );
};

const Synopsis = ({ item, left }) => {
    return (
        <p className={left ? "" : "ms-auto"} style={{ paddingInline: "5%" }}>{item.description ? item.description : "No Description More Text More Text More Text"}</p>
    );
};

export default ProjectPage;