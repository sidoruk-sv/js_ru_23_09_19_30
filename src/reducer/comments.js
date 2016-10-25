import { arrayToMap } from '../store/helpers';
import { ADD_COMMENT, LOAD_COMMENTS_FOR_ARTICLE, LOAD_COMMENTS_LIST, SUCCESS } from '../constants';
import { Record, Map } from 'immutable';

const CommentModel = Record({
    id: null,
    user: '',
    text: ''
})

const defaultState = new Map({
    entities: new Map({}),
    total: null,
    loading: false,
    loaded: false
})

export default (comments = defaultState, action) => {
    const { type, payload, response, error, generatedId } = action

    switch (type) {
        case ADD_COMMENT:
            return comments.setIn(['entities', generatedId], new CommentModel({...payload.comment, id: generatedId}))

        case LOAD_COMMENTS_FOR_ARTICLE + SUCCESS:
            return comments.update('entities', entities =>
                entities.merge(arrayToMap(response, comment => new CommentModel(comment)))
            )

        case LOAD_COMMENTS_LIST + SUCCESS:
            //здесь помимо самих комментов стоит хранить для какой страницы ты их загружал
            return comments.update('entities', entities => {
                               return entities.merge(arrayToMap(response, comment => new CommentModel(comment)))
                           })
                           .set('loading', false)
                           .set('loaded', true)
    }

    return comments
}
