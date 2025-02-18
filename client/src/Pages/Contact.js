import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance";
import Layout from "../Layout/Layout";
import { isEmail } from "../Helper/regexMatcher";
import { useForm, ValidationError } from '@formspree/react';
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Contact = () => {
    const navigate = useNavigate();
  
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [state, handleSubmit] = useForm("mkgopolj");
  if (state.succeeded) {
    
    return (
      <Layout>
          <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          Welcome
        </h1>
        <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
            Thanks for joining!
        </div>
        <button className="mt-5">
          <Link className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />

            <span
              onClick={() => navigate(-1)}
              className="relative block px-8 py-3 bg-[#1A2238] border border-current"
            >
              Go Back
            </span>
          </Link>
        </button>
      </main>
      </Layout>
    )
  }

  // function to handle the input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInput({
       ...userInput,
        [name]: value 
      });
  };

  // function to send form data to backend
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for empty fields
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }

    // email validation using regex
    if(!isEmail(userInput.email)) {
      toast.error("Invalid email");
      return;
  }

    try {
      const res = axiosInstance.post("/contact", userInput );
      toast.promise(res, {
        loading: "Submitting your message...",
        success: "Form submitted successfully",
        error: "Failed to submit the form",
      });
      const contactResponse = await res;
      // console.log(contactResponse);

      // clearing the input fields after successfull submission of form
      if (contactResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Operation failed...");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]"
        >
          <h1 className="text-3xl font-semibold">Contact Form</h1>
          <div className="flex flex-col w-full gap-1">
            <label className="text-xl font-semibold" htmlFor="name">
              Name
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={userInput.name}
              onChange={handleInputChange}
            />
            <ValidationError 
              prefix="name" 
              field="name"
              errors={state.errors}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-xl font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="email"
              type="email"
              name="email"
              placeholder="Enter the email"
              value={userInput.email}
              onChange={handleInputChange}
            />
            <ValidationError 
              prefix="email" 
              field="email"
              errors={state.errors}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-xl font-semibold" htmlFor="message">
              Message
            </label>
            <textarea
              className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
              name="message"
              id="message"
              placeholder="Enter your message"
              value={userInput.message}
              onChange={handleInputChange}
            ></textarea>

            <ValidationError 
              prefix="Message" 
              field="message"
              errors={state.errors}
            />
          </div>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
            disabled={state.submitting}
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
