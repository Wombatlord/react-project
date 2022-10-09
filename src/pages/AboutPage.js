import { PageBody } from "../components/PageBody";
import { RenderText } from "../components/RenderText"
import styles from "../styles/headers.module.css"

// Scaffold for content at /about endpoint.
function AboutPage({ content }) {
    return (
        <div>
            <PageBody>
                <h1
                    className={styles.aboutPageHeader}
                >About</h1>
                <RenderText textToRender={content} />
            </PageBody>
        </div>
    );
}

export default AboutPage;