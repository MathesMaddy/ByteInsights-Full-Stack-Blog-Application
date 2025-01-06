import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export const Posts = ( {_id, title, summary, cover, content, createdAt, author} ) => {
  
  // solve the path issue in 
  const uploadsImg = cover.replace(/\\/g,'/');
  // backend url
  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/`; 

  return (
    <>
        <div className="post" >
          <div className="img">
            <Link to={ `post/${_id}` }>
              <img src={ url + uploadsImg } alt="" />
            </Link>
          </div>
          <div className='text'>
            <Link to={ `post/${_id}` }>
              <h2>{ title }</h2>
            </Link>
            <p className='info'>
              <span href="" className='author'>{ author.username }</span>
              <span>{format( new Date( createdAt ) , 'MMM d, yyyy HH:mm') }</span>              
            </p>
            <p className='summary'>{ summary }</p>
          </div>
        </div>
    </>
  )
}
