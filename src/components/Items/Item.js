import React,{useContext} from "react";
import './Item.css'
import Button from 'react-bootstrap/Button';
import CartContext from "../../store/cart-context";

const cartElements = [
    {
    id:1,
    title: 'Album 1',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    quantity: 2,
    },
    {
    id:2,
    title: 'Album 2',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    quantity: 3,
    },
    {
    id:3,
    title: 'Album 3',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    quantity: 1,
    },
    {
    id:4,
    title: 'Album 4',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
    quantity: 1,
    }
    ]

    
const Item = () => {
    const cartCtx = useContext(CartContext);
    const addToCartHandler = (items) => {

        const itemToAdd = {
            id: items.id,
            imageUrl:items.imageUrl,
            name: items.title,
            amount: 1, // Set the amount to 1
            price: items.price,
          };
        
          cartCtx.addItem(itemToAdd);
     
      };
  return (
    <>
    <h2 style={{marginLeft:'50%'}}>Music</h2>
    <div className="item-container">
      {cartElements.map((item) => (
        <div key={item.id} className="item">
          <img src={item.imageUrl} alt={item.title} />
          <div className="item-details">
            <p>{item.title}</p>
            <p>${item.price}</p>
            
            <Button variant="primary" onClick={()=>addToCartHandler(item)}>Add To Cart</Button>

          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Item