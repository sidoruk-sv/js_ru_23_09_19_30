import React, { Component, PropTypes } from 'react'
import ArticleList from './ArticleList'
import Calendar from './Calendar'
import Chart from './Chart'
import NewArticleForm from './NewArticleForm'
import Filter from './Filters'
import Counter from './Counter'

class Container extends Component {
    static propTypes = {
    };

    render() {
        return (
            <div>
                <Counter />
                <Filter articles={[]}/>
                <ArticleList />
                <Chart />
                <NewArticleForm />
                <Calendar />
            </div>
        )
    }
}

export default Container
