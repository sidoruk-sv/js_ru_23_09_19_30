import React, { Component, PropTypes } from 'react';

export default class NewCommentForm extends Component {
    static propTypes = {

    };
    state = {
        comment: '',
        authorName: ''
    }

    handleAuthorNameChange = ev => {
        this.setState({ authorName: ev.target.value })
    };

    handleCommentChange = ev => {
        this.setState({ comment: ev.target.value })
    }

    handleSubmit = ev => {
        ev.preventDefault();

        var authorName = this.state.authorName.trim();
        var comment = this.state.comment.trim();
        if (!authorName || !comment) {
            return;
        }

        window.console.info(`newComment: ${comment} by ${authorName}`);
        this.setState({ authorName: '', comment: '' });
    }

    render() {
        return (
          <form className="commentForm" onSubmit={this.handleSubmit}>
              <fieldset>
                  <legend>Write a comment:</legend>
                  <div>
                      Your Name:<br/>
                      <input type="text"
                             required="required"
                             value={this.state.authorName}
                             onChange={this.handleAuthorNameChange}/>
                  </div>
                  <div>
                      Your Comment:<br/>
                      <textarea type="text"
                                required="required"
                                value={this.state.comment}
                                onChange={this.handleCommentChange}/>
                  </div>
                  <div>
                      <input type="submit" value="Post Comment"/>
                  </div>
              </fieldset>
          </form>

        )
    }
}
