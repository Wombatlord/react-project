import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';

// Dynamically sized carousels 
export function ControlledCarousel(props) {

    const prepareSlides = ({ source, caption, title }, index) => {
        // Decompose the images object array,
        // Pass & interpolate props to compose an image with corresponding title & caption
        return (
            <Carousel.Item
                key={index}>
                <Image
                    className="img-responsive w-100"
                    src={source}
                    alt="First slide"
                    rounded
                    fluid
                    style={{ maxHeight: "37vw", maxWidth: "100vw", }}
                />
                <Carousel.Caption>
                    <h3>{title}</h3>
                    <p>{caption}</p>
                </Carousel.Caption>
            </Carousel.Item>
        )
    }

    return (
        <div>
            <p style={{ fontSize: "1em" }}>To see original unscaled images, please use right click, open image.</p>
            <Carousel interval={null}>
                {props.images.map(prepareSlides)}
            </Carousel>
        </div>
    );
}