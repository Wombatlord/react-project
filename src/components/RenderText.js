export function RenderText({ textToRender }) {
    const getText = (item) => (item.aboutContent);

    return (<p style={{ paddingLeft: "5%", width: "80%" }}>{textToRender.map(getText)}</p>);
}