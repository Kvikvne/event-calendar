import React, { useState, useEffect } from "react";
import { startOfWeek, subWeeks, addWeeks } from "date-fns";
import Modal from "./Modal.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import WeekBtn from "./WeekBtn.jsx";
import DayBtn from "./DayBtn.jsx";
import { v4 as uuidv4 } from "uuid";

function FlightScheduler() {
  const location = useLocation();
  const isWeekButtonFocused = location.pathname === "/schedule/week";
  const isDayButtonFocused = location.pathname === "/schedule/day";
  // Start date of the week
  const [startDateOfWeek, setStartDateOfWeek] = useState(
    startOfWeek(new Date())
  );

  // Go to current week
  const goToCurrentWeek = () => {
    setStartDateOfWeek(startOfWeek(new Date()));
  };

  // SVG icons for previous and next week buttons
  const arrowLeft = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
      />
    </svg>
  );
  const arrowRight = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
      />
    </svg>
  );

  const navigate = useNavigate();

  // Generate an array of days in the current week
  const daysOfWeek = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDateOfWeek);
    date.setDate(startDateOfWeek.getDate() + index);
    return date;
  });

  const timeSlots = ["09", "10", "11", "12", "13", "14", "15", "16"];

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);

  // State variable to hold the events data
  const [events, setEvents] = useState([]);

  // Open the modal
  const handleDataInput = () => {
    setModalOpen(true);
  };

  // Close the modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Submit modal form data

  // Go to the previous week
  const goToPreviousWeek = () => {
    setStartDateOfWeek((prevStartDate) => subWeeks(prevStartDate, 1));
  };

  // Go to the next week
  const goToNextWeek = () => {
    setStartDateOfWeek((prevStartDate) => addWeeks(prevStartDate, 1));
  };

  // Submit modal form data
  const handleModalSubmit = (data) => {
    const { event, title, startTime, date, duration, color } = data;

    const newEvent = {
      id: "EVENT" + "_" + uuidv4(),
      event,
      title,
      startTime,
      date,
      duration,
      color,
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setModalOpen(false);
    console.log(newEvent);
  };

  const handleEventClick = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, clicked: !event.clicked } : event
      )
    );
  };

  const renderGridElement = (rowIndex, columnIndex) => {
    const matchingEvents = events.filter(
      (event) =>
        event.date === daysOfWeek[columnIndex].toISOString().split("T")[0] &&
        event.startTime.slice(0, 2) === timeSlots[rowIndex] // Adjust the index to match timeSlots array
    );

    return (
      <div
        key={`${rowIndex}-${columnIndex}`}
        className={`bg-neutral-50 border w-full border-slate-200 text-center rounded h-[60px] ${
          matchingEvents.length > 0 ? "relative" : ""
        }`}
      >
        {matchingEvents.map((event) => {
          const minutes = event.startTime.slice(3, 5); // Calculate minutes for each event

          return (
            <div
              key={event.id}
              id={event.id}
              className={`relative ${event.color === 'red' ? 'bg-red-400' : event.color === 'blue' ? 'bg-blue-400' : event.color === 'green' ? 'bg-green-400' : ''} w-full cursor-pointer duration-500 ease-in-out  ${
                event.clicked ? "bg-opacity-100 scale-125 z-30" : "bg-opacity-75 z-20"} 
                absolute top-0 left-0 overflow-clip border-l-4 ${event.color === 'red' ? 'border-red-600' : event.color === 'blue' ? 'border-blue-600' : event.color === 'green' ? 'border-green-600' : ''} rounded-l rounded-r `}
              style={{
                height: event.clicked
                  ? "auto"
                  : `${event.duration * 3 + event.duration * 60 - 3}px`,
                marginTop: `${minutes}px`,
              }}
              onClick={() => handleEventClick(event.id)}
            >
              <div className={`${event.color === 'red' ? 'text-red-700' : event.color === 'blue' ? 'text-blue-700' : event.color === 'green' ? 'text-green-700' : ''} font-bold break-words`}>
                {event.title}
              </div>
              <div className={`m-1 ${event.color === 'red' ? 'text-red-700' : event.color === 'blue' ? 'text-blue-700' : event.color === 'green' ? 'text-green-700' : ''} text-sm break-words`}>
                {event.event}
              </div>
            </div>
          );
        })}
        {/* Column: {columnIndex}, Row: {rowIndex} */}
      </div>
    );
  };
  // Generate the date header elements
  const dateHeaderElements = daysOfWeek.map((day, index) => (
    <div key={index} className="w-full text-center ">
      <div className="text-2xl font-sans my-2 ">{day.getDate()}</div>
      <div className="mt-3">
        {day.toLocaleString("en-US", { weekday: "long" })}
      </div>
    </div>
  ));

  // Generate the time column elements
  const timeColumnElements = Array.from({ length: 8 }, (_, timeIndex) => (
    <div
      key={timeIndex}
      className="text-right text-sm text-gray-300 rounded h-[60px]"
    >
      {timeIndex + 9}:00
    </div>
  ));

  // Generate the main grid elements
  const gridElements = Array.from({ length: 8 }, (_, rowIndex) =>
    Array.from({ length: 7 }, (_, columnIndex) =>
      renderGridElement(rowIndex, columnIndex)
    )
  ).flat();

  return (
    <>
      <div className="container mx-auto mb-10 pb-5 px-4 pt-2 bg-gray-50 rounded shadow-xl">
        <div className="main-btn-div ml-1  w-max">
          <div className="date-arrows mt-2 flex justify-between">
            <button
              onClick={goToPreviousWeek}
              className="mr-3 shadow shadow-zinc-200 p-3 rounded bg-white text-black hover:bg-zinc-50"
            >
              {arrowLeft}
            </button>

            <span className="font-bold my-auto text-xl w-30">
              {startDateOfWeek.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>

            <button
              onClick={goToNextWeek}
              className="ml-3 shadow shadow-zinc-200 p-3 rounded bg-red-400s text-black hover:bg-zinc-50"
            >
              {arrowRight}
            </button>
          </div>

          <div className="current-btns mt-2 flex justify-around">
            <button
              onClick={goToCurrentWeek}
              className="w-28 shadow shadow-zinc-200 py-1 px-1 rounded bg-white text-black hover:bg-zinc-50"
            >
              Current Week
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="week-day-btn flex justify-around mb-3 mx-10 mt-6">
            <div className="mr-1">
              <WeekBtn />
            </div>
            <DayBtn />
          </div>
          <div className="flex-grow w-full"></div>
          <div className="add-btn mr-1 mt-5">
            <button
              onClick={handleDataInput}
              className="bg-green-400 rounded-md w-max px-2 h-10 font-semibold text-white drop-shadow-lg ease-in-out duration-500 hover:scale-105 focus:bg-green-200"
            >
              + Add Avalibilty 
            </button>
          </div>
        </div>

        {/* Header section */}
        <div className="flex">
          {/* Time column filler */}
          <div className="time-column-filler mr-px w-10">
            <div className="text-right text-sm text-gray-300 rounded h-16"></div>
          </div>
          {/* Date header */}
          <div className="w-full m-px mb-2">
            <div className="grid grid-cols-7 relative border border-slate-200 bg-neutral-50 p-1 rounded-lg">
              {dateHeaderElements}
            </div>
          </div>
        </div>
        <div className="flex">
          {/* Time column */}
          <div className="mr-px grid w-10">{timeColumnElements}</div>
          {/* Main grid */}
          <div className="w-full m-px">
            <div className="grid gap-[3px] grid-cols-7 relative">
              {gridElements}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </>
  );
}

export default FlightScheduler;
