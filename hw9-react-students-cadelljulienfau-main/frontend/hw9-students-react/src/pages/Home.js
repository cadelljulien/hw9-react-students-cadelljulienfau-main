import React from 'react'
import {useState} from 'react'
import axios from 'axios'

/**
 * function: Home() is a component that adds a student using inputs from user
 * for which it then performs a POST request
 * @return html data to the app
 */
export default function Home() {
    // eslint-disable-next-line
    let [first_name, setFirstName] = useState("");
    // eslint-disable-next-line
    let [last_name, setLastName] = useState("");
    // eslint-disable-next-line
    let [gpa, setGPA] = useState("");
    // eslint-disable-next-line
    let [enrollment, setEnrollment] = useState("");
    // eslint-disable-next-line
    let [response, setResponse] = useState("");
    // eslint-disable-next-line
    const [error, setError] = useState(null);
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false);
    console.log("Home has been called");
    /**
     * Clears inputs, getting rid of easy task
     * @param {event} e
     */
    // eslint-disable-next-line
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
        console.log("sendStudent inside of Home has been called");
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
        <h3>Welcome: Navaigate through the navbar to start</h3>
        <form onSubmit={sendStudent}>
        </form>
    
    </div>
    
    )
}