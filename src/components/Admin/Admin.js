import React, {Component} from 'react';
import { connect } from 'react-redux';
import "./Admin.css";
import { Link } from 'react-router-dom';

class Admin extends Component {

  state = {
    formId: "",
    approvalStatus: false
  }
  componentDidMount = () => {
    // this.props.dispatch({ type: "GET_ADMIN" });
    this.getAdminForm();
  };

  getAdminForm = () => {
    console.log("in getForm on ADMIN component", this.props.reduxState.user.id);
    this.props.dispatch({
      type: "GET_ADMIN",
      payload: this.props.reduxState.user.id,
    });
  };

  // Appproval status button function
  updateApprovalStatus = (formId,update,approved) => {
    console.log("in updateApprovalStatus", update, formId);
    this.props.dispatch({
      type: "SET_STATUS_1",
      payload: formId,
      update,
      approved,
    });
    this.getAdminForm(); 
  };

  details = (id) => {
    this.props.history.push("/admin-details");
    this.props.dispatch({
      type: "GET_ADMIN_FORM",
      formId: id,
    });
  };

  render() {
    console.log("checking admin reducer", this.props.reduxState.admin);
    return (
      <div className="Admin">
        <h1>Events Waiting for Approval</h1>
        {/* <p>Kathy's Shopping Night </p>
          <select>
            <option >UNAPPROVE</option>
            <option>APPROVE</option>
        </select> */}

        <>
          <table className="adminTable">
            <thead>
              <tr className="adminTable">
                <th className="adminTableHead">Name:</th>
                <th className="adminTableHead">Email:</th>
                <th className="adminTableHead">Phone:</th>
                <th className="adminTableHead">Company Name:</th>
                <th className="adminTableHead">Event Type:</th>
                <th className="adminTableHead">Status:</th>
                <th className="adminTableHead">Actions:</th>
              </tr>
            </thead>
            <tbody>
              {this.props.reduxState.admin.length > 0 && (
                <>
                  {this.props.reduxState.admin.map((events) => {
                    return (
                      <tr className="adminTable">
                        {/* <td key={events.id}> */}
                          <center>
                            <td className="tdEvent">
                              {events.contact_first_name}{" "}
                              {events.contact_last_name}
                            </td>
                            <td className="tdEvent">{events.contact_email}</td>
                            <td className="tdEvent">{events.contact_phone}</td>
                            <td className="tdEvent">{events.company_name}</td>
                            <td className="tdEvent">{events.event_type}</td>
                            <td>
                              <button
                                className="statusButton"
                                onClick={() =>
                                  this.updateApprovalStatus(
                                    events.id,
                                    events.user_id,
                                    !events.approved
                                  )
                                }
                              >
                                {events.approved ? (
                                  <span role="img" aria-label="star">
                                    Approved
                                  </span>
                                ) : (
                                  <span role="img" aria-label="blackSquare">
                                    Unapproved
                                  </span>
                                )}
                              </button>
                            </td>
                            <td className="tdEvent">
                              <button onClick={() => this.details(events.id)}>
                                Details
                              </button>
                            </td>
                          </center>
                        {/* </td> */}
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState
  
});

export default connect(mapStateToProps)(Admin);