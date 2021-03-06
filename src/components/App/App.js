import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import UserPage from "../UserPage/UserPage";

//importing the newly built components:
import Welcome from "../Welcome/Welcome";
import FormPg1 from "../Form/FormPg1";
import FormPg2 from "../Form/FormPg2";
import FormPg3 from "../Form/FormPg3";
import ReviewForm from "../ReviewForm/ReviewForm";
import EventCalendar from "../Calendar/EventCalendar";
import Admin from "../Admin/Admin";
import AdminDetails from "../Admin/AdminDetails";
//importing stylesheet for app
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/welcome */}
            <Redirect exact from="/" to="/welcome" />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute exact path="/home" component={UserPage} />
            {/* Protected/Routes for Components that were built for group project are below */}
            <Route exact path="/welcome" component={Welcome} />
            <ProtectedRoute exact path="/form-page-1" component={FormPg1} />
            <ProtectedRoute exact path="/form-page-2" component={FormPg2} />
            <ProtectedRoute exact path="/form-page-3" component={FormPg3} />
            <ProtectedRoute exact path="/review" component={ReviewForm} />
            <ProtectedRoute exact path="/calendar" component={EventCalendar} />
            <ProtectedRoute exact path="/admin" component={Admin} />
            />
            <ProtectedRoute
              exact
              path="/admin-details"
              component={AdminDetails}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
