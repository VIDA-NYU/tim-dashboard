import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Navigate } from "react-router-dom";
import {API_URL} from '../config';
import { ContextProps, ProviderProps } from './types';

/* 
Login / Authentication::
TokenContext, TokenProvider, and useToken allow us to use the token globally
*/

const TokenContext = React.createContext<ContextProps | undefined>(undefined);

const TokenProvider: React.FC<ProviderProps> = ({ children }) => {
  // check the login token
  let [ token, setToken ] = useState<string | undefined>();
  let savedToken = useMemo(() => window.localStorage.getItem(`access_token`), []); // get the token on first render
  token = token || savedToken;

  const [ [ username, password ], login ] = useState<[string | null, string | null]>([null, null]);
  
  useEffect(() => {
    // no need to login again
    if(token) {
      return;
    }
    // no login without credentials
    if(!username || !password) return;
    // create the login form
    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    // send the login form
    fetch(`${API_URL}/token`, {
      method: "POST",
      body: formData,
    }).then(r => r.json()).then(({ access_token }) => {
      if(!access_token) {
        throw Error("Something went wrong! the server didn't return a token");
      }
      // yay we have a token!
      setToken(access_token)
      
      // save the token for next page too
      window.localStorage.setItem(`access_token`, access_token);
      console.log('fetched token:', access_token)
    
    }).catch(e => console.error('Error getting token:', e))

  }, [ username, password ])

  // helpers for API requests so you don't have to handle it in other places

  // create the authentication headers
  const headers = token && ({ 'Authorization': `Bearer ${token}` })
  // create a fetch function that automatically includes the auth token
  const fetchAuth = token && (
    (url: string, opts: RequestInit ={}) => fetch(url, { ...opts, headers: { ...headers, ...opts.headers } })
  );
  const contextValues: ContextProps = {
    login: login,
    token: token,
    fetchAuth: fetchAuth,
    headers: headers,
  };
  return <TokenContext.Provider value={contextValues}>
      {children}
    </TokenContext.Provider>
}

// useToken helper wrapper around TokenContext.Consumer
const useToken = () => {
  const context = useContext(TokenContext)
  if (context === undefined) {
    throw new Error('useToken must be used within an TokenProvider')
  }
  return context
}

export const Logout = ({ to='/login' }) => {
  window.localStorage.removeItem('access_token')
  return <Navigate to={to} />
}

export { TokenProvider, useToken }
