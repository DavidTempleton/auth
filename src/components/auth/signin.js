import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {

    handleFormSubmit({ email, password }) {
        this.props.signinUser({email, password});
    }

    renderInput(field) {
        if(!field.className) { field.className = "form-control" }
        if(!field.type) { field.type = "text" }

        return (
            <Field name={field.name}
              id={field.name}
              type={field.type}
              className={field.className}
              component="input" />
        );
    }

    renderAlert() {
      if(this.props.errorMessage) {
        return (
          <div className="alert alert-danger">
            <strong>Opps!</strong> {this.props.errorMessage}
          </div>
        );
      }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    {this.renderInput({ name: "email", type: "email" })}
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    {this.renderInput({ name: "password", type: "password" })}
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}
// bind errorMessage property from state object to component
function mapStatesToProps(state) {
  return { errorMessage: state.auth.error };
}

const reduxFormSignin = reduxForm({
  form: 'signin'
})(Signin);

// Export wrapped Signin container with connect helper
export default connect(mapStatesToProps, actions)(reduxFormSignin);
