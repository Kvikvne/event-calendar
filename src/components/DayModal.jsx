import React, { useState } from "react";


function DayModal({ isOpen, onClose, onSubmit, colName }) {
  const [title, setTitle] = useState("");
  const [event, setEvent] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("");
  const [selectedColumn, setSelectedColumn] = useState(0);

  const handleChangeSelectedColumn = (e) => {
    setSelectedColumn(parseInt(e.target.value)); // Convert the selected value to an integer and store it in selectedColumn state
  };

  const handleChangeEvent = (e) => {
    setEvent(e.target.value);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeStartTime = (e) => {
    setStartTime(e.target.value);
  };

  const handleChangeEndTime = (e) => {
    setEndTime(e.target.value);
  };

  const handleChangeColor = (e) => {
    setColor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const duration = calculateDuration(startTime, endTime);
    const submittedData = {
      title,
      event,
      startTime,
      endTime,
      color,
      duration, // Include the duration in the submitted data
      selectedColumn,
    };
    onSubmit(submittedData);
    setTitle("");
    setEvent("");
    setStartTime("");
    setEndTime("");
    setColor("");
    onClose();
      
  };

  const calculateDuration = (start, end) => {
    const startTime = new Date(`1970/01/01 ${start}`);
    const endTime = new Date(`1970/01/01 ${end}`);
    const duration = Math.abs(endTime - startTime) / 36e5; // Calculate duration in hours
    return duration;
  };

  return (
    <>
      {isOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center z-50 ">
          <div className="modal-content bg-slate-50 animate-fade-in p-2 rounded p-5">
            <span
              className="close text-2xl text-black hover:text-red-500 cursor-pointer"
              onClick={onClose}
            >
              &times;
            </span>
            <h1 variant="h4" color="black">
              New Event
            </h1>
            <h3 color="gray" className="mt-1 font-normal">
              Enter your details and avalibility.
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mt-3">
                <input
                  label="Name"
                  size="lg"
                  type="text"
                  value={title}
                  onChange={handleChangeTitle}
                />
              </div>

              <div className=" mt-3">
                <textarea
                  label="Notes"
                  className=""
                  type="text"
                  value={event}
                  onChange={handleChangeEvent}
                />
              </div>

              <h4 color="gray" className="mt-3 font-sm">
                Enter the times you're avalible from.
              </h4>
              <div className="mb-4 mt-2 flex items-center gap-4">
                <input
                  label="Start Time"
                  className=""
                  type="time"
                  value={startTime}
                  onChange={handleChangeStartTime}
                />

                <input
                  className=""
                  label="End Time"
                  type="time"
                  value={endTime}
                  onChange={handleChangeEndTime}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="columnSelect" className="text-gray-600 font-sm">
                  Select Column:
                </label>
                <select
                  id="columnSelect"
                  value={selectedColumn}
                  onChange={handleChangeSelectedColumn}
                  className="w-full mt-1 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-300"
                >
                  {colName.map((column, index) => (
                    <option key={index} value={index}>
                      {column.colName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-20 flex mx-auto">
                <select
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200"
                  value={color}
                  onChange={handleChangeColor}
                >
                  <option
                    className="w-full max-h-96 bg-white p-3 border border-blue-gray-50 rounded-md shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-white overflow-auto focus:outline-none"
                    value=""
                    selected
                    disabled
                    hidden
                  >
                    Color
                  </option>
                  <option
                    className="w-full max-h-96 bg-white p-3 border border-blue-gray-50 rounded-md shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 overflow-auto focus:outline-none"
                    value="red"
                  >
                    Red
                  </option>
                  <option
                    className="w-full max-h-96 bg-white p-3 border border-blue-gray-50 rounded-md shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 overflow-auto focus:outline-none"
                    value="blue"
                  >
                    Blue
                  </option>
                  <option
                    className="w-full max-h-96 bg-white p-3 border border-blue-gray-50 rounded-md shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 overflow-auto focus:outline-none"
                    value="green"
                  >
                    Green
                  </option>
                </select>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="mt-6">
                  Add Avalibility
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default DayModal;
