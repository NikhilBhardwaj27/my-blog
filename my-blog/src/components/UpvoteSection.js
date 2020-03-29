import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const UpvoteSection = ({upvote,name,setArticleInfo}) => {

    const upvoteArticle = async() => {
        const res = await fetch(`/api/articles/${name}/upvotes`,{
            method:'post'
        })
        const data = await res.json()

        setArticleInfo(data)
    }

    return (
        <div id="upvote-section">
            <FontAwesomeIcon icon={faThumbsUp} size="2x" onClick={()=>upvoteArticle()}/> {upvote} Likes
        </div>
    )
}

export default UpvoteSection
