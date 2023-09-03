import React, { useState } from "react";

function Modal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [event, setEvent] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("");
  const [date, setDate] = useState("");

  const handleChangeEvent = (e) => {
    setEvent(e.target.value);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
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
      date,
      startTime,
      endTime,
      color,
      duration,
    };
    onSubmit(submittedData);
    setTitle("");
    setEvent("");
    setStartTime("");
    setEndTime("");
    setColor("");
    setDate("");
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
          <div className="modal-content bg-slate-50 border animate-fade-in p-2 rounded p-5">
            <span
              className="close text-2xl text-black hover:text-red-500 cursor-pointer"
              onClick={onClose}
            >
              &times;
            </span>
            <h1 className="font-bold text-lg">New Instructor Avalibility</h1>
            <h2 className="mt-1 font-normal">Enter your details</h2>

            <form onSubmit={handleSubmit}>
              <div className="mt-3">
                <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  placeholder="Name"
                  type="text"
                  value={title}
                  onChange={handleChangeTitle}
                />
              </div>

              <div className=" mt-3">
                <textarea
                  placeholder="Notes"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={event}
                  onChange={handleChangeEvent}
                />
              </div>

              <div className=" mt-3">
                <input
                  placeholder="Date"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="date"
                  value={date}
                  onChange={handleChangeDate}
                />
              </div>
              <h4 className="mt-3 font-sm">
                Enter the times you're avalible from.
              </h4>
              <div className="mb-4 mt-2 flex items-center gap-4">
                <label>Start</label>
                <input
                  label="Start Time"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="time"
                  value={startTime}
                  onChange={handleChangeStartTime}
                />
                <label className="">End</label>
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  label="End Time"
                  type="time"
                  value={endTime}
                  onChange={handleChangeEndTime}
                />
              </div>

              <div className="w-20 flex mx-auto">
                <select
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200"
                  value={color}
                  onChange={handleChangeColor}
                >
                  <option
                    className="w-full max-h-96 p-3 border border-blue-gray-50 rounded-md shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-white overflow-auto focus:outline-none"
                    value=""
                    selected
                    disabled
                    hidden
                  >
                    Color
                  </option>

                  <option
                    className="w-full max-h-96 p-3 border border-blue-gray-50 rounded-md shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 overflow-auto focus:outline-none"
                    value="blue"
                  >
                    Blue
                  </option>
                  <option
                    className="w-full max-h-96 p-3 border border-blue-gray-50 rounded-md shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 overflow-auto focus:outline-none"
                    value="green"
                  >
                    Green
                  </option>
                  <option
                    className="w-full max-h-96 p-3 border border-blue-gray-50 rounded-md shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 overflow-auto focus:outline-none"
                    value="red"
                  >
                    Red
                  </option>
                </select>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="mt-6 border hover:scale-105 duration-500 bg-green-400 text-white font-medium rounded p-2">
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

export default Modal;
