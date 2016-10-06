import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  state = {
    from: null,
    to: null,
  };

  handleDayClick(e, day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick(e) {
    e.preventDefault();
    this.setState({ from: null, to: null });
  }

  render() {
    const { from, to } = this.state;
    return (
      <div>
        Calendar: <br/>
        <DayPicker
          ref="daypicker"
          style={{ "float": "left" }}
          selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
          onDayClick={ this.handleDayClick }
        />
      </div>

    );
  }

}
