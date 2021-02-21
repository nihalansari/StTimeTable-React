import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./component/navbar.component";
import CourseList from "./component/courselist.component";
import CreateUser from "./component/createuser.component";
import LoginForm from "./component/loginForm.component";
import { ProtectedRoute } from "./component/protectedroute";

function App() {
  return (
      <Router>
      <Navbar />
      <br/>
      <Route path="/" exact component = {LoginForm} />
      <ProtectedRoute exact path="/course" component = {CourseList} />
      <ProtectedRoute exact path="/user" component = {CreateUser} />
      </Router>
  );
}

export default App;
