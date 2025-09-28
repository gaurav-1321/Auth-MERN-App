import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleerror, handlesuccess } from "../util";
const Login= () => {
  const navigate=useNavigate();
  const [logininfo, setlogininfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlogininfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { email, password } = logininfo;

    if ( !email || !password) {
      return handleerror("All fields are required");
    }

    try {
      const url = "http://localhost:4000/api/v1/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(logininfo),
      });

      const result = await response.json();
      console.log("Login Result:", result);
      const { success,message,name,error,jwtToken}=result;
      if(success){
        handlesuccess(message);
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',name);
        setTimeout(()=>{
        navigate('/Home');
        },2000);
      }
      else if(error){
        const details=error?.details[0].message;
        handleerror( message || "login failed");
      }
    } catch (err) {
      handleerror(err.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={logininfo.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={logininfo.password}
          />
        </div>

        <button type="submit">Login</button>
        <span>
          Don't have an account ? <Link to="/Signup">Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
