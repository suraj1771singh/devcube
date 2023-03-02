import React, { useContext } from "react";
import AppContext from "../context/AuthContext";

const LoginPage = () => {
  //context
  const { loginUser } = useContext(AppContext);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "fit-content", margin: "auto", alignItems: "center" }}>
      <h2>Login </h2>
      <form style={{ display: "grid", gridGap: "8px", width: "fit-content", margin: "1rem" }} onSubmit={loginUser}>
        <input type="email" name="email" placeholder="Enter your Email" />
        <input type="password" name="password" placeholder="Enter your Password" />

        <button type="submit">Login</button>
      </form>
      <p>
        haven't registered yet ? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default LoginPage;
