import React from 'react'
import {useState} from 'react';

const CommentForm = ({articleName,setArticleInfo}) => {

    const [username,setUsername] = useState('')
    const [text,setText] = useState('')

    const addingComments = async() => {
        const res = await fetch(`/api/articles/${articleName}/add-comment`,{
            method:'post',
            body:JSON.stringify({username,text}),
            headers:{
                'Content-type':'application/json'
            }
        })

        const body = await res.json()

        setArticleInfo(body)

        setText('')
        setUsername('')
    }

    return (
        <div id="comment-form">
            <h4>Add Comment</h4>
            <label>
                Name:
            </label>
            <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input><br></br>

            <label>
                Comment:
            </label>
            <input type="textarea" row="4" cols="50" value={text} onChange={e => setText(e.target.value)}></input><br></br>

            <button onClick={()=>addingComments()}>Add Comment</button>
        </div>
    )
}

export default CommentForm
