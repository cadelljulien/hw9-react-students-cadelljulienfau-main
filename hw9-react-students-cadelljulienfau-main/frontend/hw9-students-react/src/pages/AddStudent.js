import React from 'react'
import {useState} from 'react'
import axios from 'axios'

/**
 * function: AddStudent() is a component that adds a student using inputs from user
 * for which it then performs a POST request
 * @return html data to the app
 */
export default function AddStudent() {
    let [first_name, setFirstName] = useState("");
    let [last_name, setLastName] = useState("");
    let [gpa, setGPA] = useState("");
    let [enrollment, setEnrollment] = useState("");
    let [response, setResponse] = useState("");

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log("Add has been called");
    /**
     * Clears inputs, getting rid of easy task
     * @param {event} e
     */
    function clearInputs() {
        document.getElementById("first_name").value = "";
        document.getElementById("last_name").value = "";
        document.getElementById("gpa").value = "";
        document.getElementById("enrollment").value = "";
    }
    /**
     * function: sendStudent() sends the student inputs to the server. 
     * adding a student to the mongodb database. It Utilizes
     * axios to make the request. Called when during the onSubmit call in the html below
     * @param {event} e
     */
    let sendStudent = (e) => {
        console.log("sendStudent inside of AddStudent has been called");
        e.preventDefault();
        console.log(first_name, last_name, gpa, enrollment);

        setError(null);
        setLoading(first_name, last_name, gpa, enrollment);

        axios.post('http://localhost:5678/students',{
            first_name: first_name,
            last_name: last_name,
            gpa: gpa,
            enrolled: enrollment
        })
        .then(function (response) {
            //handle success
            setError(false);
            setLoading(false);
            setResponse(response);
            console.log("the response to the front end is: ");
            console.dir(response);
            console.log("response.data: " + response.data);
            clearInputs();
        })
        .catch(function (error) {
            setResponse(error);
            setLoading(false);
            setError(true);
            console.log("The error during and error is: " + error);
            clearInputs();
        })
        .then(function () {
            clearInputs();
        })
    }
    return(

    <div>
        <br />
        <h3>Add Student</h3>
        <form onSubmit={sendStudent}>
            <label htmlFor="first_name">First Name: </label>
            <input type="text" id="first_name" name="first_name"
                value={first_name}
                onChange={(e) => {setFirstName(e.target.value) }} />
                <br />
                <br />
            <label htmlFor="last_name">Last Name: </label>
            <input type="text" id="last_name" name="last_name"
                value={last_name}
                onChange={(e) => {setLastName(e.target.value) }} />
                <br />
                <br />
            <label htmlFor="gpa">GPA: </label>
            <input type="text" id="gpa" name="gpa"
                value={gpa}
                onChange={(e) => {setGPA(e.target.value) }} />
                <br />
                <br />
            <label htmlFor="Enrollment">Enrollment: </label>
            <input type="text" id="enrollment" name="enrollment"
                value={enrollment}
                onChange={(e) => {setEnrollment(e.target.value) }} />
                            <br />
                <br />
            <button>{loading ? "submitting..." : "add Student"}</button>
            {loading && <p>Loading...</p>}
            {error && <p style={{color: 'green', 'fontWeight': 'bold' }}>added successfully</p>}
            <div><p style={{ color: 'red', 'fontWeight': 'bold' }}></p>{response.data}</div>
        </form>
        <button onClick={clearInputs}>Clear</button> {/* new clear button */}
    </div>
    
    )
}