import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  SiAdidas,
  SiFila,
  SiNewbalance,
  SiNike,
  SiPuma,
  SiReebok,
} from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, adminAuthenticated, error } = useSelector(
    (state) => state.auth
  );

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password Required"),
  });


  const handleSubmit = async (values) => {
    try {
      await dispatch(loginUser(values))
        .unwrap()
        .then((respons) => {
          toast.success(respons.message);
        });
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "user" && isAuthenticated) {
        navigate("/");
      } else if (user.role === "admin" && adminAuthenticated) {
        navigate("/adminmain");
      }
    }
  },[user, error, navigate, isAuthenticated, adminAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-500 to-[#FFBB2C] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left side - Shoe and Buttons */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-yellow-500 to-[#ffc64b]  flex flex-col items-center justify-center md:p-10 relative">
          <img
            src="./loginshoe.png"
            alt="Nike Shoe"
            className="absolute max-w-full object-contain drop-shadow-xs"
          />
        </div>

        {/* Right side - Login Form */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center relative">
          <div className="flex gap-4 mb-8">
            <SiNike className="text-black text-6xl" />
            <SiAdidas className="text-[#005EB8] text-6xl" />
            <SiPuma className="text-[#d71a28] text-6xl" />
            <SiReebok className="text-black text-6xl" />
            <SiNewbalance className="text-black text-6xl" />
            <SiFila className="text-red-600 text-6xl" />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border-b border-gray-300 outline-none bg-transparent"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-4 py-2 border-b border-gray-300 outline-none bg-transparent"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <p>
                Dont't have an account?
                <a href="/signup" className="text-blue-500 hover:underline">
                  Sign-Up
                </a>
              </p>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-white py-2 rounded-full font-bold hover:bg-yellow-500 transition"
              >
                LOGIN
              </button>
            </Form>
          </Formik>
        </div>
      </div>
       <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default Login;
