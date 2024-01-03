import React from 'react';
import { useState } from 'react';
import axios from 'axios';


export default function GetStudent() {
  const [students, setStudents] = useState([]);
  console.log("List has been called");
/**
 * function: gettudents() is a component that gets all students from a click of button
 */
  function getStudents() {
    axios.get(`http://localhost:5678/students`).then((response) => {
      setStudents(response.data);
    });
  }

  return (
    <div>
      <h3>Get Students</h3>
      <button onClick={getStudents}>List All Students</button>
      <br />
      <br />
      {students.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>GPA</th>
              <th>Enrollment</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
          <tr key={student.record_id} style={{ backgroundColor: '#f2f2f2' }}>
          <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.record_id}</td>
          <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.first_name}</td>
          <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.last_name}</td>
          <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.gpa}</td>
          <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.enrolled}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
