import React from "react";
import { format } from "date-fns";

const MiniCalendarPreview = ({ selectedDates }) => {
  return (
    <div>
      <h4>Preview of Recurring Dates</h4>
      <ul>
        {selectedDates.map((date, index) => (
          <li key={index}>{format(date, "yyyy-MM-dd")}</li>
        ))}
      </ul>
    </div>
  );
};

export default MiniCalendarPreview;
