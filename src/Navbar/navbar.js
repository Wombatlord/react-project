import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from "react-router-dom";

// https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/ look at this for an alternate mobile component for navbar.

function MyNavBar(props) {
    const { gitLink } = props;
    const navigate = useNavigate();

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
                                <NavDropdown.Item onClick={() => navigate("/about")}>
                                    About
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate("/contact")}>
                                    Contact
                                </NavDropdown.Item>
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