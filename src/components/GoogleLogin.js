import React, { useState, useEffect } from "react";
import { gapi, loadAuth2 } from "gapi-script";

import { UserCard } from "./UserCard";
import "./GoogleLogin.css";
const clientId = "YOUR_CLIENT_ID";

export const GoogleLogin = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(gapi, clientId, "");
      if (auth2.isSignedIn.get()) {
        updateUser(auth2.currentUser.get());
      } else {
        attachSignin(document.getElementById("customBtn"), auth2);
      }
    };
    setAuth2();
  }, []);

  useEffect(() => {
    if (!user) {
      const setAuth2 = async () => {
        const auth2 = await loadAuth2(gapi, clientId, "");
        attachSignin(document.getElementById("customBtn"), auth2);
      };
      setAuth2();
    }
  }, [user]);

  const updateUser = (currentUser) => {
    const name = currentUser.getBasicProfile().getName();
    const email = currentUser.getBasicProfile().getEmail();
    const profileImg = currentUser.getBasicProfile().getImageUrl();
    setUser({
      name: name,
      email: email,
      profileImg: profileImg,
    });
  };

  const attachSignin = (element, auth2) => {
    auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        updateUser(googleUser);
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  };

  const signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setUser(null);
      console.log("User signed out.");
    });
  };

  if (user) {
    return (
      <div className="container">
        <UserCard user={user} />
        <div id="" className="btn logout" onClick={signOut}>
          Logout
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div id="customBtn" className="btn login">
        Login
      </div>
    </div>
  );
};
