import React, { Component } from 'react';
import axios from 'axios';
import {ACCESS_TOKEN_NAME, API_BASE_URL} from "../constants";

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username: '',
            email: '',
            password: ''

        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username, email: this.state.email, password: this.state.password
        }

        console.log(user);

        axios.post(localStorage.getItem(API_BASE_URL) + '/users/add',user,{
            headers: {
                'Authorization': localStorage.getItem(ACCESS_TOKEN_NAME)
            }
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        this.setState({
            username: '',
            email: '',
            password: ''
        })

    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                        />
                        <label>Email: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                        />
                        <label>Password: </label>
                        <input  type= "password"
                                required
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>

                </form>
            </div>

        )
    }
}
