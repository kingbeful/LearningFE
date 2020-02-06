import React , { Component } from 'react';
import Button from '@material-ui/core/Button'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PhoneAndroid from '@material-ui/icons/PhoneAndroid';
import Lock from '@material-ui/icons/Lock';
import logo from './logo.svg';

import './App.css';


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      password: '',
      showPassword: false,
    }
  }

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value,
    });
  }

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  }

  render () {
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FormControl style={{ marginTop: '5vh', width: '80vw'}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-number">Account</InputLabel>
          <OutlinedInput
            id="outlined-adornment-number"
            type='text'
            startAdornment={
              <InputAdornment position="start">
                <PhoneAndroid />
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>

        <FormControl style={{ marginTop: '5vh', width: '80vw'}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            startAdornment={
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                  edge="end"
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>

        <Button 
          variant="contained" 
          style={{ marginTop: '4vh', width: '80vw'}} 
          color="primary" 
          onClick={()=>{
              console.log('start to signin')
          }}
        >
          Sign In
        </Button>
      </header>
    </div>
    )
  }
}

export default App;
