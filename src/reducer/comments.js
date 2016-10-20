import { arrayToMap } from '../store/helpers';
import { ADD_COMMENT, LOAD_COMMENT_LIST, SUCCESS } from '../constants';
import { Record, Map } from 'immutable';

const CommentModel = Record({
    id: null,
    user: '',
    text: '',
    comments_loading: false,
    comments_loaded: false
})

const defaultState = new Map({
    entities: arrayToMap([], comment => new CommentModel(comment))
})


export default (comments = defaultState, action) => {
    const { type, payload, response, error, generatedId } = action

    switch (type) {
        case ADD_COMMENT:
            return comments.setIn(['entities', generatedId], new CommentModel({ ...payload.comment, id: generatedId }))

        case LOAD_COMMENT_LIST + SUCCESS:
            return comments
              .update('entities', entities => entities.merge(arrayToMap(response, comment => new CommentModel(comment))))
    }

    return comments
}
