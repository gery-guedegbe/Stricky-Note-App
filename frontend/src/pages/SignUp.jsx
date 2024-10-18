import { useState } from "react";
import Passwordinput from "../components/Passwordinput";
import { Link, useNavigate } from "react-router-dom";
import { validaEmail } from "../utils";
import axiosInstance from "../api/axiosInstance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validaEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter a valid password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");

    // SignUp API Call
    try {
      const response = await axiosInstance.post("/auth/register", {
        name: name,
        email: email,
        password: password,
      });

      console.log("Response Data:", response.data);

      // Handle successful registration response
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);

        // Redirection vers la page des notes
        navigate("/notes");
      }
    } catch (error) {
      console.log(error.response);
      // Handle registration error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-full max-w-sm border rounded-lg bg-white shadow-lg p-7">
        <form onSubmit={handleSignUp}>
          <h4 className="text-2xl font-semibold mb-7 text-center">Sign Up</h4>

          <input
            type="text"
            placeholder="Name"
            className="input-box mb-4 p-3 border border-customBlueLight rounded-md w-full focus:outline-none focus:ring-1 focus:ring-customBlue text-sm text-customBlack font-medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            className="input-box mb-4 p-3 border border-customBlueLight rounded-md w-full focus:outline-none focus:ring-1 focus:ring-customBlue text-sm text-customBlack font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Passwordinput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

          <button
            type="submit"
            className="w-full bg-customBlue text-white font-semibold py-3 rounded-md hover:bg-customBlueLight transition duration-200"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-customBlack text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="font-medium  text-customBlue underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
