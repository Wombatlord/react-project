import { Row, Col, Stack, Container } from "react-bootstrap";
import styles from "../styles/projectList.module.css"

export function ProjectList({ items, clickHandlers }) {
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

export const MarkdownItem = ({ item, clickHandler, left }) => {
    /* Content formatting for ProjectPage content rendered into the PageBody component.
    Creates a vertical stack with alternating alignment on h2 & synopsis elements.
    h2s & synposes are held in their own horizontal stack component, embedded into the larger vertical stack.
    Attaches the clickHandler passed as a prop from ProjectPage component to the h2 elements.
    The left prop from renderListEntry determines which class name is assigned for styling & layout purposes. */

    return (
        <Stack gap={4}>
            <Stack direction="horizontal">
                <h2 className={(left ? "" : "ms-auto ") + (left ? styles.projectTitleLeft : styles.projectTitleRight)} onClick={clickHandler}>{item.name}</h2>
            </Stack>
            <Stack direction="horizontal" gap={4}>
                <Synopsis item={item} left={left} />
            </Stack>
        </Stack>
    );
};

export const Synopsis = ({ item, left }) => {
    /* Short project descriptions for display under the clickable project headings.
    inline Style element provides a 5% offset from the edges of the PageBody component.
    Descriptions are a field on the item prop, passed down from the content prop on a route in index.js.
    The content is currently retrieved from content.json, which is populated on build based on raw_content.json. */

    return (
        <p className={(left ? "" : "ms-auto ") + (styles.synopsis)} style={{ paddingInline: "3%", width: "65%" }}>{item.description ? item.description : "No Description More Text More Text More Text"}</p>
    );
};