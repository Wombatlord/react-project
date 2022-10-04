import React, { useState } from "react";
import { Collapse, Container, Row, Col, Stack } from "react-bootstrap";
import Modal from "./Modal/Modal";
import { PageBody } from "./util"
import { RenderedMarkdown } from "./converter";
import { getPost } from "./Posts"

const defaultItem = () => ({ heading: "", sections: [] })

function ProjectPage({ content }) {
    // these state variables control whether the project page shows the item in the modal
    let [show, setShow] = useState(false);
    let [item, setItem] = useState(defaultItem());

    // this function maps the post index to a click handler that sets the item with the return value from getPost
    // and sets show = true.
    const handlers = (idx) => () => {
        setItem(getPost(idx));
        setShow(true);
    }

    return (
        <div>
            <PageBody>
                <h1
                    className="projectPageHeader"
                >Projects</h1>
                <ProjectList
                    items={content}
                    clickHandlers={handlers}
                ></ProjectList>
            </PageBody>

            <CurrentPost
                showModal={show}
                setShow={setShow}
                post={item}
            >
            </CurrentPost>
        </div>
    )
}

// Collapsible is wrapper that encloses the passed children in a fold-away container, toggles on click
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

// This allows various ways to present the content of a post section depending on the syntax
const renderFuncs = {
    markdown: (inner) => <RenderedMarkdown Markdown={inner}></RenderedMarkdown>,
    default: (inner) => inner,
}

function CurrentPost(props) {
    // this function returns the jsx for a single section of a post
    const renderSection = (section, key) => {
        const sectionContent = renderFuncs[section.syntax](section.content)
        return (<PostSection heading={section.heading} key={key} content={sectionContent} ></PostSection>)
    }

    return (
        <>
            {props.post.sections.length &&
                (
                    <Modal
                        show={props.showModal}
                        setShow={props.setShow}
                        heading={props.post.heading}
                    >
                        {props.post.sections.map(renderSection)}
                    </Modal>
                )
            }
        </>
    )
}

function ProjectList({ items, clickHandlers }) {
    // this function returns the jsx for an item in the projects list.
    const renderListEntry = (item, index) => (
        <Row key={index}>
            <MarkdownItem
                item={item}
                clickHandler={clickHandlers(index)}
                left={(index % 2 === 0)}
            />
        </Row>
    )

    return (
        <Container className="mdItem">
            <Col>{items.map(renderListEntry)}</Col>
        </Container>
    );
}


function PostSection({ heading, content }) {
    return (<Collapsible title={heading}>{content}</Collapsible>)
}

const MarkdownItem = ({ item, clickHandler, left }) => {
    return (
        <Stack gap={4}>
            <Stack direction="horizontal">
                <h2 className={(left ? "" : "ms-auto ") + (left ? "projectTitleLeft" : "projectTitleRight")} onClick={clickHandler}>{item.name}</h2>
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