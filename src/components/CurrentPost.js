import { RenderedMarkdown } from "./RenderedMarkdown"
import { PostSection } from "./Collapsible"
import { Modal } from "./Modal"
import { Gallery } from "./Gallery"

// This allows various ways to present the content of a post section depending on the attached syntax field.
// Attach components to fields here to extend the available rendering components which wrap different content formats. 
const renderFuncs = {
    default: (inner) => inner,
    markdown: (inner) => <RenderedMarkdown Markdown={inner}></RenderedMarkdown>,
    image: (inner) => <Gallery imgs={inner} imgIdx={0}/>
}

export function CurrentPost(props) {
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