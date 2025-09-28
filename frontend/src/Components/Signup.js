import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleerror, handlesuccess } from "../util"; // make sure the import matches the export name
const Signup = () => {
  const navigate=useNavigate();
  const [signinfo, setSigninfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signinfo;

    if (!name || !email || !password) {
      return handleerror("All fields are required");
    }

    try {
      const url = "http://localhost:4000/api/v1/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(signinfo),
      });

      const result = await response.json();
      console.log("Signup Result:", result);
      const { success,message }=result;
      if(success){
        handlesuccess(message);
        setTimeout(()=>{
        navigate('/login');
        },2000);
      }
      if (result.error) {
        handleerror(result.error);
      } else {
        // you can add handleSuccess here if you want
        // handleSuccess("Signup successful!");
      }
    } catch (err) {
      handleerror(err.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name </label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Enter your Name.."
            value={signinfo.name}
            autoFocus
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={signinfo.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={signinfo.password}
          />
        </div>

        <button type="submit">Signup</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
