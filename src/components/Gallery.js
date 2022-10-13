import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';

// Essentially just a wrapper around a bootstrap image component, but more complex behaviour can be implemented here.
export function Gallery({ imgs, imgIdx }) {
    return (<div style={{ textAlign: "center" }}><Image src={imgs[imgIdx]} rounded></Image></div>)
}

// Dynamically sized carousels 
export function ControlledCarousel(props) {

    // TODO: Pass props containing labels & captions

    const prepareSlides = (imgs) => {
        return (
            <Carousel.Item style={{ minHeight: "45rem" }}>
                <Image
                    className="d-block w-100"
                    src={imgs}
                    alt="First slide"
                    rounded
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
        )
    }

    return (
        <Carousel >
            {props.imgs.map(prepareSlides)}
        </Carousel>
    );
}