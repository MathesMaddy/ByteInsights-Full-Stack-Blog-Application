import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';

export const RegisterPage = () => {

    const [ emailExist, setEmailExist ] = useState( false );

    const [ redirect, setRedirect ] = useState( false );

    const [ emailRegister, setEmailRegister ] = useState( false );
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    // backend url
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/register`;

    const register = async (e) => {
      e.preventDefault();
      // post user detail 
      const response = await fetch(url, {
          method : 'POST',
          body : JSON.stringify( { username, email, password } ),
          headers : { 'Content-Type': 'application/json' }
      });
      if( response.status !== 200 ) {
        setEmailExist( true );
        setEmailRegister( false );
      } 
      else if( response.status == 200 ) {
        setEmailExist( false ); 
        setEmailRegister( true );
      }
    }
    if( emailRegister !== false ) {
      setTimeout(() => {      
          setRedirect(true)
      }, 1000);
    }
    if(redirect) {
      return <Navigate to={'/'} />
    }

    return (
      <>
        <div className='login-page'>
          <div className='login-leftside'>
            <img src="/android-chrome-192x192.png" alt="logo" />
          </div>
          <div className='login-rightside'>

          
          <form className = 'register' onSubmit = { register }>
              <h1> Register </h1>
              <label htmlFor = "username"> Username </label>
              <input 
                type = 'text' 
                name = "username" 
                id = "username" 
                placeholder = 'eg.John' 
                required
                value = { username }
                onChange = { (e) => setUsername( e.target.value ) }
              />
              <label htmlFor = "email"> Email </label>
              <input 
                type = 'email' 
                name = "email" 
                id = "email" 
                placeholder = 'eg.johnfrans@gmail.com' 
                required
                value = { email }
                onChange = { (e) => setEmail( e.target.value ) }
              />         
              {( emailExist !== false ) ? <p className = 'email-password'>Email is already Register.</p> : <p className='email-password'></p>}     
              <label htmlFor="password"> Password </label>
              <input 
                type = "password" 
                name = "password" 
                id = "password" 
                placeholder = 'Enter your password' 
                required
                value = { password }
                onChange = { (e) => setPassword( e.target.value ) }
              />
              <button> Register </button>              
              {( emailRegister !== false ) ? <p className = 'register-success'>Register Successfull.</p> : <p className = 'email-password'></p>}
          </form>
              <p className='have-account'>Already have an account? <Link to={'/login'}>Login</Link></p>
          </div>
          </div>
      </>
    )
}
