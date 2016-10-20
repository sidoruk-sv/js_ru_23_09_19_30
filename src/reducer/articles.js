import { normalizedArticles } from '../fixtures'
import { DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES, LOAD_COMMENT_LIST, LOAD_ARTICLE, START, SUCCESS, FAIL } from '../constants'
import { arrayToMap } from '../store/helpers'
import { Record, Map } from 'immutable'

const ArticleModel = Record({
    id: null,
    date: null,
    title: "",
    text: "",
    loading: false,
    comments: [],
    commentsLoading: false,
    commentsLoaded: false
})

const defaultState = new Map({
    entities: new Map({}),
    loading: false,
    loaded: false
})

export default (articles = defaultState, action) => {
    const { type, payload, generatedId, response } = action

    switch (type) {
        case DELETE_ARTICLE:
            return articles.deleteIn(['entities', payload.id])

        case ADD_COMMENT:
            return articles.updateIn(['entities', payload.articleId, 'comments'], comments => comments.concat(generatedId))

        case LOAD_ALL_ARTICLES + START:
            return articles.set('loading', true)

        case LOAD_ALL_ARTICLES + SUCCESS:
            return articles
                .update('entities', entities =>
                    entities.merge(arrayToMap(response,  article => new ArticleModel(article)))
                )
                .set('loading', false)
                .set('loaded', true)

        case LOAD_ARTICLE + START:
            return articles.setIn(['entities', payload.id, 'loading'], true)

        case LOAD_ARTICLE + SUCCESS:
            return articles.setIn(['entities', payload.id], new ArticleModel(response))

        case LOAD_COMMENT_LIST + START:
            return articles.setIn(['entities', payload.id, 'commentsLoading'], true)

        case LOAD_COMMENT_LIST + SUCCESS:
            return articles.setIn(['entities', payload.id, 'commentsLoading'], false)
                           .setIn(['entities', payload.id, 'commentsLoaded'], true)
    }

    return articles
}
