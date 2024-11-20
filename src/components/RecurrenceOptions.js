import React, { useState } from "react";

const RecurrenceOptions = ({
  recurringType,
  onTypeChange,
  interval,
  onIntervalChange,
  onDayOfWeekChange,
  dayOfWeek,
  nthDayOfMonth,
  onNthDayChange,
}) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div>
      <h4>Recurrence Type</h4>
      <select
        value={recurringType}
        onChange={(e) => onTypeChange(e.target.value)}
      >
        <option value="none">None</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      {recurringType !== "none" && (
        <div>
          <label>Recurrence Interval: </label>
          <input
            type="number"
            value={interval}
            onChange={(e) => onIntervalChange(Number(e.target.value))}
            min={1}
            style={{ width: "50px" }}
          />
          <span>
            {" "}
            {recurringType === "daily"
              ? "days"
              : recurringType === "weekly"
              ? "weeks"
              : recurringType === "monthly"
              ? "months"
              : "years"}
          </span>
        </div>
      )}

      {recurringType === "weekly" && (
        <div>
          <h4>Specific Days of the Week</h4>
          {daysOfWeek.map((day, index) => (
            <div key={index}>
              <input
                type="checkbox"
                //value={index}
                checked={dayOfWeek.includes(index)}
                onChange={() => onDayOfWeekChange(index)}
              />
              {day}
            </div>
          ))}
        </div>
      )}

      {recurringType === "monthly" && (
        <div>
          <h4>The nth day of the month</h4>
          <select
            value={nthDayOfMonth}
            onChange={(e) => onNthDayChange(e.target.value)}
          >
            <option value="">Default (Day of the Month)</option>
            {["1st", "2nd", "3rd", "4th", "Last"].map((nth, nthIndex) =>
              [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day, dayIndex) => (
                <option
                  key={`${nthIndex}-${dayIndex}`}
                  value={`${dayIndex} ${nthIndex + 1}`}
                >
                  {`${nth} ${day}`}
                </option>
              ))
            )}
          </select>
        </div>
      )}
    </div>
  );
};

export default RecurrenceOptions;
