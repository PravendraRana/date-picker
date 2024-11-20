import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div>
      <h4>Select Start and End Date</h4>
      <div>
        <label>Start Date: </label>
        <DatePicker
          selected={startDate}
          onChange={onStartDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a start date"
        />
      </div>
      <div>
        <label>End Date: </label>
        <DatePicker
          selected={endDate}
          onChange={onEndDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select an end date (optional)"
          isClearable
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
