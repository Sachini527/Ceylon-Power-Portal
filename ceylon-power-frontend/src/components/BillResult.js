import React from 'react';

function BillResult({ data }) {
  return (
    <div className="bill-result">
      <h3>Bill Details</h3>
      <div className="bill-details">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="bill-item">
            <div className="bill-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
            <div className="bill-value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BillResult;