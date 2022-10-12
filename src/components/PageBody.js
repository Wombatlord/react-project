// Wrap a component in the PageBody tag to render it within a consistent central column layout.
// see AboutPage.js & ProjectPage.js for in use example.

export function PageBody({ children }) {
    return (<div className="mx-auto" style={{ width: "75%", paddingTop: "50px" }}>{children}</div >);
}
