import { normalizedComments } from '../fixtures'
import { arrayToMapOfRecords } from '../store/helpers'
import { ADD_COMMENT } from '../constants'
import { Record } from 'immutable'

const commentRecord = new Record({
    id : null,
    user : null,
    text: null

})


export default (comments = arrayToMapOfRecords(normalizedComments, commentRecord), action) => {
    const { type, payload, response, error } = action

    switch (type) {
        case ADD_COMMENT:
            const { id } = payload

            const newComment = { [id] : new commentRecord(payload) }
            return {...comments, ...newComment }
    }

    return comments
}
