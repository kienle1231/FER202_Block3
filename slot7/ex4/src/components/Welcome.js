import React from "react";

const Welcome = ({ name }) => {
  return (
    <div className="p-3">
      <h3>Hello, {name}</h3>
    </div>
  );
};

export default Welcome;
