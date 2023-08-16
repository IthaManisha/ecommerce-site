import React,{useState} from "react";

const AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{
    },
    logout:()=>{}
})

export const AuthContextProvider=(props)=>{
    const[token,setToken]=useState(null);
    let userLoggedIn=!!token;
    const loginHandler=(token)=>{
      setToken(token);
    }
    const logOutHandler=()=>{
     setToken(null);
    }

    const contextValue={
     token:token,
     isLoggedIn:userLoggedIn,
     login:loginHandler,
     logout:logOutHandler
    }
    return<AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;