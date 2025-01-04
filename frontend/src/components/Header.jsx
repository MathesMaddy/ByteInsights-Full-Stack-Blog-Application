import React, { useContext, useEffect,useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from './UserContext'

export const Header = () => {  
    const { setUserInfo, userInfo } = useContext( UserContext )

    const url = 'http://localhost:4000/profile';

    useEffect(() => {
      fetch(url , {      
        credentials:'include'
      }) .then( res => res.json()
        .then( userInfo => setUserInfo( userInfo )))      
        .catch( err => console.log(err))
    }, [])

    const logout = async() => {    
      await fetch( 'http://localhost:4000/logout', {
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
          <header className='header'>
            <Link className='logo' to='/'>MyBlog</Link>
            <nav>
              {email && (
                <>
                  <ul className='app-ul'>
                    <li className='app-li'> 
                      <Link to={'/create-new-post'}>Create New Post</Link>
                    </li>
                    <li className='app-li'> 
                      <button className='btn-logout' onClick={logout}>Logout</button>
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
      </>
    )
}
