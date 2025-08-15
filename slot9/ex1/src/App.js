import React from "react";
import { Container, Card } from "react-bootstrap";
import AdvancedForm from "./components/AdvancedForm";
import "./App.css";

const App = () => {
  const handleFormSubmit = (formData) => {
    console.log("Dữ liệu đã gửi:", formData);
    alert("Form đã được submit thành công! Kiểm tra console để xem dữ liệu.");
  };

  return (
    <div className="App">
      <Container fluid className="py-4">
        <h1 className="text-center mb-4">Ứng Dụng React với PropTypes</h1>
        
        <Card>
          <Card.Body>
            <AdvancedForm 
              title="Đăng Ký Người Dùng " 
              onSubmit={handleFormSubmit} 
            />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default App;
