import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  //helper method for form to help keep come DRY
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <lable>{field.lable}</lable>
        <input
          className='form-control'
          type={field.type}
          {...field.input}
        />
        <div className='text-help'>
          {touched ? error : ""}
        </div>
      </div>
    );
  }
  //helper method for user missed a field or duplicate user
  renderAlert() {
    if(this.props.errorMessage) {
      return(
        <div className='alert alert-danger'>
          <strong>Opps!</strong> {this.props.errorMessage }
        </div>
      );
    }
  }
  //action handler for summit button
  handleFormSubmit(values) {
    //call action creator to sign up the user
    this.props.signupUser(values);
  }
  //submit form
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          lable="Email"
          name="email"
          type="text"
          component={this.renderField}
        />
        <Field
          lable="Password"
          name="password"
          type="password"
          component={this.renderField}
        />
        <Field
          lable="Password Confirm"
          name="passwordConfirm"
          type="password"
          component={this.renderField}
        />
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign Up!</button>
      </form>
    );
  }
}

// validates form by looking at the object arg called values to make sure all
//fields were filled out correctly, if not adds error to errors object
function validate(values) {
  const errors = {};

  //validates the inputs from values
  if(!values.email) {
    errors.email = "Enter a Email";
  }
  if(!values.password) {
    errors.password = "Enter a password";
  }
  if(!values.passwordConfirm) {
    errors.passwordConfirm = "Enter a password confirmation";
  }

  if(values.password !== values.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  //if errors is empty, the form was filled out correctly and fine to submit
  //if errors has *any* properties, redux-form assums form is invalid
  return errors;
}
// bind errorMessage property from state object to component
function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}
//allows form to work
export default reduxForm({
  form: 'signup',
  validate
})(
  connect(mapStateToProps, actions)(Signup)
);
