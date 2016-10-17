import { normalizedArticles } from '../fixtures'
import { DELETE_ARTICLE, ADD_COMMENT } from '../constants'
import { arrayToMapOfRecords } from '../store/helpers'
import { Record } from 'immutable'

const articleRecord = new Record({
    id: null,
    date: null,
    title: null,
    text: null,
    comments: null
})

export default (articles = arrayToMapOfRecords(normalizedArticles, articleRecord), action) => {
    const { type, payload } = action

    switch (type) {
        case DELETE_ARTICLE:
            return articles.filter(article => article.id != payload.id)
            break;
        case ADD_COMMENT:
            const { articleId, id } = payload
            //не мутируй articles
            articles[articleId].set('comments', articles[articleId].get('comments').push(id))
    }

    return articles
}

