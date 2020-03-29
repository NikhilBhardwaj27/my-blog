import React from 'react'
import { Link } from 'react-router-dom';

const  ArticleList = ({articles}) => {
    return (
        <div>
            {articles.map((article,key) =>(
                <div className="ArticlesList_Line" key={key}>
                    <Link className="articleList_titles" to={`/articles/${article.name}`}>
                        <h2>{article.title}</h2>
                        <p>{article.content[0].substring(0,150)}...</p>
                    </Link>
                </div>))}
        </div>
    )
}

export default ArticleList;
