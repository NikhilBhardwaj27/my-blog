import React from 'react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticlesListPage from './pages/ArticlesListPage'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import NavBar from './pages/NavBar';
import './App.css';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="App">
        <Router>
          <NavBar></NavBar>
          <div className="page-margin"> 
          <Switch>
              <Route path="/" component={HomePage}  exact></Route>
              <Route path="/about" component={AboutPage} exact></Route>
              <Route path="/articles/:name" component={ArticlesPage} ></Route>
              <Route path="/articles-list" component={ArticlesListPage} exact></Route>
              <Route component={NotFoundPage}></Route>
          </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
