import React, { useState } from "react";
import { Collapse, Container, Row, Col, Stack } from "react-bootstrap";
import Modal from "./Modal/Modal";
import { PageBody } from "./util"
import { RenderedMarkdown } from "./converter";
import { getPost } from "./Posts"

// defaultItem is the state of a trvial item with no content.
// Ensures the useState hook has a default empty state to populate when calling setItem.
// Also means that if an item fails to load, it will show as an empty item in the console rather than the nebulous "undefined" value.
const defaultItem = () => ({ heading: "", sections: [] })

function ProjectPage({ content }) {
    /* ProjectPage is the page body content for project history headings & short descriptions.
    ProjectList items (specifically headings) have an attached clickHandler which displays a modal.
    Modal display & content retrieval is handled by useState (setShow, setItem) hooks at this level.
    The actual content is passed in as props through the route at the top level in index.js. */
    
    // these state variables control whether the project page shows the item in the modal.
    let [show, setShow] = useState(false);
    let [item, setItem] = useState(defaultItem());

    /* Handlers maps the post index to a click handler that sets the item with the return value from getPost.
    Then sets show = true to trigger display of the modal.
    Passed into the items prop in PageBody. */
    const handlers = (index) => () => {
        setItem(getPost(index));
        setShow(true);
    }

    // Returns jsx which is evaluated by React into renderable HTML for the browser.
    return (
        <div>
            {/* Main page content, visible on page load / when showModal prop in CurrentPost = false. */}
            <PageBody>
                <h1
                    className="projectPageHeader"
                >Projects</h1>
                <ProjectList
                    items={content}
                    clickHandlers={handlers}
                ></ProjectList>
            </PageBody>

            {/* Modal content, visibility based on the state of show, controlled by the useState hooks called in Handlers above*/}
            <CurrentPost
                showModal={show}
                setShow={setShow}
                post={item}
            >
            </CurrentPost>
        </div>
    )
}

function Collapsible({ children, title }) {
    // Collapsible is wrapper that encloses the passed children in a fold-away container, toggles on click.
    const [open, setOpen] = useState(false);

    return (
        <div onClick={() => setOpen(!open)} >
            <h3 style={{paddingLeft: "0"}}>{title ? title : "No Title."}</h3>
            <Collapse in={open}>
                <div id="testing collapse" style={{textAlign: "left"}}>
                    {children}
                </div>
            </Collapse>
        </div>
    )
}

// This allows various ways to present the content of a post section depending on the attached syntax field.
// Attach components to fields here to extend the available rendering components which wrap different content formats. 
const renderFuncs = {
    default: (inner) => inner,
    markdown: (inner) => <RenderedMarkdown Markdown={inner}></RenderedMarkdown>,
}

function PostSection({ heading, content }) {
    // This component returns a collapsible item where the title toggles the collapse and the content is the child element
    // which is displayed / hidden.
    return (<Collapsible title={heading}>{content}</Collapsible>)
}

function CurrentPost(props) {
    // CurrentPost is a component which encapsulates the composition of a modal with its content.
    // renderSection injects a specific section in the modal with the appropriate content, wrapped in a PostSection component.
    const renderSection = (section, key) => {
        const sectionContent = renderFuncs[section.syntax](section.content)
        return (<PostSection heading={section.heading} key={key} content={sectionContent} ></PostSection>)
    }

    // returns jsx with modal state & content passed in from above as props and attached to the Modal component props.
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
    // ProjectList is the default view of the ProjectPage component when modal is hidden.
    // left prop is used to track alternating elements and allow styling based on that alternation.
    const renderListEntry = (item, index) => (
        <Row key={index}>
            <MarkdownItem
                item={item}
                clickHandler={clickHandlers(index)}
                left={(index % 2 === 0)}
            />
        </Row>
    )
    
    // returns a mapping of items to columns with attached content, clickHandler, and value for left prop.
    return (
        <Container className="mdItem">
            <Col>{items.map(renderListEntry)}</Col>
        </Container>
    );
}

const MarkdownItem = ({ item, clickHandler, left }) => {
    /* Content formatting for ProjectPage content rendered into the PageBody component.
    Creates a vertical stack with alternating alignment on h2 & synopsis elements.
    h2s & synposes are held in their own horizontal stack component, embedded into the larger vertical stack.
    Attaches the clickHandler passed as a prop from ProjectPage component to the h2 elements.
    The left prop from renderListEntry determines which class name is assigned for styling & layout purposes. */
    
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
    /* Short project descriptions for display under the clickable project headings.
    inline Style element provides a 5% offset from the edges of the PageBody component.
    Descriptions are a field on the item prop, passed down from the content prop on a route in index.js.
    The content is currently retrieved from content.json, which is populated on build based on raw_content.json. */

    return (
        <p className={(left ? "" : "ms-auto ") + "synopsis"} style={{ paddingInline: "3%", width: "65%" }}>{item.description ? item.description : "No Description More Text More Text More Text"}</p>
    );
};

export default ProjectPage;