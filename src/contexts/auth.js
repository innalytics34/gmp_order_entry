import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { getUser, signIn as sendSignInRequest } from '../api/auth';
import Cookies from "js-cookie";


function AuthProvider(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const result = await getUser();
      if (result.isOk) {
        setUser(result.data);
      }

      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(async (username, password) => {
    const result = await sendSignInRequest(username, password);
    if (result.isOk) {
      setUser(result.data);
      window.location.reload();
    }
    else{
      setUser(undefined);
      window.location.reload();
    }
    return result;
  }, []);

  const signOut = useCallback(() => {
    setUser(undefined);
    Cookies.remove('token');
    window.location.reload();
  }, []);


  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }} {...props} />
  );
}

const AuthContext = createContext({ loading: false });
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }
