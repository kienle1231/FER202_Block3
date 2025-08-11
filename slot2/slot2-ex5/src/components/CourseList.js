import React from 'react';
import './CourseList.css';

const CourseList = () => {
  const courses = ['React', 'ReactNative', 'NodeJs'];

  return (
    <div className="course-list-container">
      <h2 className="course-list-title">Course names</h2>
      <ul className="course-list">
        {courses.map((course, index) => (
          <li key={index} className="course-item">
            {course}
          </li>
        ))}
      </ul>
      <div className="exercise-info">
        <h3>Bài tập 5: Hiển thị danh sách khóa học</h3>
        <p>Danh sách được tạo bằng JSX với array methods</p>
      </div>
    </div>
  );
};

export default CourseList;
