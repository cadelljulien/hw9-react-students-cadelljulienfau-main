import React from 'react'
import {useState} from 'react'
import axios from 'axios'

/**
 * function: DeleteStudent() is a component that takes a student id from the user
 * performs and performs a delete request
 * @return html data to the app
 */
export default function DeleteStudent() {
    // console.log("Delete has been called");
    let [id, setid] = useState('');
    let [response, setResponse] = useState('');

    const [error, setError] = useState(null);
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false);
    console.log("Delete has been called");

    /**
     * function: sendStudent() sends the student id to the server. If a student with
     * that user ID exists then it gets deleted from the mongodb database. It Utilizes
     * axios to make the request. Called when during the onSubmit call in the html below
     * @param {event} e
     */
    let sendStudent = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        axios.delete('http://localhost:5678/students/' + id)
        .then(function(response) {
            setError(false);
            setLoading(false);
            setResponse(response);
            console.log(response.data);
        })

        .catch(function(error) {
            setError(true);
            setLoading(false);
            setResponse(error);
            console.dir(error);
        })

        .then(function() {
            // always executed
        })
    }

    return (
        <div>
            <br />
            <form onSubmit={sendStudent}>
                <h3>Delete Student</h3>
                <label htmlFor="id">Student ID</label>
                <input type='text' id ='id' name ='id' value ={id}
                onChange = {(e) => {setid(e.target.value)} } />
                <button>{"Delete Student"}</button> 
                {error && <p style={{color: 'red', 'fontWeight': 'bold' }}>unsuccessful</p>}
                <div><p style={{ color: 'green', 'fontWeight': 'bold' }}>{response?.data?.message}</p></div>


            </form>
        </div>
    )
}
