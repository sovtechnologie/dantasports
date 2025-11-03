import React from "react";

const Batch = ({ selectedBatch, setSelectedBatch }) => {
  const handleBatchChange = (batchType) => {
    const updated = selectedBatch.includes(batchType)
      ? selectedBatch.filter((b) => b !== batchType)
      : [...selectedBatch, batchType];

    setSelectedBatch(updated);
  };

  return (
    <div className="filter_inner_cards">
      <h2>Batch</h2>

      <div className="d-flex justify-content-between">
        <div>
          <label className="form-check-label" htmlFor="batch1">
            1-on-1 Classes
          </label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            id="batch1"
            checked={selectedBatch.includes("1-on-1 classes")}
            onChange={() => handleBatchChange("1-on-1 classes")}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <div>
          <label className="form-check-label" htmlFor="batch2">
            Group Classes
          </label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            id="batch2"
            checked={selectedBatch.includes("group classes")}
            onChange={() => handleBatchChange("group classes")}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <div>
          <label className="form-check-label" htmlFor="batch3">
            Online Classes
          </label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            id="batch3"
            checked={selectedBatch.includes("online classes")}
            onChange={() => handleBatchChange("online classes")}
          />
        </div>
      </div>
    </div>
  );
};

export default Batch;
