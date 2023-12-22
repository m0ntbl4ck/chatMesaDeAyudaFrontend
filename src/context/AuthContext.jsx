import { createContext, useState, useContext, useEffect } from "react"
import PropTypes from "prop-types";
import {loginRequest, logoutRequest, registerRequest, verifyTokenRequest,getMessagesRequest} from '../api/auth'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth  =()=>{

    const context = useContext(AuthContext)

    if(!context){
        throw new Error('useAuth debe ser utilizado dentro de un AuthProvider')
    }
    return  context
}

export const AuthProvider =({children}) => {
    AuthProvider.propTypes = {
        children: PropTypes.node.isRequired,
      };

    const [user, setUser] = useState(null);
    const [isAutheticated, setIsAutheticated]= useState(false)
    const [errors, setErrors]= useState([])
    const [loading, setLoading]= useState(true)

    const singup = async(user)=>{
        try {
            const res =  await registerRequest(user);
     console.log(res.data)
     setUser(res.data)
     setIsAutheticated(true)
        } catch (error) {
          //  console.log(error.response)
            setErrors(error.response.data)
        }

    }

    const signin= async(user)=>{
      try {
         const res= await loginRequest(user)
         console.log(res)
         setIsAutheticated(true)
      } catch (error) {
        console.log(error)
        if(Array.isArray(error.response.data)){

            return setErrors(error.response.data)
        }
        setErrors([error.response.data.message])
      }
    }

    const logout= async()=>{
        try {
           const res= await logoutRequest()
           console.log(res)
           setIsAutheticated(false)
        } catch (error) {
          console.log(error)
          if(Array.isArray(error.response.data)){
  
              return setErrors(error.response.data)
          }
          setErrors([error.response.data.message])
        }
      }

    const getMessages = async(user)=>{
        try {
            const res= await getMessagesRequest(user)
            console.log(res)
            setIsAutheticated(false)
         } catch (error) {
           console.log(error)
           if(Array.isArray(error.response.data)){
   
               return setErrors(error.response.data)
           }
           setErrors([error.response.data.message])
         }
    }
useEffect(()=>{

    async function checkLogin(){
        const cookies=Cookies.get()

        if(!cookies.token){
            setIsAutheticated(false)
            setLoading(false)
            return setUser(null)
        }

           try {
            const res =await verifyTokenRequest(cookies.token)
           console.log(res)
            if(!res.data) { 
        setIsAutheticated(false)
           setLoading(false)
           return;
        }
          setIsAutheticated(true)
           setUser(res.data)
           setLoading(false)
        } catch (error) {
            console.log(error)
            setIsAutheticated(false)
            setUser(null)
            setLoading(false)
           }  
    }
    checkLogin();
},[])


    return(
        <AuthContext.Provider value={{
            singup,signin,logout,getMessages, user, isAutheticated, errors,loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}