import React, { useState } from "react";
import { startOfWeek, startOfDay, addDays, subDays } from "date-fns";
import DayModal from "./DayModal.jsx";
import AddColumnModal from "./AddColumnModal.jsx";
import { v4 as uuidv4 } from "uuid";

import { useNavigate } from "react-router-dom";
import WeekBtn from "./WeekBtn.jsx";
import DayBtn from "./DayBtn.jsx";

////// NEXT THING TO IMPLEMENT IS LINKING THE CREATED COLUMNS TO THE DATE SO WHEN YOU CHANGE THE DATE IT GOES TO AND EMPTY GRID BUT KEEPS CREAETED COLUMNS /////////////////

function DayScheduler() {
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

  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [colName, setColName] = useState([]);

  const openAddColumnModal = () => {
    setIsAddColumnModalOpen(true);
  };

  const closeAddColumnModal = () => {
    setIsAddColumnModalOpen(false);
  };

  const handleAddColumnSubmit = (colData) => {
    const { colName } = colData;
    const newCol = {
      id: "COLUMN" + "_" + uuidv4(),
      colName,
    };

    setColName((prevColumns) => [...prevColumns, newCol]);
    // Close the modal
    closeAddColumnModal();
    console.log(newCol);
  };

  // Go to the next day
  const goToNextDay = () => {
    setStartDateOfWeek((prevStartDate) => addDays(prevStartDate, 1));
  };
  // Go to the previous day
  const goToPreviousDay = () => {
    setStartDateOfWeek((prevStartDate) => subDays(prevStartDate, 1));
  };
  // Start date of the week
  const [startDateOfWeek, setStartDateOfWeek] = useState(
    startOfWeek(new Date())
  );

  // Go to current week
  const goToCurrentWeek = () => {
    setStartDateOfWeek(startOfWeek(new Date()));
  };

  // Go to current day
  const goToCurrentDay = () => {
    setStartDateOfWeek(startOfDay(new Date()));
  };

  const navigate = useNavigate();

  // Generate an array of days in the current week
  const daysOfWeek = Array.from({ length: 1 }, (_, index) => {
    const date = new Date(startDateOfWeek);
    date.setDate(startDateOfWeek.getDate() + index);
    return date;
  });

  const timeSlots = [
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
  ];

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(0); // Initialize selectedColumn state with 0 or any other default value

  // State variable to hold the events data
  const [events, setEvents] = useState([]);

  // Open the modal
  const handleDataInput = (selectedCol) => {
    setSelectedColumn(selectedCol); // Set the selectedColumn state when opening the modal
    setModalOpen(true);
  };

  // Close the modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Submit modal form data
  const handleModalSubmit = (data) => {
    const {
      title,
      event,
      date,
      startTime,
      endTime,
      color,
      selectedColumn,
      duration,
    } = data;

    const newEvent = {
      id: "EVENT" + "_" + "DAY" + "_" + uuidv4(),
      title,
      event,
      startTime,
      endTime,
      color,
      selectedColumn,
      duration,
      date: new Date(startDateOfWeek), // Set the specific date for the new event
    };

    // Find the selected column by index
    const selectedColumnEvents = events.filter(
      (event) => event.date === colName[selectedColumn].colName
    );

    // Check if there are any events in the selected column at the same start time
    const conflictingEvent = selectedColumnEvents.find(
      (event) => event.startTime === startTime
    );

    if (conflictingEvent) {
      // Handle conflicts, e.g., show a message to the user or prevent adding the event
      alert(
        "An event already exists at the selected time in the chosen column. Please choose a different time or column."
      );
      return;
    }

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
    const currentDate = daysOfWeek[0]; // Get the specific date for the current day
    const matchingEvents = events.filter(
      (event) =>
        event.date.getTime() === currentDate.getTime() && // Compare dates by their time value
        event.selectedColumn === columnIndex &&
        event.startTime.slice(0, 2) === timeSlots[rowIndex]
    );

    return (
      <div
        key={`${rowIndex}-${columnIndex}`}
        className={`bg-neutral-50 border w-full border-slate-200 text-center rounded h-[60px] ${
          matchingEvents.length > 0 ? "relative" : ""
        }`}
      >
        {matchingEvents.map((event) => {
          const minutes = event.startTime.slice(3, 5);

          return (
            <div
              key={event.id}
              id={event.id}
              className={`relative w-full cursor-pointer duration-500 ease-in-out  ${
                event.clicked ? "bg-opacity-100 scale-125 z-30" : "bg-opacity-75 z-20"
              } absolute top-0 left-0 overflow-clip border-l-4 
              ${event.color === 'red' ? 'border-red-600' : event.color === 'blue' ? 'border-blue-600' : event.color === 'green' ? 'border-green-600' : ''} rounded-l rounded-r 
              ${event.color === 'red' ? 'bg-red-400' : event.color === 'blue' ? 'bg-blue-400' : event.color === 'green' ? 'bg-green-400' : ''}`}
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
              <div
                className={`m-1 ${event.color === 'red' ? 'text-red-700' : event.color === 'blue' ? 'text-blue-700' : event.color === 'green' ? 'text-green-700' : ''}  text-sm break-words`}
              >
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
    <div key={index} className="text-center ">
      <div className="text-2xl font-sans my-2 ">{day.getDate()}</div>
      <div className="mt-3">
        {day.toLocaleString("en-US", { weekday: "long" })}
      </div>
    </div>
  ));

  // Generate the time column elements
  const timeColumnElements = Array.from({ length: 16 }, (_, timeIndex) => (
    <div
      key={timeIndex}
      className="text-right text-sm text-gray-300 rounded h-[60px]"
    >
      {timeIndex + 7}:00
    </div>
  ));

  // Function to add a column
  const addColumn = () => {
    setNumberOfColumns((prevColumns) => prevColumns + 1);
  };

  const [numberOfColumns, setNumberOfColumns] = useState(0);
  // Generate the main grid elements
  const gridElements = Array.from({ length: 16 }, (_, rowIndex) =>
    Array.from({ length: numberOfColumns }, (_, columnIndex) =>
      renderGridElement(rowIndex, columnIndex)
    )
  ).flat();

  return (
    <>
      <div className="container mx-auto pt-2 my-2 min-h-[700px] pb-5 px-4 bg-white rounded-xl">
        <div className="main-btn-div ml-1 w-max">
          <div className="date-arrows mt-2 flex justify-between">
            <button
              onClick={goToPreviousDay}
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
              onClick={goToNextDay}
              className="ml-3 shadow shadow-zinc-200 p-3 rounded bg-white text-black hover:bg-zinc-50"
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
            <button
              onClick={goToCurrentDay}
              className="w-28 shadow shadow-zinc-200 py-1 px-1 rounded bg-white text-black hover:bg-zinc-50"
            >
              Current Day
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
        </div>

        {/* Header section */}
        <div className="flex">
          {/* Time column filler */}
          <div className="time-column-filler mr-px w-10">
            <div className="text-right text-sm text-gray-300 rounded h-16"></div>
          </div>
          {/* Date header */}
          <div className=" m-px mb-2 w-full">
            <div className="flex">
              <div className="relative border w-max border-slate-200 bg-neutral-50 p-1 rounded-lg">
                {dateHeaderElements}
              </div>
              <div className="flex-grow w-full"></div>

              <div className="add-btn flex flex-wrap content-end">
                <button
                  onClick={handleDataInput}
                  className="bg-green-400 mr-1 rounded-md w-28 h-10 font-semibold text-white drop-shadow-lg ease-in-out duration-500 hover:scale-105 focus:bg-green-200"
                >
                  + Add Event
                </button>
              </div>
              <div className="flex flex-wrap content-end">
                <button
                  onClick={openAddColumnModal}
                  className="bg-green-400 rounded-md w-28 h-10 font-semibold text-white drop-shadow-lg ease-in-out duration-500 hover:scale-105 focus:bg-green-200"
                >
                  + Add Column
                </button>
              </div>
            </div>

            <div
              className={`overflow-hidden grid gap-1 mt-2 relative text-center`}
              style={{
                gridTemplateColumns: `repeat(${numberOfColumns}, minmax(0, 1fr))`,
              }}
            >
              {colName.length === 0 && (
                <p className="text-gray-300 my-auto bg-neutral-50 w-max border border-slate-200 mx-auto p-2 rounded">
                  Use the Add Column button to add a new custom column.
                </p>
              )}
              {colName.map((column, index) => (
                <div
                  key={index}
                  className="bg-neutral-50 border border-slate-200 rounded-lg"
                  onClick={() => handleDataInput(index)} // Pass the selected column index when clicking on a column
                >
                  <p>{column.colName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex">
          {/* Time column */}
          {colName.length > 0 && (
            <div className="mr-px grid w-10">{timeColumnElements}</div>
          )}
          {/* Main grid */}
          <div className="w-full m-px">
            <div
              className={`grid gap-[3px] relative`}
              style={{
                gridTemplateColumns: `repeat(${numberOfColumns}, minmax(0, 1fr))`,
              }}
            >
              {gridElements}
            </div>
          </div>
        </div>
      </div>

      <AddColumnModal
        isOpen={isAddColumnModalOpen}
        onClose={closeAddColumnModal}
        onSubmit={handleAddColumnSubmit}
        onAddColumn={addColumn}
      />

      <DayModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        colName={colName} // Pass colName state to the modal
        onAddColumn={addColumn} // Pass the addColumn function to the modal
      />
    </>
  );
}

export default DayScheduler;
