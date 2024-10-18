import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Passwordinput from "../components/Passwordinput";
import { validaEmail } from "../utils";
import axiosInstance from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validaEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    // Login API Call
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: email,
        password: password,
      });

      // Handle successful login response
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);

        setAuthenticated(true);

        navigate("/notes");
      }
    } catch (error) {
      console.log(error);

      // Handle login error
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
    <>
      <div className="w-full h-full flex items-center justify-center ">
        <div className="w-full max-w-sm border rounded-lg bg-white shadow-lg p-7">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl font-semibold mb-7 text-center text-black">
              Login
            </h4>

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
              Login
            </button>
          </form>

          <p className="text-sm text-customBlack text-center mt-4">
            Not registered yet?{" "}
            <Link to="/" className="font-medium text-customBlue underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
