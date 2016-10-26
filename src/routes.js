import React from 'react'
import { Router, Route, Redirect, IndexRedirect, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Container from './components/Container'
import Counter from './components/Counter'
import ArticleListPage from './routeHandlers/ArticleListPage'
import Filters from './components/Filters'
import NewArticleForm from './components/NewArticleForm'
import ArticlePage from './routeHandlers/ArticlePage'
import CommentListPage from './routeHandlers/CommentListPage'
import NotFoundPage from './routeHandlers/NotFoundPage'
import CommentsRoot from './routeHandlers/CommentsRoot'
import CommentsPage from './routeHandlers/CommentsPage'
import ArticleIndexPage from './routeHandlers/ArticleIndexPage'
import ErrorPage from './routeHandlers/ErrorPage'
import history from './history'
import { checkAuth } from './store/helpers'

export default <Router history = {history}>
    <Route path = "/" component = {Container}>
        <IndexRedirect to = "/articles" />
        <Redirect from="article" to="/articles" />
        <Route path = "counter" component = {Counter} />
        <Route path = "articles" component = {ArticleListPage}
               onLeave = {(prevState) => console.log('leaving')}
               onChange = {() => console.log('changing route')}
        >
            <IndexRoute component = {ArticleIndexPage} />
            <Route path = "new" component = {NewArticleForm}
                onEnter = {(nextState, replace) => !checkAuth() && replace('/error?message=authorized only')}
            />
            <Route path = ":id" component = {ArticlePage} />
        </Route>
        <Route path = "comments/:pageNumber" component = {CommentListPage} />
        <Route path = "filters" component = {Filters} />
        <Route path = "comments" component = {CommentsRoot}>
            <IndexRedirect to = "1" />
            <Route path = ":page" components = {{commentPage: CommentsPage, counter: Counter}} />
        </Route>
        <Route path = "error" component = {ErrorPage} />
        <Route path = "*" component = {NotFoundPage} />
    </Route>
</Router>
