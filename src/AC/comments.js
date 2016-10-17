import { ADD_COMMENT } from '../constants'

export function addComment(articleId, user, text) {
    return {
        type: ADD_COMMENT,
        payload: { articleId, user, text }
    }
}
