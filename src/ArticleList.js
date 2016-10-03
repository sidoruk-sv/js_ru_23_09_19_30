import React, { Component, PropTypes } from 'react'
import Article from './Article'
import Chart from './Chart'
import accordion from './decorators/accordion'

const nullable = (type) => React.PropTypes.oneOfType([ React.PropTypes.oneOf([ null ]), type ]);

class ArticleList extends Component {
    static propTypes = {
        toggleActiveAccordionItem:PropTypes.func.isRequired,
        activeAccordionItemId: nullable(PropTypes.string.isRequired),
        articles: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired
    };

    render() {
        const { articles, toggleActiveAccordionItem, activeAccordionItemId } = this.props

        const articleComponents = articles.map(article => (
            <li key={article.id} >
                <Article article = {article}
                         isOpen = {article.id == activeAccordionItemId}
                         openArticle = { toggleActiveAccordionItem(article.id) }/>
            </li>))

        return (
            <div>
                <ul>
                    {articleComponents}
                </ul>
                <Chart />
            </div>
        )
    }
}

export default accordion(ArticleList)
