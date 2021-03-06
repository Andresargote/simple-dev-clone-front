import { useState, createContext, useEffect } from "react";
import { setCookie, parseCookies } from "nookies";
import Cookies from "js-cookie";

import { loginUser, recoverUserInformation } from "../services/users";
import Router from "next/router";

export const AuthContext = createContext({});

export const ContextAuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "devclone.token": token } = parseCookies();

    if (token) {
      recoverUserInformation(token)
        .then((response) => {
          setUser(response.user);
        })
        .catch((error) => {
          setUser(null);
        });
    }
  }, []);

  async function signIn(data) {
    const { token, user, error } = await loginUser(data);

    if (error) {
      return { error: error };
    } else {
      setCookie(undefined, "devclone.token", token, {
        maxAge: 60 * 60 * 12, //12 hours
      });

      recoverUserInformation(token)
        .then((response) => {
          setUser(response.user);
        })
        .catch((error) => {
          setUser(null);
        });

      Router.push("/");
    }
  }

  function signOut(){
    Cookies.remove("devclone.token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
