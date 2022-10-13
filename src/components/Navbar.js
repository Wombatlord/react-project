import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';

// https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/ look at this for an alternate mobile component for navbar.

const AnimatedBrand = () => {
    return (
        <TypeAnimation
            sequence={[
                '://JS', // Types 'One'
                1000, // Waits 1s
                ':/', // Deletes '/JS'
                500, // Waits 0.5s
                '://JStone_Dev', // Types the full string without deleting previous characters.
                () => {
                    console.log("Done Typing!"); // Place optional callbacks anywhere in the array
                }
            ]}
            wrapper="navbar-brand"
            cursor={false}
            repeat={"2s"}
            speed={20}
            style={{ fontSize: '2em' }}
        />
    );
};

function MyNavBar(props) {
    const { gitLink } = props;
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" fixed="top">
            <Container>
                <div className="animatedBrandContainer">
                    <Link to="/" className='brand-link'>
                        <Navbar.Brand>
                            <AnimatedBrand />
                        </Navbar.Brand>
                    </Link>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <div className='container'>
                            <Nav.Link href={gitLink}>github/wombatlord</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => navigate("/")}>
                                    projects
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate("/about")}>
                                    personal
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => navigate("/contact")}>
                                    contact
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavBar;