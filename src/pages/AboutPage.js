import { PageBody } from "../components/PageBody";

// Scaffold for content at /about endpoint.
function AboutPage({ content }) {
    return (
        <div>
            <PageBody>
                <h1
                    className="aboutHeader"
                >About</h1>
                <RenderText textToRender={content} />
            </PageBody>
        </div>
    );
}

function RenderText({ textToRender }) {
    const getText = (item) => (item.aboutContent);

    return (<p style={{ paddingLeft: "5%", width: "80%" }}>{textToRender.map(getText)}</p>);
}

export default AboutPage;