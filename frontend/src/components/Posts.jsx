import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export const Posts = ( {_id, title, summary, cover, content, createdAt, author} ) => {
  
  // solve the path issue in 
  const uploadsImg = cover.replace(/\\/g,'/');
  // backend url
  const url = 'http://localhost:4000/'; 

  return (
    <>
        <div className="post">
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
              <a href="" className='author'>{ author.username }</a>
              <span>{format( new Date( createdAt ) , 'MMM d, yyyy HH:mm') }</span>              
            </p>
            <p className='summary'>{ summary }</p>
          </div>
        </div>
    </>
  )
}
