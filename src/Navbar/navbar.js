import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from "react-router-dom";


function MyNavBar(props) {
    const { gitLink } = props;
    const navigate = useNavigate();

    const navigateToContact = () => {
        navigate("/contact")
    }

    const navigateToAbout = () => {
        navigate("/about");
    }

    return (
        <Navbar expand="lg">
            <Container>
                <Link to="/" className='brand-link'>
                    <Navbar.Brand>://JStone_Dev</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <div className='container'>
                            <Nav.Link href={gitLink}>github/wombatlord</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <Link to="/about">
                                    <NavDropdown.Item onClick={navigateToAbout}>About</NavDropdown.Item>
                                </Link>
                                <Link to="/contact">
                                <NavDropdown.Item onClick={navigateToContact}>
                                    Contact
                                </NavDropdown.Item>
                                </Link>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
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