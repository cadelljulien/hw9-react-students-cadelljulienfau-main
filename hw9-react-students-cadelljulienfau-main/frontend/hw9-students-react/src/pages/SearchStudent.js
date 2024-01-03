import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function GetStudent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [student, setStudent] = useState(null);
  console.log("Search Single by Name has been called");
    /**
   * function: gettudent() is a component that get a student using inputs from user
   * for which it then performs a Get request from first and last name
   * @return html data to the app
   */

  function getStudent(e) {
    e.preventDefault();
    axios.get(`http://localhost:5678/students/${firstName}/${lastName}`).then((response) => {
      setStudent(response.data);
    });
  }

  return (
    <div>
      <h3>Search Student</h3>
      <form onSubmit={getStudent}>
        <label htmlFor="firstName">First Name: </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="lastName">Last Name: </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <br />
        <button>Get Student</button>
      </form>
      <br />
      {student && (
        <table>
          <tbody>
            <tr>
              <td style={{ backgroundColor:'#f2f2f2' }}>Record ID:</td>
              <td>{student.record_id}</td>
            </tr>
            <tr>
              <td>First Name:</td>
              <td style={{ backgroundColor:'#f2f2f2' }}>{student.first_name}</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: '#f2f2f2' }}>Last Name:</td>
              <td>{student.last_name}</td>
            </tr>
            <tr>
              <td>GPA:</td>
              <td style={{ backgroundColor: '#f2f2f2' }}>{student.gpa}</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: '#f2f2f2' }}>Enrollment:</td>
              <td>{student.enrolled}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

