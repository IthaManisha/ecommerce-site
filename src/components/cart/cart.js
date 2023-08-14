import React,{useContext,useState} from "react";
import './cart.css'
import Button from 'react-bootstrap/Button';
import CartContext from "../../store/cart-context";
import Alert from 'react-bootstrap/Alert';

const Cart=(props)=>{
    const cartctx=useContext(CartContext);
    const [showAlert, setShowAlert] = useState(false);
    const closeAlertHandler = () => {
        setShowAlert(true); // Close the alert
      };
    const cartItems=(
        <div >
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
    )
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
export default Cart;