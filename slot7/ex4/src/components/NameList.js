import React from "react";

const NameList = ({ names }) => {
  return (
    <div className="p-3">
      <h4>Hello</h4>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NameList;
