import React, { lazy, Suspense, useEffect, useState } from "react";
import "./index.css";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  Navbar,
  Following,
  ForYou,
  Message,
  Login,
  Explore,
  Notification,
  Home,
} from "./components";

import TwitterLoginSignup from "./components/TwitterLoginSignup";
import Signup from "./pages/signup/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import Settings from "./pages/settingfd/Settings";
import { resetCurr } from "./redux/signupSlice";
import { doc, getDoc } from "firebase/firestore";
import { add_user_name, set_user_details } from "./redux/userSlice";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { logout, showButton } from "./redux/LoginSlice";
import axios from "axios";
import Comment from "./pages/comment/Comment";
// import { logout } from "./redux/LoginSlice";
const App = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.login.currentUser);
  const curr = useSelector((state) => state.login.currentUser);
  const toggleButton = useSelector((state) => state.login.showLogoutButton);
  const user = useSelector((state) => state.user.user_details);
  const id = curr?.user?.uid;
  const [urlName, setUrlName] = useState("");
  console.log(user);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const docRef = doc(db, "users", id);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data());
  //       console.log(docSnap.data())
  //     } else {
  //       // docSnap.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   };
  //   fetchData();
  // }, []);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // localStorage.removeItem("user");
      dispatch(logout());
      navigate("/explore");
      // window.location.reload()
      dispatch(showButton());
    } catch (error) {
      console.log(error);
    }
  };
  if (pathname === "/signup") {
    dispatch(resetCurr());
  }
  const [file, setFile] = useState("");

  const handle = () => {
    // const formData = new FormData();
    // formData.append("image", file);
    // axios.post("http://localhost:5000/propertyPost", formData).then((res) => {
    //   console.log(res);
    // });
  };
  return (
    <>
      <div className="bg-black w-full min-h-screen  flex relative select-none">
        <Suspense
          fallback={
            <div className="w-screen relative h-screen flex items-center">
              {/* <div className="flex w-full h-screen  animate-ping items-center absolute  gap-2  animate- transition-shadow justify-center">
                <span className=" h-3 w-3 rounded-full bg-[#200047] opacity-75"></span>
                <span className="  rounded-full h-3 w-3 bg-[#200047]"></span>
                <span className=" rounded-full h-3 w-3 bg-[#200047]"></span>
              </div> */}
              <div
                class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1D9BF0] border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite] mx-auto"
                role="status"
              >
                <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          }
        >
          <Navbar />
          {/* Navbar needs to be place inside each pages routes incase of an incorrect route */}
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/following" element={<Following />}></Route>
              <Route path="/foryou" element={<ForYou />}></Route>
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/notifications" element={<Notification />}></Route>

              <Route path="/messages" element={<Message />}></Route>
            </Route>
            <Route path="/explore" element={<Explore />}></Route>
            <Route path="/comment/:name" element={<Comment />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route
              path="*"
              element={<div className="text-white">ERROR</div>}
            ></Route>
          </Routes>
        </Suspense>
      </div>
      {currentUser ? null : <TwitterLoginSignup />}
      {toggleButton ? (
        <div className="fixed max-w-[400px] top-[450px]  sm:left-32 translate-x-0 z h-fit p-2  bg-[#000000] rounded-lg shadow-[0px_0px_10px_3px] shadow-white">
          <h3
            onClick={handleLogout}
            className="text-white hover:bg-[#16181C] cursor-pointer flex justify-center bg-black w-full "
          >
            Log out {"kkks"}
          </h3>
        </div>
      ) : null}
    </>
  );
};

export default App;
