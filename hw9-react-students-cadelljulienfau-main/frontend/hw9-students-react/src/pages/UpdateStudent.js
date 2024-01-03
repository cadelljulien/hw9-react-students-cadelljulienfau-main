import { useState } from 'react';
import axios from 'axios';

/**
 * function: UpdateStudent() is a component that take in  
 * the id and other inputs from user
 * for which it then performs a PUT request
 * @return html data to the app
 */
export default function UpdateStudent() {
  const [student, setStudent] = useState({
    id: "",
    first_name: "",
    last_name: "",
    gpa: "",
  });
    /**
     * Variables
     */
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log("Update has been called");
    /**
     * function:  updatetudent() sends the student id to the server. If a student with
     * that user ID exists then it gets updaed from the mongodb database with user inputs. It Utilizes
     * axios to make the request. Called when during the onSubmit call in the html below
     * @param {event} e
     */
  function updateStudent(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    axios.put(`http://localhost:5678/students/${student.id}`, {
      first_name: student.first_name,
      last_name: student.last_name,
      gpa: student.gpa,
      enrolled: "true"
    })
    .then(function (response) {
      setLoading(false);
      console.log(response);
    })
    .catch(function (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    });
  }
    /**
     * Clears inputs from users
     * @param {event} e
     */
  function clearInputs() {
    setStudent({
      ...student,
      first_name: "",
      last_name: "",
      gpa: "",
      id: ""
    });
  }

  return (
    <div>
      <h3>Update Student</h3>
      <label htmlFor="id">Student Record ID:</label>
      <input
        type="text"
        id="id"
        name="id"
        value={student.id}
        onChange={(e) => setStudent({ ...student, id: e.target.value })}
      />
      <br />
      <label htmlFor="first_name">First Name:</label>
      <input
        type="text"
        id="first_name"
        name="first_name"
        value={student.first_name}
        onChange={(e) => setStudent({ ...student, first_name: e.target.value })}
      />
      <br />
      <label htmlFor="last_name">Last Name:</label>
      <input
        type="text"
        id="last_name"
        name="last_name"
        value={student.last_name}
        onChange={(e) => setStudent({ ...student, last_name: e.target.value })}
      />
      <br />
      <label htmlFor="gpa">GPA:</label>
      <input
        type="text"
        id="gpa"
        name="gpa"
        value={student.gpa}
        onChange={(e) => setStudent({ ...student, gpa: e.target.value })}
      />
      <br />
      <button onClick={updateStudent}>{loading ? "Updating..." : "Update Student"}</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'green', fontWeight: 'bold' }}>updated successfully</p>}
      <button onClick={clearInputs}>Clear Inputs</button>
    </div>
  );
}
