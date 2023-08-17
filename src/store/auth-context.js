/*import React,{useState} from "react";

const AuthContext=React.createContext({
    token:'',
    email:'',
    isLoggedIn:false,
    login:(token)=>{
    },
    logout:()=>{}
})

export const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem('token');
    const[token,setToken]=useState(initialToken);

    const initialEmail = localStorage.getItem('email'); // Get initial email from localStorage
    const [email, setEmail] = useState(initialEmail);
    let userLoggedIn=!!token;

    const loginHandler=(token,email)=>{
      setToken(token);
      setEmail(email);
      localStorage.setItem('token',token);
      localStorage.setItem('email',email);
    }
    const logOutHandler=()=>{
     setToken(null);
     localStorage.removeItem('token')
    }

    const contextValue={
     token:token,
     isLoggedIn:userLoggedIn,
     login:loginHandler,
     logout:logOutHandler
    }
    return<AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;*/
import React, { useState } from "react";

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  email: '', // Add email property
  login: (token) => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const initialEmail = localStorage.getItem('email'); // Get initial email from localStorage
  const [email, setEmail] = useState(initialEmail); // Initialize email state

  let userLoggedIn = !!token;

  const loginHandler = (token, email) => {
    setToken(token);
    setEmail(email); // Set email along with the token
    localStorage.setItem('token', token);
    localStorage.setItem('email', email); // Save email in localStorage
  };

  const logOutHandler = () => {
    setToken(null);
    setEmail(''); // Clear email when logging out
    localStorage.removeItem('token');
    localStorage.removeItem('email'); // Remove email from localStorage
  };

  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    email: email, // Add email to context
    login: loginHandler,
    logout: logOutHandler
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
