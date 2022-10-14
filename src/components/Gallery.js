import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';

// Dynamically sized carousels 
export function ControlledCarousel(props) {

    const prepareSlides = ({ source, caption, title }, index) => {
        // Decompose the images object array,
        // Pass & interpolate props to compose an image with corresponding title & caption
        return (
            <Carousel.Item>
                <Image
                    className="d-block w-100"
                    src={source}
                    alt="First slide"
                    rounded
                    fluid
                />
                <Carousel.Caption>
                    <h3>{title}</h3>
                    <p>{caption}</p>
                </Carousel.Caption>
            </Carousel.Item>
        )
    }

    return (
        <Carousel >
            {props.images.map(prepareSlides)}
        </Carousel>
    );
}