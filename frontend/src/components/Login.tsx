import { useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useToken } from '../api/TokenContext';
import {TEST_USER, TEST_PASS} from '../config';
import { LoginCredential } from '../api/types';
import { Navigate } from 'react-router-dom';

/* 
Login / Authentication::
/*
Pages::
*/

// simple login form
const Login = ({ username, password }: LoginCredential) => {
  const { login, token } = useToken();
  const [ user, setUser ] = useState(username);
  const [ pass, setPass ] = useState(password);
  return (
    token ? <Navigate to='/' /> : 
    <Paper sx={{ maxWidth: '20rem', margin: '3em auto', p: 2 }}>
      <Stack spacing={2} display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{ mt: 2 }}>
          <TextField label="Username" value={user} onChange={e => setUser(e.target.value)}></TextField>
          <TextField label="Password" value={pass} onChange={e => setPass(e.target.value)} type='password'></TextField>
          <Button fullWidth onClick={() => user && pass && login([user, pass])}>Login</Button>
      </Stack>
    </Paper>
  );
}
export default Login;