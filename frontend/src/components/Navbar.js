import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Navbar() {
  const { User, logoutUser } = useContext(AuthContext);

  return (
    <>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>StudyBud</h1>
        <p>Hello {User?.username}</p>
        {User ? <button onClick={logoutUser}>Logout</button> : <button>Login</button>}
      </nav>
      <hr />
    </>
  );
}

export default Navbar;
