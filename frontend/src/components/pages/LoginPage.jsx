import { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export const LoginPage = () => {
  // redirect page after successfully.
  const [ loginSuccess, setLoginSuccess ] = useState( false );
  // checking email
  const [ emailExist, setEmailExist ] = useState( false );
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { setUserInfo } = useContext( UserContext );

  // backend url
  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/login`;

  const login = async (e) => {
    e.preventDefault();    
      const response = await fetch( url, {
          method :'POST',
          body : JSON.stringify( { email, password } ),
          headers : {'Content-Type': 'application/json'},
          credentials : 'include' 
      })      
      
      if( response.status == 200 || response.ok ) {
        response.json() .then( userInfo => {
          setUserInfo( userInfo );
          setEmailExist( false );
          setLoginSuccess( true );
        })                
      } 
      else {
        setEmailExist( true )
      }  
  }

  if( loginSuccess ) {
      return <Navigate to={'/'} />
  }
  
  return (
    <>
      <div className='login-page'>
        <div className='login-leftside'>
          <img src="/android-chrome-192x192.png" alt="logo" />
        </div>
        <div className='login-rightside'>        
          <form className='login' onSubmit={ login }>          
              <h1> Log in Account </h1>
              <label htmlFor="email"> Email </label>
              {( emailExist !== false ) ? <p className='email-password'> Email or Password is Wrong Credentials. </p>  : <p className='email-password'></p> }
              <input 
                type = "email" 
                name = "email" 
                id = "email" 
                placeholder = 'eg.johnfrans@gmail.com'
                required
                value = { email }
                onChange = { (e) => setEmail( e.target.value ) }
              />
              
              <label htmlFor="password"> Password </label>
              <input 
                type = "password" 
                name = "password" 
                id = "password" 
                placeholder = 'Enter your password'
                required
                value = {password}
                onChange = { (e) => setPassword( e.target.value ) }
              />
              <button> Log in </button>
          </form>
        </div>
      </div>
    </>
  )
}
