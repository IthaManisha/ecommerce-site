import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom'; // Import the correct components
import './App.css';
import Item from './components/Items/Item';
import Cart from './components/cart/cart';
import CartContext from './store/cart-context';
import About from './components/About/About';
import Home from './components/Home/Home';
import ContactUs from './components/contactus/ContactUs';
import AuthForm from './components/AuthForm/AuthForm';
import AuthContext from './store/auth-context';
import { Navbar, Container } from 'react-bootstrap';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartHandler = () => {
    setIsCartOpen(prevIsCartOpen => !prevIsCartOpen);
  }

  const cartctx = useContext(CartContext);

  const authCtx=useContext(AuthContext);
  const isLoggenIn=authCtx.isLoggedIn;

  return (
    <Router> {/* Wrap your components in the Router */}
      <Navbar expand="sm" bg="dark" variant='dark'>
        <Container style={{ justifyContent: 'center' }}>
        {isLoggenIn && <Navbar.Brand as={Link} to="/home">HOME</Navbar.Brand>}
        {isLoggenIn && <Navbar.Brand as={Link} to="/store">STORE</Navbar.Brand>}
        {!isLoggenIn && <Navbar.Brand as={Link} to="/about">ABOUT</Navbar.Brand>}
        {isLoggenIn && <Navbar.Brand as={Link} to="/contactus">CONTACTUS</Navbar.Brand>}
          {!isLoggenIn && <Navbar.Brand as={Link} to="/auth" style={{marginLeft:'30px'}}>Login</Navbar.Brand>}
          {isLoggenIn && <Navbar.Brand as={Link} to="/">Logout</Navbar.Brand>}
        </Container>

        <button onClick={toggleCartHandler}>Cart {cartctx.items.length}</button>
      </Navbar>
      <h2 style={{ color: 'white', fontSize: '100px', padding: '40px', background: 'lightgreen' }}>The Generics</h2>

      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/store" element={<Item />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/auth" element={<AuthForm/>}/>
        
        
      </Routes>

      <div className={`cart-container ${isCartOpen ? 'cart-open' : ''}`}>
        <Cart onclose={toggleCartHandler} />
      </div>
    </Router>
  );
}



export default App;
