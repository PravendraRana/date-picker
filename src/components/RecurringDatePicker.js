import React, { useState, useEffect } from "react";
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  eachDayOfInterval,
} from "date-fns";
import RecurrenceOptions from "./RecurrenceOptions";
import MiniCalendarPreview from "./MiniCalendarPreview";
import DateRangePicker from "./DateRangePicker";

const RecurringDatePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [recurringType, setRecurringType] = useState("none");
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [dayOfWeek, setDayOfWeek] = useState([]);
  const [nthDayOfMonth, setNthDayOfMonth] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);

  const toggleDayOfWeek = (day) => {
    setDayOfWeek((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Helper function to generate recurring dates
  const generateRecurringDates = () => {
    if (!startDate) return [];

    let dates = [];
    let currentDate = startDate;
    const maxEndDate = endDate || addYears(startDate, 1); // Default to one year if no end date is set

    if (recurringType === "daily") {
      dates = eachDayOfInterval({
        start: startDate,
        end: maxEndDate,
      }).filter((_, i) => i % recurrenceInterval === 0);
    } else if (recurringType === "weekly") {
      while (currentDate <= maxEndDate) {
        dayOfWeek.forEach((day) => {
          const nextDate = new Date(currentDate);
          nextDate.setDate(
            currentDate.getDate() + ((day - currentDate.getDay() + 7) % 7)
          ); // Move to the correct day of the week
          if (nextDate >= startDate && nextDate <= maxEndDate) {
            dates.push(nextDate);
          }
        });
        currentDate = addWeeks(currentDate, recurrenceInterval);
      }
    } else if (recurringType === "monthly") {
      while (currentDate <= maxEndDate) {
        if (nthDayOfMonth) {
          // Handle nth day of the month
          const nthDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
          );
          const nthOccurrences = [];

          for (let i = 1; i <= 31; i++) {
            nthDate.setDate(i);
            if (nthDate.getDay() === parseInt(nthDayOfMonth.split(" ")[0])) {
              nthOccurrences.push(new Date(nthDate));
            }
          }

          const nthIndex = parseInt(nthDayOfMonth.split(" ")[1]) - 1;
          if (nthOccurrences[nthIndex]) {
            const selectedNthDate = nthOccurrences[nthIndex];
            if (selectedNthDate >= startDate && selectedNthDate <= maxEndDate) {
              dates.push(selectedNthDate);
            }
          }
        } else {
          // Default: Add the same day of the month
          const monthlyDate = new Date(currentDate);
          if (monthlyDate >= startDate && monthlyDate <= maxEndDate) {
            dates.push(monthlyDate);
          }
        }
        currentDate = addMonths(currentDate, recurrenceInterval);
      }
    } else if (recurringType === "yearly") {
      while (currentDate <= maxEndDate) {
        if (currentDate >= startDate && currentDate <= maxEndDate) {
          dates.push(new Date(currentDate));
        }
        currentDate = addYears(currentDate, recurrenceInterval);
      }
    }

    setSelectedDates(dates);
  };

  useEffect(() => {
    generateRecurringDates();
  }, [
    startDate,
    endDate,
    recurringType,
    recurrenceInterval,
    dayOfWeek,
    nthDayOfMonth,
  ]);

  return (
    <div>
      <h1>Recurring Date Picker</h1>

      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <RecurrenceOptions
        recurringType={recurringType}
        onTypeChange={setRecurringType}
        interval={recurrenceInterval}
        onIntervalChange={setRecurrenceInterval}
        onDayOfWeekChange={toggleDayOfWeek}
        dayOfWeek={dayOfWeek}
        nthDayOfMonth={nthDayOfMonth}
        onNthDayChange={setNthDayOfMonth}
      />

      <MiniCalendarPreview selectedDates={selectedDates} />
    </div>
  );
};

export default RecurringDatePicker;
