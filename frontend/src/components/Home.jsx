import React, { useEffect, useState } from 'react'
import { Posts } from './Posts'

export const Home = () => {
  
    const [posts,SetPosts] = useState([])
    const url = 'http://localhost:4000/posts';

    useEffect(() => {
      fetch( url )
        .then( res => { 
          res.json() .then( post => { 
            SetPosts(post)})})
    },[])

    return (
      <>        
        { posts.length > 0 && posts.map( post => (
          <Posts {...post} />
        ))
        }
      </>
    )
}
