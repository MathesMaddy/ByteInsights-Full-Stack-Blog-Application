import { formatISO9075 } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext';

const PostPage = () => {

    const [ PostInfo, setPostInfo ] = useState('');
    const [ deleted, setDeleted ] = useState(false);
    const { id } = useParams();
    const { userInfo } = useContext( UserContext );
    
    // backend url
    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/post/`;

    useEffect(() => {
        fetch( url + `${id}` ) 
            .then( res => { 
            res.json() .then( postInfo => {
                setPostInfo( postInfo ) })
            }) 
            .catch(e => console.log(e));
    }, [])   

    
    const deletePost = async() => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/delete-post/${id}`, {
                method:'DELETE'
            });            
            if(response.ok) {                
                setDeleted(true)
            }
        }
        catch(e) {
            console.log(e);
        }      
    }
    if(deleted)
        return <Navigate to={'/'} />
    
    if(!PostInfo) return ''
    
  return (
    <div className = 'post-page'>
        <div>
            <h1 className = 'title'>{ PostInfo.title }</h1>
        </div>
        <div>            
            <time className = 'post-time'>{ formatISO9075( new Date( PostInfo.createdAt ), 'MMM d, yyyy HH:mm') }</time>
            <div className = 'author'>{ PostInfo.author.username }</div>
        </div> 
        { userInfo.id == PostInfo.author._id && (
            <div className = 'edit-row'> 
                <Link className = 'edit-btn' to = { `/edit/${PostInfo._id}` }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    Edit this post
                </Link>
               
                <Link className='edit-btn' onClick={deletePost}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Delete this post
                </Link>
            </div>
        )}
        <div className='image'>
            <img src={ `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${PostInfo.cover}` } alt = "image" />
        </div>        
        <div className='content' dangerouslySetInnerHTML={ {__html:PostInfo.content} } ></div>
    </div>
  )
}
export default PostPage;