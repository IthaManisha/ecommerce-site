import { useState, useRef,useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const navigate=useNavigate();
  const emailInputRef=useRef();
  const passwordInputRef=useRef();

  const AuthCtx=useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading]=useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(event)=>{
    event.preventDefault();
    
    const enteredEmail=emailInputRef.current.value;
    const enteredPassword=passwordInputRef.current.value;
    setIsLoading(true);
    let url;
    if(isLogin){
    url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvG4Y2HNVHecN9A-9isXGEFx63dFHRCD4'
    }
    else{
        url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvG4Y2HNVHecN9A-9isXGEFx63dFHRCD4'
    }

        fetch(url,
        {
          method:'POST',
          body:JSON.stringify({
            email:enteredEmail,
            password:enteredPassword,
            returnSecureToken:true
          }),
          headers:{
            'Content-Type':'application/json',
          },
        }).then((res)=>{
            setIsLoading(false);
            if(res.ok){
              return res.json();
            }
            else{
                return res.json().then((data)=>{
                    let errorMessage='Authentication Failed!';
                    //if(data && data.error && data.error.message)
                    //{
                    //    errorMessage=data.error.message;
                    //}
                    throw new Error(errorMessage);
                });
            }
        })
        .then((data)=>{
            AuthCtx.login(data.idToken,enteredEmail);
            navigate('/home');
        })
        .catch((err)=>{
            alert(err.Message);
        })
    
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login':'Create Account'}</button>}
          {isLoading && <p>Sending Request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
