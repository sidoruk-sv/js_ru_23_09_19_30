import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import 'react-select/dist/react-select.css'
import { changeSelectedFilter } from '../AC/filters'

class SelectFilter extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    };

    handleChange = selected => {
        this.props.changeSelectedFilter(selected)
    }

    render() {
        const { articles } = this.props
        const { selected }  = this.props.filters
        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return <Select
            options={options}
            value={selected}
            multi={true}
            onChange={this.handleChange}
        />
    }
}

export default connect(state => ({
    articles: state.articles,
    //и снова не нужны все фильтры
    filters: state.filters
}), {
    changeSelectedFilter
})(SelectFilter)
