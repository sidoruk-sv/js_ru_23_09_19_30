import {
  ADD_COMMENT,
  LOAD_COMMENTS_FOR_ARTICLE,
  LOAD_COMMENTS_LIST,
  COMMENTS_PAGE_LIMIT,
  START,
  SUCCESS
} from '../constants'
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
export function loadCommentListPage(pageNumber) {
    const currentPage = pageNumber - 1;
    const offset = currentPage * COMMENTS_PAGE_LIMIT;
    return {
        type: LOAD_COMMENTS_LIST,
        payload: { pageNumber },
        callAPI: `/api/comment?limit=${COMMENTS_PAGE_LIMIT},offset=${offset}`
    }
}

export function loadCommentsForArticle(articleId) {
    return {
        type: LOAD_COMMENTS_FOR_ARTICLE,
        payload: { articleId },
        callAPI: `/api/comment?article=${articleId}`
    }
}

/*
export function loadCommentsForArticle(articleId) {
    return (dispatch) => {
        dispatch({
            type: LOAD_COMMENTS_FOR_ARTICLE + START,
            payload: { articleId }
        })

        $.get(`/api/comment?article=${articleId}`)
            .done(response => dispatch({
                type: LOAD_COMMENTS_FOR_ARTICLE + SUCCESS,
                payload: { articleId },
                response
            }))
    }
}
*/
