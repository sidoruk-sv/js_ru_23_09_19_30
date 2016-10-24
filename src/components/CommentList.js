import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from './../decorators/toggleOpen'
import NewCommentForm from './NewCommentForm'
import Loader from './Loader'
import { connect } from 'react-redux'
import { getRelation } from '../store/helpers'
import { COMMENTS_PAGE_LIMIT } from '../constants'
import { addComment, loadCommentsForArticle, loadCommentListPage } from '../AC/comments'

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array,
        //form toggleOpen decorator
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    componentWillReceiveProps(nextProps) {
        const {
          article: { id, commentsLoading, commentsLoaded },
          isOpen,
          comments,
          pageNumber,
          loadCommentsForArticle,
          loadCommentListPage
        } = nextProps

        // sorry, I didn't have time to finish that
        // think to such a way:
        // if (this.props.pageNumber != pageNumber && !comments && !comments.length)) loadCommentListPage(pageNumber)

        if (isOpen && !this.props.isOpen && !commentsLoaded && !commentsLoading) loadCommentsForArticle(id)
    }

    render() {
        const { article, comments, addComment, isOpen, toggleOpen } = this.props
        const newCommentForm = article ? <NewCommentForm articleId={article.id} addComment={addComment}/> : null
        if (!comments || !comments.length) return <div>
            <p>No comments yet</p>
            {newCommentForm}
        </div>

        const commentItems = article.commentsLoaded && comments.map(comment => <li key={comment.id}><Comment comment={comment}/></li>)
        const text = isOpen ? 'hide comments' : `show ${comments.length} comments`
        const content = article.commentsLoading || !article.commentsLoaded ? <Loader /> : <ul>{commentItems}</ul>

        const body = isOpen && <div>
                {content}
                {newCommentForm}
            </div>

        return (
            <div>
                <a href="#" onClick={toggleOpen}>{text}</a>
                {body}
            </div>
        )
    }
}

export default connect((state, props) => {
    const { article, pageNumber } = props
    const { comments } = state

    if (article) {
        return { comments: getRelation(article, 'comments', state) }
    } else {
        return {
                  comments: comments.getIn(['entities', pageNumber]),
                  loaded: comments.get('loaded'),
                  loading: comments.get('loading'),
                  firstPage: pageNumber == 1,
                  lastPage: pageNumber * COMMENTS_PAGE_LIMIT >= comments.get('total')
        }
    }
}, { addComment, loadCommentsForArticle, loadCommentListPage })(toggleOpen(CommentList))
