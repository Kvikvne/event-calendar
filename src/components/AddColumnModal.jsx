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
          <div className="modal-content bg-slate-50 animate-fade-in p-2 rounded p-5">
            <span
              className="close text-2xl text-black hover:text-red-500 cursor-pointer"
              onClick={handleModalClose}
            >
              &times;
            </span>
            <h2 variant="h4" color="black">
              New Column
            </h2>
            <h2 color="gray" className="mt-1 font-normal">
              Enter a column name.
            </h2>

            <form onSubmit={handleSubmit}>
              <div className=" mt-3">
                <input
                  label="column name"
                  className=""
                  type="text"
                  value={colName}
                  onChange={handleChangeColName}
                />
              </div>

              <div className="flex justify-center">
                <button type="submit" className="mt-6">
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
