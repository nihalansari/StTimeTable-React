import React, { Component } from 'react';
import axios from 'axios';
import {ACCESS_TOKEN_NAME, API_BASE_URL} from "../constants";

export default class QueryUser extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            userlist: []

        }
    }

    onSubmit(e) {
        e.preventDefault();

        axios.get(localStorage.getItem(API_BASE_URL)+ '/users' ,{ headers: { 'Authorization': localStorage.getItem(ACCESS_TOKEN_NAME) }})
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        userlist: response.data.map(user => user),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    render() {
        return (
            <div>
                <h3>Existing Users</h3>
                <br></br>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="submit" value="Refresh" className="btn btn-primary" />
                        <br></br><br></br>
                        <table className="table">
                            <thead className="thead-light">
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>MongoDB Obj ID</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.userlist.map(function(elem){
                                    return User({username:elem.username, email: elem.email, id: elem._id})
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

const User = props => (
    <tr>
        <td>{props.username}</td>
        <td>{props.email}</td>
        <td>{props.id}</td>
    </tr>
)
