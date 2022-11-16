import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
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
        <Navbar.Brand as={Link} to="/">
          NSRT
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {props.currentUser ? (
            <>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/recipes">
                  Recipes
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link as={Link} to="/login" onClick={logout}>
                  Logout
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <Nav className="me-auto">
              <Nav.Link as={Link} to="login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} eventKey={2} to="/register">
                Register
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NaviBar;
