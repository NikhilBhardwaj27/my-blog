import React from 'react'
import articles from './article-content';
import ArticleList from '../components/ArticleList';

const AboutPage = () => {

    return (        
        <React.Fragment>
            <h1>Articles</h1><br></br>
            <ArticleList articles={articles}></ArticleList>            
       </React.Fragment>
    )
}

export default AboutPage;
