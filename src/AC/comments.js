import { ADD_COMMENT, LOAD_COMMENT_LIST, START, SUCCESS } from '../constants'
import $ from 'jquery'

export function addComment(comment, articleId) {
    return {
        type: ADD_COMMENT,
        payload: {
            articleId, comment
        },
        generateId: true
    }
}

export function loadCommentList(id) {
    return {
        type: LOAD_COMMENT_LIST,
        callAPI: `/api/comment?article=${id}`,
        payload: { id }
    }
}

export function loadCommentListThunk(id) {
    return (dispatch) => {
        dispatch({
            type: LOAD_COMMENT_LIST + START,
            payload: {id}
        })

        setTimeout(() => {
            $.get(`/api/comment?article=${id}`)
                .done(response => dispatch({
                    type: LOAD_COMMENT_LIST + SUCCESS,
                    payload: {id},
                    response
                }))
        }, 1000)
    }
}
