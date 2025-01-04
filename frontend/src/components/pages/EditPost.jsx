import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const EditPost = () => {

    const { id } = useParams();
    // store the detail's of post
    const [ title, setTitle ] = useState('');
    const [ summary, setSummary ] = useState('');
    const [ content, setContent ] = useState('');
    const [ file, setFile ] = useState('');

    // page redirect after successfully.
    const [ redirect, setRedirect ] = useState(false);
    
    // backend url 
    const url = 'http://localhost:4000/post/'

    useEffect(() => {
        fetch( url + `${id}` ) .then( res => { 
            res.json() .then( postInfo => {
            setTitle( postInfo.title );
            setSummary( postInfo.summary );
            setContent( postInfo.content );
            })
        })
        .catch( e => console.log(e) );
    }, []);

    const updatePost = async (e) => {
        e.preventDefault();
        // edit post details store in data
        const data = new FormData();
        data.set('id', id);
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        if(file ?. [0]) {
            data.set('file', file[0]);
        }

        const response = await fetch(url, {
            method: 'PUT',
            body: data,
            credentials: 'include'
        })  
        if( response.ok ) {     
            setRedirect( true )
        }
    }

    if( redirect ) {
        return <Navigate to={'/'} />
    }

    return (
        <>
            <form className='create-post' onSubmit = { updatePost } >
                <input 
                    type = 'text' 
                    placeholder = 'Title' 
                    value = { title } 
                    required 
                    name = "title"
                    onChange = {e => setTitle( e.target.value )}
                />
                <input 
                    type = 'text' 
                    placeholder = 'Summary' 
                    value = { summary } 
                    required
                    name = "summary"
                    onChange = {e => setSummary( e.target.value )}
                />
                <input 
                    type = "file" 
                    name = "file"
                    onChange = {e => setFile( e.target.files )} 
                />
                <ReactQuill 
                    value = { content }                 
                    onChange={ newValue => setContent( newValue )} 
                />            
                <button className='create-post-btn'> Update Post </button>
            </form>
        </>
    )
}
export default EditPost;