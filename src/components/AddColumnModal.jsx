import React, { useState } from "react";


function AddColumnModal({ isOpen, onClose, onSubmit, onAddColumn }) {
  const [colName, setColName] = useState("");

  const handleChangeColName = (e) => {
    setColName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedData = {
      colName,
    };
    onSubmit(submittedData);
    setColName("");

    // Invoke the onAddColumn function
    onAddColumn();
  };

  const handleModalClose = () => {
    setColName("");
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center z-50 ">
          <div className="modal-content bg-white animate-fade-in rounded p-5">
            <div className="w-full flex justify-end">
            <span
              className="close text-2xl text-black hover:text-red-500 cursor-pointer"
              onClick={handleModalClose}
            >
              &times;
            </span>
            </div>
            
            <h2 variant="h4" color="black" className="text-left font-bold">
              New Column
            </h2>
            <h2 color="gray" className="text-left font-thin">
              Enter a column name.
            </h2>

            <form onSubmit={handleSubmit}>
              <div className=" mt-3">
                <input
                  label="column name"
                  className="bg-gray-50 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={colName}
                  onChange={handleChangeColName}
                />
              </div>

              <div className="flex justify-center">
                <button type="submit" className="mt-6 border hover:scale-105 duration-500 bg-green-400 text-white font-medium rounded p-2">
                  Add Column
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddColumnModal;
