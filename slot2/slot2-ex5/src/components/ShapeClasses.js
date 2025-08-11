import React, { useState } from 'react';
import './ShapeClasses.css';

class Shape {
  constructor(color) {
    this._color = color; // Private property
  }

  getArea() {
    return 0; // Superclass defines expected behavior
  }

  toString() {
    return `Shape with color: ${this._color}`;
  }

  get color() {
    return this._color;
  }
}

class Rectangle extends Shape {
  constructor(color, length, width) {
    super(color);
    this._length = length;
    this._width = width;
  }

  getArea() {
    return this._length * this._width;
  }

  toString() {
    return `Rectangle with color: ${this._color}, length: ${this._length}, width: ${this._width}`;
  }

  get length() {
    return this._length;
  }

  get width() {
    return this._width;
  }
}

class Triangle extends Shape {
  constructor(color, base, height) {
    super(color);
    this._base = base;
    this._height = height;
  }

  getArea() {
    return 0.5 * this._base * this._height;
  }

  toString() {
    return `Triangle with color: ${this._color}, base: ${this._base}, height: ${this._height}`;
  }

  get base() {
    return this._base;
  }

  get height() {
    return this._height;
  }
}

const ShapeClasses = () => {
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);

  const createShapes = () => {
    const newShapes = [
      new Shape('Red'),
      new Rectangle('Blue', 5, 3),
      new Triangle('Green', 4, 6)
    ];
    setShapes(newShapes);
  };

  const selectShape = (shape, index) => {
    setSelectedShape({ shape, index });
  };

  return (
    <div className="shape-classes-container">
      <h2>Bài tập 4: Tạo classes theo UML diagram</h2>
      
      <div className="uml-diagram">
        <h3>UML Class Diagram:</h3>
        <div className="class-diagram">
          <div className="class-box superclass">
            <h4>Shape (Superclass)</h4>
            <div className="properties">
              <p><strong>Private:</strong> -color: String</p>
            </div>
            <div className="methods">
              <p><strong>Public:</strong></p>
              <p>+getArea(): double</p>
              <p>+toString(): String</p>
            </div>
            <div className="explanation">
              <p>Superclass định nghĩa các hành vi mong đợi (public interface) của tất cả subclasses. Lập trình ở public interface.</p>
            </div>
          </div>
          
          <div className="inheritance-arrow">↓</div>
          
          <div className="subclasses">
            <div className="class-box subclass">
              <h4>Rectangle</h4>
              <div className="properties">
                <p><strong>Private:</strong></p>
                <p>-length: int</p>
                <p>-width: int</p>
              </div>
              <div className="methods">
                <p><strong>Public:</strong></p>
                <p>+getArea(): double</p>
                <p>+toString(): String</p>
              </div>
            </div>
            
            <div className="class-box subclass">
              <h4>Triangle</h4>
              <div className="properties">
                <p><strong>Private:</strong></p>
                <p>-base: int</p>
                <p>-height: int</p>
              </div>
              <div className="methods">
                <p><strong>Public:</strong></p>
                <p>+getArea(): double</p>
                <p>+toString(): String</p>
              </div>
            </div>
          </div>
          
          <div className="explanation-bottom">
            <p>Subclasses cung cấp các implementation thực tế.</p>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Demo Classes:</h3>
        <button onClick={createShapes} className="create-btn">
          Tạo các hình dạng
        </button>

        {shapes.length > 0 && (
          <div className="shapes-display">
            <h4>Các hình dạng đã tạo:</h4>
            <div className="shapes-list">
              {shapes.map((shape, index) => (
                <div 
                  key={index} 
                  className={`shape-item ${selectedShape?.index === index ? 'selected' : ''}`}
                  onClick={() => selectShape(shape, index)}
                >
                  <h5>{shape.constructor.name}</h5>
                  <p><strong>Color:</strong> {shape.color}</p>
                  <p><strong>Area:</strong> {shape.getArea()}</p>
                  <p><strong>toString:</strong> {shape.toString()}</p>
                  
                  {shape instanceof Rectangle && (
                    <>
                      <p><strong>Length:</strong> {shape.length}</p>
                      <p><strong>Width:</strong> {shape.width}</p>
                    </>
                  )}
                  
                  {shape instanceof Triangle && (
                    <>
                      <p><strong>Base:</strong> {shape.base}</p>
                      <p><strong>Height:</strong> {shape.height}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="code-explanation">
        <h3>Giải thích code:</h3>
        <ul>
          <li><strong>Inheritance:</strong> Rectangle và Triangle kế thừa từ Shape</li>
          <li><strong>Encapsulation:</strong> Sử dụng private properties với dấu gạch dưới</li>
          <li><strong>Polymorphism:</strong> Mỗi subclass có implementation riêng cho getArea()</li>
          <li><strong>ES6 Classes:</strong> Sử dụng cú pháp class của ES6</li>
          <li><strong>Constructor:</strong> super() để gọi constructor của superclass</li>
        </ul>
      </div>
    </div>
  );
};

export default ShapeClasses;
