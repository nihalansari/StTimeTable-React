import React, { Component } from 'react';
import axios from 'axios';
import {ACCESS_TOKEN_NAME, API_BASE_URL} from "../constants";
import auth from "./auth";

export default class LoginForm extends Component {
    constructor(props) {
        localStorage.setItem(API_BASE_URL,"https://studenttimetable-node.mybluemix.net");
        //localStorage.setItem(API_BASE_URL,"http://localhost:3000");

        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            cookie: null
        }
    }

        onChangeUsername(e){
            this.setState({
                username: e.target.value
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
                username: this.state.username, password: this.state.password
            }

            console.log(user);
            console.log(localStorage.getItem(API_BASE_URL));
            axios.post(localStorage.getItem(API_BASE_URL) + '/login', user)
                .then(res => {
                    console.log(res.data)
                    //localStorage.setItem(ACCESS_TOKEN_NAME,res.data.token);
                    //set auth.authenticated = TRUE
                    auth.login(()=>{
                        localStorage.setItem(ACCESS_TOKEN_NAME,"Bearer " + res.data.token);
                    })
                })
                .catch(err => console.log(err));

            this.setState({
                username: '',
                email: '',
                password: ''
            })

        }

    render(){
        return (
            <div>
                <h3>Please Sign in to the application...</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
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
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}