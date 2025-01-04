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
  const url = 'http://localhost:4000/login';

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
        <form className='login' onSubmit={ login }>          
            <h1> Login </h1>
            <label htmlFor="email"> Email </label>
            {( emailExist !== false ) ? <p className='email-password'> Email or Password is Wrong Credentials. </p>  : <p className='email-password'></p> }
            <input 
              type = "email" 
              name = "email" 
              id = "email" 
              placeholder = 'Email'
              required
              value = { email }
              onChange = { (e) => setEmail( e.target.value ) }
            />
            
            <label htmlFor="password"> Password </label>
            <input 
              type = "password" 
              name = "password" 
              id = "password" 
              placeholder = 'Password'
              required
              value = {password}
              onChange = { (e) => setPassword( e.target.value ) }
            />
            <button> Log in </button>
        </form>
    </>
  )
}
