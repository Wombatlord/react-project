import { useState } from "react";
import { Collapse } from "react-bootstrap";

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

export function PostSection({ heading, content }) {
    // This component returns a collapsible item where the title toggles the collapse and the content is the child element
    // which is displayed / hidden.
    return (<Collapsible title={heading}>{content}</Collapsible>)
}