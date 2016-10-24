import React, { Component, PropTypes } from 'react'
import CommentList from '../components/CommentList'

class CommentListPage extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                Page: {this.props.params.pageNumber}
                <CommentList pageNumber = {this.props.params.pageNumber} isOpen = {true} />
            </div>
        )
    }
}

export default CommentListPage
