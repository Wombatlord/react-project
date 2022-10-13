import Image from 'react-bootstrap/Image';

export function Gallery({ imgs, imgId }) {
    return <Image src={imgs[imgId]} rounded></Image>
}