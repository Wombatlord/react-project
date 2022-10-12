import { PageBody } from "../components/PageBody";
import { RenderedMarkdown } from "../components/RenderedMarkdown";
import styles from "../styles/headers.module.css"

// Scaffold for content at /about endpoint.
function AboutPage({ content }) {
    return (
        <div>
            <PageBody>
                <h1
                    className={styles.aboutHeader}
                >About</h1>
                <RenderedMarkdown Markdown={content[0].raw} />
            </PageBody>
        </div>
    );
}

export default AboutPage;