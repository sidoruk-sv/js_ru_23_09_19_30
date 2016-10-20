import React, { Component, PropTypes } from 'react';
import Comment from './Comment';
import toggleOpen from './../decorators/toggleOpen';
import NewCommentForm from './NewCommentForm';
import { connect } from 'react-redux';
import { getRelation } from '../store/helpers';
import { addComment, loadCommentList } from '../AC/comments';
import Loader from './Loader';

class CommentList extends Component {

    static propTypes = {
        comments: PropTypes.array,
        article: PropTypes.object.isRequired,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    componentWillUpdate(nextProps) {
        const { article, isOpen, loadCommentList } = this.props
        if (nextProps.isOpen && !isOpen && (!article.comments_loaded || !article.comments_loading)) loadCommentList(article.id)
    }

    render() {
        const { article, comments, addComment, isOpen, toggleOpen } = this.props
        const loader = article.comments_loading ? <Loader /> : null

        if (!comments || !comments.length) {
            return (<div>
                <p>No comments yet</p>
                <NewCommentForm articleId={article.id} addComment={addComment}/>
            </div>)
        }

        const commentItems = article.comments_loaded ?
          comments.map(comment => <li key={comment.id}><Comment comment={comment}/></li>) : null
        const text = isOpen ? 'hide comments' : `show ${comments.length} comments`
        const body = isOpen && <div>
              {loader}
              <ul>{commentItems}</ul>
              <NewCommentForm articleId={article.id} addComment={addComment}/>
          </div>

        return (
          <div>
              <a href="#" onClick={toggleOpen}>{text}</a>
              {body}
          </div>
        )
    }

}

export default connect((state, props) => ({
    comments: getRelation(props.article, 'comments', state)
}), { addComment, loadCommentList })(toggleOpen(CommentList))
