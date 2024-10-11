import React, { useState, useEffect } from "react";
import LoginDialog from "../components/common/LoginDialog";
import CreateAccountDialog from "../components/common/CreateAccountDialog";
import Navbar from "../components/landingcomponent/Navbar";
import { DesignServiceFooter } from "../components/designservice/DesignServiceFooter";

const SavedDesign = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const handleClickOpenLogin = () => setLoginOpen(true);
  const handleCloseLogin = () => setLoginOpen(false);

  const handleClickOpenSignUp = () => {
    setOpenSignUp(true);
    setLoginOpen(false);
  };

  const handleCloseSignUp = () => setOpenSignUp(false);

  const fetchUserData = async (token) => {
    const response = await fetch("https://flagg.devlopix.com/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCurrentUser(data.name);
    localStorage.setItem("currentUser", data.name);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchUserData(token);
    } else {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        setCurrentUser(storedUser);
      }
    }
  }, []);

  //      useEffect(() => {
  //        const token = localStorage.getItem("authToken");
  //        const storedUser = localStorage.getItem("currentUser");
  //
  //        if (storedUser) {
  //          setCurrentUser(storedUser);
  //        } else {
  //          // Open login dialog if no current user is found
  //          setLoginOpen(true);
  //        }
  //
  //        if (token) {
  //          fetchUserData(token);
  //        }
  //      }, []);

  return (
    <div>
      <Navbar />
      {currentUser && (
        <>
          <h1 style={{textAlign:"center"}}>Welcome, {currentUser || "Guest"}</h1>
        </>
      )}
      {/*<button onClick={handleClickOpenLogin}>Login</button>
      <button onClick={handleClickOpenSignUp}>Sign Up</button>*/}

      <LoginDialog
        open={loginOpen}
        handleClose={handleCloseLogin}
        handleOpenSignUp={handleClickOpenSignUp}
        fetchUserData={fetchUserData}
      />
      <CreateAccountDialog open={openSignUp} handleClose={handleCloseSignUp} setCurrentUser={setCurrentUser} />
      <DesignServiceFooter />
    </div>
  );
};

export default SavedDesign;
