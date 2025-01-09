import React, { useEffect, useState } from 'react'
import { Posts } from './Posts'

export const Home = () => {
    
    const [posts,SetPosts] = useState([]);   

    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/posts`;

    useEffect(() => {
      fetch( url )
        .then( res => { 
          res.json() 
        .then( post => { 
            SetPosts(post)           
          })
        })
    }, [])

    return (
      <> 
        { !post.length && (
          <div className = "loading-posts">
            <h2> Server has been Restarted. Blog Post's Loading within 50 Seconds. </h2>
          </div>
        )}
        { posts.length > 0 && posts.map( post => (
          <Posts {...post} key={post._id} />
        ))
        }
      </>
    )
}
