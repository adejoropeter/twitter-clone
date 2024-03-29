import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearLoginInputField } from "../redux/LoginSlice";
import { clearSignupInputField } from "../redux/signupSlice";
import Button from "./button/Button";
import { useState } from "react";

const TwitterLoginSignup = ({}) => {
  const handleClick = () => {
    navigate("/login");
    // dispatch(clearLoginInputField());
  };
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  return (
    <div className="w-screen h-fit py-3 bg-[#358AC4] sticky bottom-0 hidden sm:flex justify-around  items-center select-none z-50 gap-10">
     
      <div className="text-white ">
        <p className="text-2xl font-bold ">Don’t miss what’s happening</p>
        <span className="text-sm font-normal">
          People on Twitter are the first to know.
        </span>
      </div>
      <div className="flex gap-4">
        <Button
          color="white"
          bg="transparent"
          text="Log in"
          border="1px solid white"
          onClickFn={handleClick}
          // onClickFn={() => {
          //   navigate("/login");
          //   dispatch(clearLoginInputField());
          // }}
        />
        <Button
          color="black"
          border="none"
          bg="white"
          text="Sign up"
          onClickFn={() => {
            navigate("/signup");
            dispatch(clearSignupInputField());
          }}
        /> 
      </div>
       
    </div>
  );
};

export default TwitterLoginSignup;
