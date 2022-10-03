import React, { useState } from "react";
import { Collapse, Container, Row, Col, Stack } from "react-bootstrap";
import Modal from "./Modal/Modal";
import content from "./content.json";
import all from "./assets/raw_content.json";
import { RenderedMarkdown } from "./converter";
import { useNavigate } from "react-router-dom";

function ProjectPage(props) {
    const { show, setShow, content } = props;
    let {currentItem} = props;

    if (!currentItem) {
        currentItem = { heading: "", sections: [] }
    }
 
    const navigate = useNavigate();
    const handlers = (idx) => () => navigate(`/show/project/${idx}`);


    return (
        <div>
            <PageBody>
                <h1
                    className="markdownViewer"
                >Projects</h1>
                <ProjectList
                    items={content}
                    clickHandlers={handlers}
                ></ProjectList>
            </PageBody>

            <CurrentPost
                showModal={show}
                setShow={setShow}
                heading={currentItem.heading}
                sections={currentItem.sections}
            >
            </CurrentPost>
        </div>
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

function CurrentPost(props) {
    return (
        <>
            {
                props.sections.length === 0 ? "" : (
                    <Modal
                        show={props.show}
                        setShow={props.setShow}
                        heading={props.heading}
                    >
                        {
                            props.sections.map(
                                (section, key) => {
                                    const sectionContent = section.syntax === "markdown"
                                        ? <RenderedMarkdown Markdown={section.content}></RenderedMarkdown>
                                        : section.content;


                                    return (<PostSection heading={section.heading} key={key} content={sectionContent} ></PostSection>)
                                }
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