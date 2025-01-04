import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom'

export const CreatePost = () => {    

    const [ title, setTitle ] = useState('');
    const [ summary, setSummary ] = useState();
    const [ content, setContent ] = useState();
    const [ file, setFile ] = useState();
    const [ redirect, setRedirect ] = useState(false);
    // backend url
    const url = 'http://localhost:4000/create-post';

    const createNewPost = async (e) => {
        e.preventDefault ();
        // post details store in data
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',file[0]);

        const response = await fetch( url, {
            method:'POST',       
            body: data,
            credentials: 'include'
        } )        
        if(response.ok) {
            setRedirect(true)
        }
    }

    // page redirect after post success.
    if(redirect) {
        return <Navigate to={'/'} />
    }
    
    return (
    <>
        <form className='create-post' onSubmit={createNewPost}>
            <input 
                type='text' 
                placeholder='Title' 
                value={title}
                required 
                name="title"
                onChange={e => setTitle(e.target.value)}
            />
            <input 
                type='text' 
                placeholder='Summary' 
                value={summary} 
                required
                name="summary"
                onChange={e => setSummary(e.target.value)}
            />
            <input 
                type="file" 
                name="file"
                required
                onChange={e => setFile(e.target.files)} 
            />
            <ReactQuill 
                value={content}                 
                onChange={newValue => setContent(newValue)} 
            />            
            <button className='create-post-btn'> Create New Post </button>
        </form>
    </>
  )
}
