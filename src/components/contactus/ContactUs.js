import React,{useState} from "react";
import Card from '../UI/abc'
import classes from './ContactUs.module.css'


const ContactUs=()=>{
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[phoneNumber,setPhoneNumber]=useState('');

    const nameHandler=(event)=>{
        setName(event.target.value)
    }
    const emailHandler=(event)=>{
        setEmail(event.target.value)
    }
    const phoneHandler=(event)=>{
        setPhoneNumber(event.target.value)
    }

    async function submitHandler(event){
     event.preventDefault();
     const User={
        name:name,
        email:email,
        phoneNumber:phoneNumber
     }
     const response=await fetch('https://react-http-e0629-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body:JSON.stringify(User),
      headers:{
        'Content-Type':'application/jSON'
      }
    });
    const data=await response.json();
    console.log(data)

     setName('')
     setEmail('')
     setPhoneNumber('')

    }
    return(
        <Card className={classes.login}>
        <form onSubmit={submitHandler}>
            <label>Name:</label><br/>
            <input type="text" value={name} onChange={nameHandler} /><br/>
            <label>Email:</label><br/>
            <input type="email" value={email} onChange={emailHandler} /><br/>
            <label>phoneNumber:</label><br/>
            <input type="number" value={phoneNumber} onChange={phoneHandler}  /><br/>
            <button type="submit" className={classes.actions} >Submit</button>

        </form>
        </Card>
    )
}
export default ContactUs