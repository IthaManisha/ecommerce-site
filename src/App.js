import React,{ useState,useContext} from 'react';
import './App.css';
import { Navbar, Container} from 'react-bootstrap';
import Item from './components/Items/Item';
import Cart from './components/cart/cart';
import CartContext from './store/cart-context';
import CartProvider from './store/CartProvider';

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
     <h2 style={{justifyContent:'center'}}>The Generics</h2>
     
     <>
        <Item />
        <div className={`cart-container ${isCartOpen ? 'cart-open' : ''}`}>
          <Cart onclose={toggleCartHandler}/>
        </div>
      </>
    </>
  );
}

export default App;
