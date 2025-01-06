import React, { useContext, useEffect,useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from './UserContext'
import ThemeToggle from './pages/ThemeToggle'

export const Header = () => {  
    const { setUserInfo, userInfo } = useContext( UserContext )

    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/profile`;

    useEffect(() => {
      fetch(url , {      
        credentials:'include'
      }) .then( res => res.json()
        .then( userInfo => setUserInfo( userInfo )))      
        .catch( err => console.log(err))
    }, [])

    const logout = async() => {    
      await fetch( `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/logout`, {
        credentials: 'include',
        method: 'POST'
      })
      setUserInfo(null)
      window.location.href = '/';
      // window.location.reload();
    }
    // checking user email is present for ---create post and ---logout option.
    const email = userInfo ?.email;

    return (
      <>
        <div className='header-nav'>
          <header className='header'>
            <Link className='logo' to='/'>ByteInsights</Link>
            <nav className='navbar'>
              <ThemeToggle />
              {email && (
                <>
                  <ul className='app-ul'>

                    <li className='app-li app-li-p'>
                      <p className='app-li-p' >Hi, {userInfo.username}</p>
                    </li>
                    <li className='app-li'> 
                      <Link to={'/create-new-post'}>Create New Post</Link>
                    </li>
                    <li className='app-li'> 
                      <a className='btn-logout' onClick={logout}>Logout</a>
                    </li>
                  </ul> 
                </>
              )}
              {!email && (
                <ul className='app-ul'>
                  <li className='app-li'> 
                    <Link to="/login"> Login </Link> 
                  </li>
                  <li className='app-li'> 
                    <Link to="/register">Register</Link> 
                  </li>
                </ul> 
              )}          
            </nav>
          </header>
        </div>
        <hr />
      </>
    )
}
