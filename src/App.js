/*import React,{ useState,useContext} from 'react';
import './App.css';
import Item from './components/Items/Item';
import Cart from './components/cart/cart';
import CartContext from './store/cart-context';
import About from './components/About/About';
import { Navbar,Container } from 'react-bootstrap';


function App() {
  const[isCartOpen,setIsCartOpen]=useState(false);

  const toggleCartHandler = () => {
    setIsCartOpen(prevIsCartOpen => !prevIsCartOpen);
  }

 const cartctx=useContext(CartContext);
  return (
    <>
     <Navbar expand="sm" bg="dark" variant='dark'>
      <Container style={{justifyContent:'center'}}>
          <Navbar.Brand href="/">HOME</Navbar.Brand>
          <Navbar.Brand href="/">STORE</Navbar.Brand>
          <Navbar.Brand href="/">ABOUT</Navbar.Brand>
          
      </Container>
      
      <button onClick={toggleCartHandler}>Cart {cartctx.items.length}</button>
     </Navbar>
     <h2 style={{color:'white',fontSize:'100px',padding:'40px',background:'lightgreen'}}>The Generics</h2>
     
     <Item />
        
        <div className={`cart-container ${isCartOpen ? 'cart-open' : ''}`}>
          <Cart onclose={toggleCartHandler}/>
        </div>
      
    </>
  );
}

export default App;*/
import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom'; // Import the correct components
import './App.css';
import Item from './components/Items/Item';
import Cart from './components/cart/cart';
import CartContext from './store/cart-context';
import About from './components/About/About';
import { Navbar, Container } from 'react-bootstrap';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartHandler = () => {
    setIsCartOpen(prevIsCartOpen => !prevIsCartOpen);
  }

  const cartctx = useContext(CartContext);

  return (
    <Router> {/* Wrap your components in the Router */}
      <Navbar expand="sm" bg="dark" variant='dark'>
        <Container style={{ justifyContent: 'center' }}>
          <Navbar.Brand as={Link} to="/">HOME</Navbar.Brand>
          <Navbar.Brand as={Link} to="/store">STORE</Navbar.Brand>
          <Navbar.Brand as={Link} to="/about">ABOUT</Navbar.Brand>
        </Container>

        <button onClick={toggleCartHandler}>Cart {cartctx.items.length}</button>
      </Navbar>
      <h2 style={{ color: 'white', fontSize: '100px', padding: '40px', background: 'lightgreen' }}>The Generics</h2>

      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/store" element={<Item />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div className={`cart-container ${isCartOpen ? 'cart-open' : ''}`}>
        <Cart onclose={toggleCartHandler} />
      </div>
    </Router>
  );
}

function Home() {
  return <p>Home Page Content</p>;
}

export default App;
