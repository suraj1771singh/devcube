import React, { useContext } from "react";
import AppContext from "../context/AuthContext";

function RegistrationPage(props) {
  // const [username, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  const { registerUser } = useContext(AppContext);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "fit-content", margin: "auto", alignItems: "center" }}>
      <h2>Register </h2>
      <form style={{ display: "grid", gridGap: "8px", width: "fit-content", margin: "1rem" }} onSubmit={registerUser}>
        <input type="text" name="first_name" placeholder="Enter your First name" />
        <input type="email" name="email" placeholder="Enter your Email" />
        <input type="password" name="password1" placeholder="Password" />
        <input type="password" name="password2" placeholder="Confirm Password" />

        <button type="submit">Register</button>
      </form>
      <p>
        Already registered ? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default RegistrationPage;
