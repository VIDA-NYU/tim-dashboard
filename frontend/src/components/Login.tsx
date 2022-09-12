import { useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useToken } from '../api/TokenContext';
import {TEST_USER, TEST_PASS} from '../config';
import { LoginCredential } from '../api/types';

/* 
Login / Authentication::
/*
Pages::
*/

// simple login form
const Login = ({ username, password }: LoginCredential) => {
  const { login } = useToken();
  const [ user, setUser ] = useState(username);
  const [ pass, setPass ] = useState(password);
  return (
    <div className="App">
        <TextField label="Username" value={user} onChange={e => setUser(e.target.value)}></TextField>
        <TextField label="Password" value={pass} onChange={e => setPass(e.target.value)} type='password'></TextField>
        <Button fullWidth onClick={() => user && pass && login([user, pass])}>Login</Button>
    </div>
  );
}
export default Login;