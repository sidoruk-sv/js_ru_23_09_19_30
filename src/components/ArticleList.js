import React, { Component, PropTypes } from 'react'
import Article from './Article'
import accordion from './../decorators/accordion'
import { connect } from 'react-redux'

class ArticleList extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        //from accordion decorator
        toggleItem: PropTypes.func.isRequired,
        isItemOpen: PropTypes.func.isRequired
    };

    render() {
        const { articles, toggleItem, isItemOpen } = this.props

        const articleComponents = articles.map(article => (
            <li key={article.id} >
                <Article article = {article} isOpen = {isItemOpen(article.id)} openArticle = {toggleItem(article.id)} />
            </li>))

        return (
            <ul>
                {articleComponents}
            </ul>
        )
    }
}

export default connect(state => ({
    articles: state.articles.filter(article => filterArticles(article, state.filters))
}))(accordion(ArticleList))


function getMilliseconds(dateString) {
    return (new Date(dateString)).getTime()
}

function filterArticles(article, filters) {
    if (!(filters.range.from || filters.range.to || filters.selected.length)) {
        return true
    }

    if (filters.selected.length) {
        return filters.selected.some((selectedArticle) => {
            return selectedArticle.value == article.id
        });
    }

    const dateFilterActive = Object.keys(filters.range).filter(key => !!filters.range[key]).length
    if (dateFilterActive) {
        const articleDate = getMilliseconds(article.date);
        const fromDate = getMilliseconds(filters.range.from);

        if (filters.range.from && filters.range.to) {
            const toDate = getMilliseconds(filters.range.to);
            return articleDate >= fromDate && articleDate <= toDate
        } else {
            return fromDate === articleDate
        }
    }
}
