import React, { useState, useEffect } from 'react';

class Shape {
  constructor(color) {
    this.color = color;
  }

  getArea() {
    return 0;
  }

  toString() {
    return `Shape with color: ${this.color}`;
  }
}

class Rectangle extends Shape {
  constructor(color, length, width) {
    super(color);
    this.length = length;
    this.width = width;
  }

  getArea() {
    return this.length * this.width;
  }

  toString() {
    return `Rectangle with color: ${this.color}, length: ${this.length}, width: ${this.width}, area: ${this.getArea()}`;
  }
}

class Triangle extends Shape {
  constructor(color, base, height) {
    super(color);
    this.base = base;
    this.height = height;
  }

  getArea() {
    return 0.5 * this.base * this.height;
  }

  toString() {
    return `Triangle with color: ${this.color}, base: ${this.base}, height: ${this.height}, area: ${this.getArea()}`;
  }
}

const ShapeClasses = () => {
  const [shapes, setShapes] = useState([]);
  const [results, setResults] = useState({});

  useEffect(() => {
    const shape1 = new Shape("Red");
    const rectangle1 = new Rectangle("Blue", 5, 3);
    const triangle1 = new Triangle("Green", 4, 6);

    const shapesArray = [shape1, rectangle1, triangle1];

    const testResults = {
      shapeInfo: shape1.toString(),
      rectangleInfo: rectangle1.toString(),
      triangleInfo: triangle1.toString(),
      rectangleArea: rectangle1.getArea(),
      triangleArea: triangle1.getArea(),
      shapeArea: shape1.getArea(),
      inheritanceTest: rectangle1 instanceof Shape,
      inheritanceTest2: triangle1 instanceof Shape
    };

    setShapes(shapesArray);
    setResults(testResults);
  }, []);

  return (
    <div className="section">
      <h2>4. Shape Classes (ES6 Classes)</h2>
      
      <div className="uml-diagram">
        <h3>UML Class Diagram:</h3>
        <div className="diagram-container">
          <div className="class-box superclass">
            <h4>Shape (Superclass)</h4>
            <div className="attributes">
              <p>-color: String</p>
            </div>
            <div className="methods">
              <p>+getArea(): double</p>
              <p>+toString(): String</p>
            </div>
            <div className="note">
              <p>Superclass defines the expected behaviors (public interface) of all subclasses. Program at the public interface.</p>
            </div>
          </div>
          
          <div className="inheritance-arrows">
            <div className="arrow">↑</div>
            <div className="arrow">↑</div>
          </div>
          
          <div className="subclasses">
            <div className="class-box subclass">
              <h4>Rectangle (Subclass)</h4>
              <div className="attributes">
                <p>-length: int</p>
                <p>-width: int</p>
              </div>
              <div className="methods">
                <p>+getArea(): double</p>
                <p>+toString(): String</p>
              </div>
            </div>
            
            <div className="class-box subclass">
              <h4>Triangle (Subclass)</h4>
              <div className="attributes">
                <p>-base: int</p>
                <p>-height: int</p>
              </div>
              <div className="methods">
                <p>+getArea(): double</p>
                <p>+toString(): String</p>
              </div>
              <div className="note">
                <p>Subclasses provide the actual Implementations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="results">
        <h3>Test Results:</h3>
        
        <div className="result-item">
          <h4>Shape Instance:</h4>
          <p>{results.shapeInfo}</p>
          <p>Area: <strong>{results.shapeArea}</strong></p>
        </div>

        <div className="result-item">
          <h4>Rectangle Instance:</h4>
          <p>{results.rectangleInfo}</p>
          <p>Area: <strong>{results.rectangleArea}</strong></p>
        </div>

        <div className="result-item">
          <h4>Triangle Instance:</h4>
          <p>{results.triangleInfo}</p>
          <p>Area: <strong>{results.triangleArea}</strong></p>
        </div>

        <div className="result-item">
          <h4>Inheritance Tests:</h4>
          <p>Rectangle instanceof Shape: <strong>{results.inheritanceTest ? 'True' : 'False'}</strong></p>
          <p>Triangle instanceof Shape: <strong>{results.inheritanceTest2 ? 'True' : 'False'}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default ShapeClasses;
