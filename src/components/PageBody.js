// Wrap a component in the PageBody tag to render it within a consistent central column layout.
// see AboutPage.js & ProjectPage.js for in use example.

export function PageBody({ children }) {
    return (<div className="mx-auto" style={{ width: "65%", paddingTop: "40px" }}>{children}</div >);
}
