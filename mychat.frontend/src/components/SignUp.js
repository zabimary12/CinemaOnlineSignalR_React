import React, { Component } from 'react'
//import './SignUp.scss'
import AuthServices from '../services/AuthServices.js'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { Link, useNavigate } from 'react-router-dom';

const authServices = new AuthServices();


export default class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      UserName: '',
      Password: '',
      ConfirmPassword: '',

      UserNameFlag: false,
      PasswordFlag: false,
      ConfirmPasswordFlag: false,

      open: false,
      Message: '',
    }
  }

  handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ open: false })
  }

  CheckValidity() {
    console.log('Check Validity Calling')
    //Reset Flag
    this.setState({
      UserNameFlag: false,
      PasswordFlag: false,
      ConfirmPasswordFlag: false,
    })

    if (this.state.UserName === '') {
      this.setState({ UserNameFlag: true })
    }
    if (this.state.Password === '') {
      this.setState({ PasswordFlag: true })
    }
    if (this.state.ConfirmPassword === '') {
      this.setState({ ConfirmPasswordFlag: true })
    }
  }

  handleSubmit = (e) => {
    this.CheckValidity()
    if (
      this.state.UserName !== '' &&
      this.state.Password !== '' &&
      this.state.ConfirmPassword !== ''
    ) {
      const data = {
        Name: this.state.UserName,
        Password: this.state.Password,
        PasswordConfirm: this.state.ConfirmPassword
      }

      authServices
        .SignUp(data)
        .then((data) => {
          console.log('data : ', data)
          if (data.data.isSuccess) {
            console.log('Sign Up Confirmd')
            this.setState({ open: true, Message: '4.5.0' })
          } else {
            console.log('Sign Up Failed')
            this.setState({ open: true, Message: 'Sign Up Failed' })
          }
        })
        .catch((error) => {
          console.log('error : ', error)
          this.setState({ open: true, Message: 'Something Went Wrong' })
        })
    } else {
      console.log('Not Acceptable')
      this.setState({ open: true, Message: 'Please Fill Required Field' })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState(
      { [name]: value },
      console.log('Name : ', name, 'Value : ', value),
    )
  }

  // handleSignIn = (e) => {
  //   // useNavigate('/SignIn');
  //   // const navigate = useNavigate();
  //   navigate('/SignIn');
  // }

  render() {
    console.log('state : ', this.state)
    return (
      <div className="SignUp-Container">
        <div className="SignUp-SubContainer">
          <div className="Header">Sign Up</div>
          <div className="Body">
            <form className="form">
              <TextField
                className="TextField"
                name="UserName"
                label="UserName"
                variant="outlined"
                size="small"
                error={this.state.UserNameFlag}
                value={this.state.UserName}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                type="password"
                name="Password"
                label="Password"
                variant="outlined"
                size="small"
                error={this.state.PasswordFlag}
                value={this.state.Password}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                type="password"
                name="ConfirmPassword"
                label="Confirm Password"
                variant="outlined"
                size="small"
                error={this.state.ConfirmPasswordFlag}
                value={this.state.ConfirmPassword}
                onChange={this.handleChange}
              />
            </form>
          </div>
          <div className="Buttons">
            <Button className="Btn" color="primary" component={Link} to={'/SignIn'}>
              Sign In
            </Button>
            <Button
              className="Btn"
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Sign Up
            </Button>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={this.state.Message}
          action={
            <React.Fragment>
              <Button color="secondary" size="small" onClick={this.handleClose}>
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    )
  }
}
