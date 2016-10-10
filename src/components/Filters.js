import React, { Component, PropTypes } from 'react'
import DatePicker from './DatePicker'
import SelectFilter from './SelectFilter'

class Filter extends Component {
    render() {
        return (
            <div>
                <DatePicker />
                <SelectFilter />
            </div>
        )
    }
}

export default Filter
