import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Experementarium from '../../../../assets/experemental.png';
import Spiral from '../../../../assets/spiral.png';
import Egmont from '../../../../assets/egmont.png';

class Authorization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
    };
  }

  Changed = ({ target: { id, value } = {} }) => {
    this.setState({ [id]: value });
  };

  SignIn = (event) => {
    this.props.Login(this.state.email, this.state.password);
    event.preventDefault();
  };

  SignUp = (event) => {
    this.props.Create(this.state.username, this.state.email, this.state.password);
    event.preventDefault();
  };

  render() {
    const { username, email, password } = this.state;
    const { form, success } = this.props;

    const LoginForm = (
      <Form onSubmit={this.SignIn} className="w-75">
        <FormGroup>
          <Label htmlFor="email">Username or Email</Label>
          <Input type="text" id="email" onChange={this.Changed} value={email} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" onChange={this.Changed} value={password} required />
        </FormGroup>
        <div>
          <Button color="info" className="w-75">Sign In</Button>
        </div>
      </Form>
    );

    const RegisterForm = (
      <Form onSubmit={this.SignUp} className="w-75">
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input type="text" id="username" onChange={this.Changed} value={username} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input type="text" id="email" onChange={this.Changed} value={email} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" onChange={this.Changed} value={password} required />
        </FormGroup>
        <div>
          <Button color="info" className="w-75">Sign Up</Button>
        </div>
      </Form>
    );


    return (
      <div id="authorization">
        <div id="flex-form">
          <div id="experementarium">
            <img src={Experementarium} alt="Experementarium" />`
          </div>
          <div id="form" className="card">
            <img src={Spiral} alt="Spiral" />
            {
              form === 'login' ? {LoginForm} : {RegisterForm}
            }
            { (success !== null && !success && form === 'login') &&
              <p color="red">Your Username or Password is not correct. Please check it.</p> }

            { (success !== null && !success && form !== 'login') && <p color="red">This user already exist.</p> }
            <div id="alt-btn">
              <Button tag={Link} to="/login" color="link">Forgot password</Button>
              <Button tag={Link} to={(form === 'login') ? '/create' : '/'} color="link">{(form === 'login') ? 'Create account' : 'Login'}</Button>
            </div>
          </div>
          <div className="card" id="egmont">
            <img src={Egmont} alt="Egmont" />
          </div>
        </div>
      </div>
    );
  }
}

Authorization.propTypes = ({
  Login: PropTypes.func.isRequired,
  Create: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
});

export default Authorization;