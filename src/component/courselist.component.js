import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import {Link} from "react-router-dom";
import {ACCESS_TOKEN_NAME, API_BASE_URL} from "../constants";


export default class showCourseDetails extends Component {

    constructor(props) {
        super(props);

        this.onChangeCourseName = this.onChangeCoursename.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            coursename: '',
            subjects: [],
            students: []
        }
    }

    componentDidMount() {

        axios.get( localStorage.getItem(API_BASE_URL) + '/classdetails/courses' ,{ headers: { 'Authorization': localStorage.getItem(ACCESS_TOKEN_NAME) }})
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        subjects: response.data.map(subject_id => subject_id ),
                        coursename: response.data[0]
                    })
                }
            })
            .catch((error) => {
                console.log('token used was');
                console.log(">" + localStorage.getItem(ACCESS_TOKEN_NAME) + "<");
                console.log(error);
            })

    }

    onChangeCoursename(e) {
        this.setState({
            coursename: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();
        console.log("Course ID selected is: " + this.state.coursename)
        axios.get(localStorage.getItem(API_BASE_URL) + '/classdetails/students?courseid=' + this.state.coursename,{ headers: { 'Authorization': localStorage.getItem(ACCESS_TOKEN_NAME) }})
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        students: response.data.map(students => students)
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

        //window.location = '/';


    }

    render() {
        return (
            <div>
                <h3>Class Details</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Subject_ID: </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.coursename}
                                onChange={this.onChangeCourseName}>
                            {
                                this.state.subjects.map(function(user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>                    </div>

                    <div className="form-group">
                        <input type="submit" value="Show Enrolled Students" className="btn btn-primary" />
                    </div>

                    <div>

                        <table className="table">
                            <thead className="thead-light">
                            <tr>
                                <th>Student ID</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.students.map(function(elem){
                                return Student({student_id:elem})
                                })
                            }
                            </tbody>
                        </table>
                    </div>

                </form>
            </div>
        )
    }


}

const Student = props => (
    <tr>
        <td>{props.student_id}</td>
    </tr>
)
