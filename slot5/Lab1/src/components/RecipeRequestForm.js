import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';

const RecipeRequestForm = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ingredient: '',
    prepTime: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Recipe request submitted successfully!');
    setFormData({
      name: '',
      email: '',
      ingredient: '',
      prepTime: '',
      notes: ''
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">
          <FaPaperPlane className="me-2" />
          Recipe Request Form
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Your Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Form.Text className="text-muted">
                  Please enter your name
                </Form.Text>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Form.Text className="text-muted">
                  Please provide a valid email
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Desired Ingredient *</Form.Label>
                <Form.Control
                  type="text"
                  name="ingredient"
                  placeholder="e.g., quinoa, salmon, avocado, sweet potato..."
                  value={formData.ingredient}
                  onChange={handleInputChange}
                  required
                />
                <Form.Text className="text-muted">
                  Please specify the ingredient you want
                </Form.Text>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Max Prep Time *</Form.Label>
                <Form.Select
                  name="prepTime"
                  value={formData.prepTime}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select prep time</option>
                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                </Form.Select>
                <Form.Text className="text-muted">
                  Please select a prep time
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              rows={4}
              placeholder="Tell us more about your recipe request... (e.g., dietary restrictions, cooking preferences, etc.)"
              value={formData.notes}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">
              Please provide additional notes
            </Form.Text>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            <FaTimes className="me-2" />
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            <FaPaperPlane className="me-2" />
            Submit Request
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RecipeRequestForm;
