import React from "react";
import ProfileForm from "./component/ProfileForm";
import "./App.css";

function App() {
  const handleSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="App">
      <ProfileForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
