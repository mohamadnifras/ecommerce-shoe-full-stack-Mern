import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords Must Match")
      .required("Confirm Password Required"),
  });

  const handleSubmit = async (values) => {
    try {
      await dispatch(registerUser(values)).unwrap().then((response) => {
        navigate("/login");
        toast.success(response.message)
      });
    } catch (error) {
      toast.error(error)
      
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/signup.jpeg')]  bg-cover bg-center  bg-no-repeat px-4 sm:px-6">
      <div className="w-full max-w-md bg-transparent shadow-xl rounded-lg p-8 border-2  border-white/50 backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Sign Up</h2>
 

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5 text-amber-50">
            <div>
              <Field
                type="text"
                name="username"
                placeholder="Username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-amber-50"
              />
         
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
           
            </div>

            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-amber-50"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-amber-50"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-amber-50"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </Form>
        </Formik>

        <p className="text-center text-sm text-white mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
