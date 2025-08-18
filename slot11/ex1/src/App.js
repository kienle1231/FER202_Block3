import React, { useState } from "react";
import ProfileForm from "./component/ProfileForm";
import "./App.css";

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
    setSubmittedData(formData);
  };

  return (
    <div className="App">
      <ProfileForm onSubmit={handleSubmit} />
      
      {submittedData && (
        <div className="submitted-data">
          <h3>Dữ liệu đã submit:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
