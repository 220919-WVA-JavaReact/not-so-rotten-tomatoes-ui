import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { User } from '../../models/user';
import { SyntheticEvent, useState } from 'react';


interface INaviBar {
  currentUser: User | undefined,
  setCurrentUser: (nextUser: User | undefined) => void
}

export function logout(){
  //const [user, setCurrentUser] = useState(''); 
  sessionStorage.removeItem('token');
};

function NaviBar(props: INaviBar){

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">NSRT</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        {
            props.currentUser ?
            <>
          <Nav className="me-auto">
            <Nav.Link href="dashboard">Dashboard</Nav.Link>
            <Nav.Link href="recipes">Recipes</Nav.Link>
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
            <Nav.Link href="logout" onClick={logout}>Logout</Nav.Link>
          </Nav>
                      </>
                      :
          <Nav className="me-auto">            
            <Nav>
              <Nav.Link href="login">Login</Nav.Link>
              <Nav.Link eventKey={2} href="register">
                Register
              </Nav.Link>
            </Nav>
          </Nav>
}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}

export default NaviBar;