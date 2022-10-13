import React, { useState, useCallback } from "react";
import { ProjectList } from "../components/ProjectList";
import { CurrentPost } from "../components/CurrentPost";
import { PageBody } from "../components/PageBody";
import { getPost } from "../utils/Posts";
import useFitText from "use-fit-text";
import headerStyle from "../styles/headers.module.css";

// function Example() {

//     return (
//         <div ref={ref} style={{ fontSize, height: 40, width: 100 }}>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//       </div>
//     );
// }

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

    const onStart = useCallback(() => {
        console.log("Example 3 resizing started");
    }, []);
    const onFinish = useCallback((fontSize) => {
        console.log("Example 3 resizing finished", fontSize);
    }, []);
    const { fontSize, ref } = useFitText({ maxFontSize: 100, onStart, onFinish });


    // Returns jsx which is evaluated by React into renderable HTML for the browser.
    return (
        <div>
            {/* Main page content, visible on page load / when showModal prop in CurrentPost = false. */}
            <PageBody>
                <h1
                    className={headerStyle.projectPageHeader}
                >
                    <div ref={ref}
                        style={{ fontSize, width: "100%" }}
                    >
                        Projects
                    </div>
                </h1>
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

export default ProjectPage;