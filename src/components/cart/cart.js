/*import React,{useContext,useState} from "react";
import './cart.css'
import Button from 'react-bootstrap/Button';
import CartContext from "../../store/cart-context";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";

const Cart=(props)=>{
    const cartctx=useContext(CartContext);
    const [showAlert, setShowAlert] = useState(false);
    const closeAlertHandler = () => {
        setShowAlert(true); // Close the alert
      };
    //const cartItems=(
       /*<div >
            {
             cartctx.items.map((item)=>(
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                 <img src={item.imageUrl} alt={item.title} height={70} width={70} />
                <h5 style={{alignSelf:'center'}}>{item.price}</h5>
                <h5 style={{alignSelf:'center'}}>{item.quantity}</h5>
                <Button variant="danger" style={{alignSelf:'center'}} onClick={()=>cartctx.removeItem(item.id)}>REMOVE</Button>
                </div>
             ))
            }

        </div>
        
    )*/
    /*async function cartItems() {
      const URL = 'https://crudcrud.com/api/22a3c72faee142dd93a72ac596dfd397/ecommerce';
      try {
          const response = await axios.get(URL);
          const cart = response.data;
          return (
              <div>
                  {cart.map((item) => (
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }} key={item._id}>
                          <img src={item.imageUrl} alt={item.title} height={70} width={70} />
                          <h5 style={{ alignSelf: 'center' }}>{item.price}</h5>
                          <h5 style={{ alignSelf: 'center' }}>{item.quantity}</h5>
                          <Button variant="danger" style={{ alignSelf: 'center' }} onClick={() => cartctx.removeItem(item.id)}>REMOVE</Button>
                      </div>
                  ))}
              </div>
          );
      } catch (error) {
          console.error("Error fetching candy items:", error.response.data);
      }
  }
  console.log(cartItems());
    return(
        <>
        <button style={{marginLeft:'92%'}}   onClick={props.onclose}>X</button>
        <h3 style={{marginLeft:'50%'}}>cart</h3>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
        <h5>ITEM</h5>
        <h5>PRICE</h5>
        <h5>QUANTITY</h5>
        </div>
        {cartItems}
        <h4 style={{marginLeft:'60%'}}>Total $ {cartctx.totalAmount}</h4>
        <Button variant="primary" style={{marginLeft:'50%'}} onClick={closeAlertHandler}>
            PURCHASE
        </Button>
        {showAlert && (
        <Alert
          variant="warning"
          onClose={closeAlertHandler}
          dismissible
        >
          thank for the purchase
        </Alert>
      )}

     
        </>
    )

}
export default Cart;*/
import React, { useContext, useState, useEffect } from "react";
import './cart.css';
import Button from 'react-bootstrap/Button';
import CartContext from "../../store/cart-context";
import AuthContext from "../../store/auth-context";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";

const Cart = (props) => {
    const cartctx = useContext(CartContext);
    const authctx = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    
    //const userToken = authctx.token; // Get the user's token from the auth context
    //const userModifiedEmail = authctx?.email?.replace(/[.@]/g, '') || ''; 
    /*useEffect(() => {
      async function fetchCartItems() {
        //const userModifiedEmail = authctx.email.replace(/[.@]/g, '');
        const userModifiedEmail = encodeURIComponent(authctx.email.replace(/[.@]/g, ''));
          const URL = `https://crudcrud.com/api/d7c24524176d4e08aa25c077bdc04e4b/ecommerce/${userModifiedEmail}`;
          console.log("URL:", URL);
          console.log("userModifiedEmail:", userModifiedEmail);
          try {
              const response = await axios.get(URL);
              const cart = response.data;
              const totalAmount = cart.reduce((total, item) => total + item.price, 0);
              cartctx.setTotalAmount(totalAmount);
              setCartItems(cart);
          } catch (error) {
              console.error("Error fetching cart items:", error.response.data);
          }
      }
  
      fetchCartItems();
  }, [cartctx,authctx]);*/
  useEffect(() => {
    async function fetchCartItems() {
        const userToken = authctx.token;
        if (userToken) {
            try {
                const userModifiedEmail = authctx.email.replace(/[.@]/g, '');
                const URL = `https://crudcrud.com/api/bf4c5bb3a0784dfe82b48058bbd42e3a`;
                const response = await axios.get(`${URL}/${userModifiedEmail}`);
                //const queryParams = `?email=${encodeURIComponent(authctx.email)}`;

                //const response = await axios.get(URL);
                console.log(response)
                const cart = response.data;
                const totalAmount = cart.reduce((total, item) => total + item.price, 0);
                cartctx.setTotalAmount(totalAmount);
                setCartItems(cart);
            } catch (error) {
                console.error("Error fetching cart items:", error.response.data);
            }
        }
    }

    fetchCartItems();
}, [cartctx, authctx]);

  
    const closeAlertHandler = () => {
        setShowAlert(true); // Close the alert
    };
    const removeItemFromCartHandler = async (id) => {
      const existingItem = cartItems.find((item) => item._id === id);
      
      if (existingItem) {
          // Remove from local cart
          const updatedCart = cartItems.filter(item => item._id !== id);
          
          cartctx.setTotalAmount((totalAmount)=>totalAmount-existingItem.price); 
          setCartItems(updatedCart);

          // Remove from remote data
          try {
            const userModifiedEmail = authctx.email.replace(/[.@]/g, '');
              await axios.delete(`https://crudcrud.com/api/bf4c5bb3a0784dfe82b48058bbd42e3a/${userModifiedEmail}/${id}`);
          } catch (error) {
              console.error("Error deleting item from remote data:", error.response.data);
          }
      }
  };
  console.log(cartItems)
    return (
        <>
            <button style={{ marginLeft: '92%' }} onClick={props.onclose}>X</button>
            <h3 style={{ marginLeft: '50%' }}>cart</h3>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <h5>ITEM</h5>
                <h5>PRICE</h5>
                <h5>QUANTITY</h5>
            </div>
            {cartItems.map((item) => (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }} key={item._id}>
                    <img src={item.imageUrl} alt={item.title} height={70} width={70} />
                    <h5 style={{ alignSelf: 'center' }}>{item.price}</h5>
                    <h5 style={{ alignSelf: 'center' }}>{item.quantity}</h5>
                    <Button variant="danger" style={{ alignSelf: 'center' }} onClick={() => removeItemFromCartHandler(item._id)}>REMOVE</Button>
                    
                </div>
                
            ))}

            <h4 style={{ marginLeft: '60%' }}>Total $ {cartctx.totalAmount}</h4>
            <Button variant="primary" style={{ marginLeft: '50%' }} onClick={closeAlertHandler}>
                PURCHASE
            </Button>
            {showAlert && (
                <Alert
                    variant="warning"
                    onClose={closeAlertHandler}
                    dismissible
                >
                    Thank you for the purchase!
                </Alert>
            )}
        </>
    )
}

export default Cart;
