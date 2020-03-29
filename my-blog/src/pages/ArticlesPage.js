import React from 'react';
import articles from './article-content';
import {useState,useEffect} from 'react';
import ArticleList from '../components/ArticleList';
import NotFoundPage from './NotFoundPage'
import CommentsList from '../components/CommentsList'
import UpvoteSection from '../components/UpvoteSection'
import CommentForm from '../components/CommentForm'

const ArticlesPage = ({match}) => {

    const [articleInfo,setArticleInfo] = useState({name:"",upvote:0,comments:[]})

    const name = match.params.name;
    const article = articles.find(article => article.name === name)

    // Use Effects Hooks
    useEffect(() => {

        const fetchData = async() => {
            const res = await fetch(`/api/articles/${name}`)
            const data = await res.json()
            setArticleInfo(data)
        }
        fetchData()
    },[name])

    if(!article){
        return <NotFoundPage></NotFoundPage>
    }

    const otherArticles = articles.filter(articl => article !== articl)
    return ( 
        <React.Fragment>
            <h1>This Article is about {article.name}</h1><br></br>
            <div className="wrapper-content"> 
                {article.content.map((articles,key) =>(
                    <p key={key}>{articles}</p>
                ))}
                <br></br>
                <h5><UpvoteSection upvote={articleInfo.upvote} name={name} setArticleInfo={setArticleInfo}></UpvoteSection></h5>
                <br></br>
                <h3><CommentsList comments={articleInfo.comments}></CommentsList></h3><br></br>
                <CommentForm articleName={name} setArticleInfo={setArticleInfo}></CommentForm>
            </div>
            
            <h1 className="other_articles">Others Articles...</h1>

            <ArticleList articles={otherArticles}></ArticleList>
        </React.Fragment>

    )
}

export default ArticlesPage;
