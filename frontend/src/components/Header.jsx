import {Badge, React} from 'react-bootstrap';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import {LinkContainer} from 'react-router-bootstrap';

const Header = () => {

  // cart is coming from the store.js file
  const { cartItems } = useSelector(state => state.cart);

  return (
    <header>
        <Navbar bg='dark' variant='dark' expand="md" collapseOnSelect>
            <Container>
              <LinkContainer to='/'>
                  <Navbar.Brand>
                    <img src={logo} alt='logo is here'></img>
                      PioneerGoods
                  </Navbar.Brand>
              </LinkContainer>
                
                <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
                <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='ms-auto'>

              <LinkContainer to='/cart'>
                  <Nav.Link> <FaShoppingCart />Cart
                    { cartItems.length > 0 && (
                      <Badge pill bg='success' className='ms-1' style={{marginLeft: '5px'}}>
                         {/* a for accumulator, c for current item in the array; 0 for the deafult of accumulator */}
                        {cartItems.reduce((a,c) => a + c.qty, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
              </LinkContainer>
                    
              <LinkContainer to='/login'>
                  <Nav.Link> <FaUser /> Sign In</Nav.Link>
              </LinkContainer>
                    
                  </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header;
