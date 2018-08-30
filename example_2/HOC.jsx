import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Authorization, Workers } from '../../../actions';


function FormsHOC(WrappedComponent, FieldsSet, type, data) {
  class Forms extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
      };
    }

    toggle = () => {
      this.setState({ isOpen: !this.state.isOpen });
    };

    submitForm = (formValues) => {
      const {
        submitLogin, submitRegistration, createCoWorker, updateCoWorker, options, id,
      } = this.props;
      switch (type) {
        case ('Login'):
          return submitLogin(formValues);
        case ('Registration'):
          return submitRegistration(formValues);
        case ('Add'):
          return createCoWorker(formValues, options);
        case ('Edit'):
          return updateCoWorker(formValues, id, options);
        default:
          return console.error('Uncorrected form type');
      }
    };

    render() {
      const fields = new FieldsSet(data, type, this.toggle);
      return (
        <div>
          <WrappedComponent
            fieldsSet={fields}
            isOpen={this.state.isOpen}
            toggle={this.toggle}
            submitForm={this.submitForm}
            type={type}
          />
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    options: state.workersReducer.response.options,
  });
  const mapDispatchToProps = dispatch => ({
    submitLogin: values => dispatch(Authorization.loginRequest(values)),
    submitRegistration: values => dispatch(Authorization.registrationRequest(values)),
    createCoWorker: (values, options) => dispatch(Workers.createWorkerRequest(values, options)),
    updateCoWorker: (values, id, options) => dispatch(Workers.editWorkerRequest(values, id, options)),
  });


  return withRouter(connect(mapStateToProps, mapDispatchToProps)(Forms));
}


export default FormsHOC;
