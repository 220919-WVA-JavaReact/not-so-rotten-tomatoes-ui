import 'bootstrap/dist/css/bootstrap.min.css';
import { SyntheticEvent, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { propTypes } from 'react-bootstrap/esm/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { User } from '../../models/user';

interface INaviBar {
  currentUser: User | undefined;
  setCurrentUser: (nextUser: User | undefined) => void;
}

function NaviBar(props: INaviBar) {
  function logout() {
    //const [user, setCurrentUser] = useState('');
    sessionStorage.removeItem('token');
    props.setCurrentUser(undefined);
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">NSRT</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {props.currentUser ? (
            <>
              <Nav className="me-auto">
                <Nav.Link href="http://localhost:3000/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link href="http://localhost:3000/recipes">
                  Recipes
                </Nav.Link>
                {/* Maybe utilize later? ---------------------------------- 
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
              </Nav>
              <Nav>
                <Nav.Link href="http://localhost:3000/login" onClick={logout}>
                  Logout
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <Nav className="me-auto">
              <Nav>
                <Nav.Link href="http://localhost:3000/login">Login</Nav.Link>
                <Nav.Link eventKey={2} href="http://localhost:3000/register">
                  Register
                </Nav.Link>
              </Nav>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NaviBar;
