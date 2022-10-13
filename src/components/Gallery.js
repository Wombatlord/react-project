import Image from 'react-bootstrap/Image';

// Essentially just a wrapper around a bootstrap image component, but more complex behaviour can be implemented here.
export function Gallery({ imgs, imgIdx }) {
    return (<div style={{textAlign: "center"}}><Image src={imgs[imgIdx]} rounded></Image></div>)
}