import React, { useState } from 'react';
import CartContext from './cart-context';
import Alert from 'react-bootstrap/Alert';

const CartProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const closeAlertHandler = () => {
        setShowAlert(false); // Close the alert
      };
  // Function to add an item to the cart
  const addItemToCartHandler = (item) => {
      // Check if the item already exists in the cart
      const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        /*setCartItems((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem.id === item.id
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity + 1,
                }
              : cartItem
          )
        );*/
        setShowAlert(true);
      } else {
        setCartItems((prevItems) => [
          ...prevItems,
          { ...item, quantity: 1},
        ]);
        setTotalAmount((prevTotal) => prevTotal + item.price);
      }
     };
     const removeItemFromCartHandler = (id) => {
        const existingItem = cartItems.find((item) => item.id === id);
      
        if (existingItem) {
          if (existingItem.amount === 1 || existingItem.amount === 0) {
            // If item has only 1 quantity, remove it from cart
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
            
          } 
          // Update total amount by subtracting the item's price
          setTotalAmount((prevTotalAmount) => prevTotalAmount - existingItem.price);
          
        }
      };
    const cartContext = {
        items: cartItems,
        totalAmount: totalAmount,
        addItem: addItemToCartHandler,
        removeItem:removeItemFromCartHandler
        
      };
    
      return <CartContext.Provider value={cartContext}>
        {props.children}{showAlert && (
        <Alert
          variant="warning"
          onClose={closeAlertHandler}
          dismissible
        >
          This item is already added to the cart
        </Alert>
      )}
        </CartContext.Provider>;
}
export default CartProvider;
