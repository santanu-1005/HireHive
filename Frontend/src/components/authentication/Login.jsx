import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Navigate, useNavigate } from "react-router-dom";
import { RadioGroup } from "../ui/radio-group";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "", 
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!input.role) {
      toast.error("Role is required");
      return;
    }
      dispatch(setLoading(true)); // Start loading
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      dispatch(setLoading(false)); // End loading
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center flex-grow p-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-300"
        >
          <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Login</h1>
          
          <div className="my-4">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="johndoe@gmail.com"
              required
            />
          </div>
          
          <div className="my-4">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
              required
            />
          </div>

          <div className="my-4">
            <Label className="block mb-2">Role</Label>
            <RadioGroup className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="role-student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="role-recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <div className="flex justify-center items-center my-4">
              <div className="spinner-border text-blue-600" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md mt-4 transition duration-300"
            >
              Login
            </button>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                <span className="font-semibold">Register here</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
