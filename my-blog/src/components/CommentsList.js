import React from 'react'

const  CommentsList = ({comments}) => 
{
    return (
        <>
            Comments..
            {
                comments.map((comment,key)=>(
                    <div className="comments" key={key}>
                        <p>{comment.username}:{comment.text}</p>
                    </div>
                ))
            }
        </>
    )
}

export default CommentsList;
