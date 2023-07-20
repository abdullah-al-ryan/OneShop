import {Badge, NavDropdown, React} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/logo.png';
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice';
import {LinkContainer} from 'react-router-bootstrap';
import SearchBox from './SearchBox';

const Header = () => {

  // cart is coming from the store.js file
  const { cartItems } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try{
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    }
    catch(err){
      console.log(err);
    }
  }

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
                      <SearchBox />
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
                    
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                <Nav.Link href='/login'> <FaUser /> Sign In</Nav.Link>
            </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
                    
                  </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header;
