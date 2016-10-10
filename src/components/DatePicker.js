import React, { Component } from 'react';
import { connect } from 'react-redux';
import DayPicker, { DateUtils } from 'react-day-picker';
import { changeDateFilter } from '../AC/filters';
import 'react-day-picker/lib/style.css';

class DatePicker extends Component {

    handleDayClick = (e, day) => {
        const range = DateUtils.addDayToRange(day, this.props.filters.range)
        this.props.changeDateFilter(range);
    }

    render() {
        const { filters } = this.props
        const { from, to } = filters.range
        const selectedRange = from && to && `${from.toDateString()} - ${to.toDateString()}`
        return (
            <div className="date-range">
                <DayPicker
                    ref="daypicker"
                    selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
                    onDayClick={ this.handleDayClick }
                />
                {selectedRange}
            </div>
        );
    }

}

export default connect(state => ({
    filters: state.filters
}), {
    changeDateFilter
})(DatePicker)
