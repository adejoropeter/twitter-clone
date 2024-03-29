import React, { useState } from "react";
import { BsImageFill } from "react-icons/bs";
import { RiFileGifFill } from "react-icons/ri";
import { BiPlus, BiPoll } from "react-icons/bi";
import { GrEmoji } from "react-icons/gr";
import { TbCalendarTime } from "react-icons/tb";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection, serverTimestamp } from "../firebase";
// import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import {
  addToTweetArr,
  changeIDIndex,
  findQuoteTweet4Each,
} from "../redux/tweetSlice";
import { clearInputVal } from "../redux/quoteSlice";

const QuoteTweet = () => {
  const dispatch = useDispatch();
  //   const [state, setState] = useState([]);
  //   const [bool, setBool] = useState(false);
  const navigate = useNavigate();
  const tweet = useSelector((state) => state.post.tweet);
  const id = useSelector((state) => state.post.idIndex);

  const view = useSelector((state) => state.post.viewTweet);
  const text = useSelector((state) => state.quote.inputVal);
  // const inputVal = text?.value?.join("");
  const renderColoredText = (value) => {
    // Use regular expression to find words starting with "@"
    const regex = /(?:^|\s)(@\w+)/g;
    const coloredText = value?.replace(regex, (match, word) => {
      return ` ${match} `;
    });
    return coloredText
      .split(" ")
      ?.filter((_, i) => i < 35)
      .map((word, index) => {
        if (word.startsWith("@")) {
          return (
            <span className="text-blue-400" key={index}>
              {word}
            </span>
          );
        } else {
          return (
            <span className="text-white" key={index}>
              {word}{" "}
            </span>
          );
        }
      });
  };
  const handleAddTweet = () => {
          document.documentElement.scrollTop = 0;

    const newArr = {
      text: text || "Nothing here",
      profileName: "Adejoro Peter",
      username: "@ade_peter",
      comment: [],
      quote: [],
      likes: 1,
      // id: tweet[0].id + 1,
      id: id + 1,
      retweeted: false,
      isQuote: true,
      quoteTweet: { ...view, is: true },
      isPinned: false,
      isEdited: false,
    };
    dispatch(changeIDIndex());
    // call the function
    dispatch(
      findQuoteTweet4Each({
        id: view.id,
        tweet: newArr,
      })
    );
    dispatch(addToTweetArr([newArr]));
    dispatch(clearInputVal());
    navigate(-1);
    console.log(tweet);
  };

  //   const idx = compose.length;
  //   const id = idx + 1;
  //   const navigate = useNavigate();
  const [img, setImg] = useState("");
  //   const inputVal = state?.value?.join("");
  //   const text = inputVal
  //     ?.split("")
  //     ?.filter((_, i) => i < 35)
  //     ?.map((a) => a);
  //   const addComposeTweet = () => {
  //     console.log(copy);
  //     if (compose.length - 1 !== 3) {
  //       dispatch(
  //         addToGrpTweet({
  //           inputText: "",
  //           isDisabled: false,
  //           // id:Math.random(),
  //           id,
  //           isFade: true,
  //         })
  //       );
  //       dispatch(backGroundColor());
  //       console.log(compose.length);
  //     } else {
  //       dispatch(setGroupTweetTo4());
  //       dispatch(setCurrIdx(compose.length - 1));
  //       dispatch(backGroundColor());
  //     }
  //   };
  return (
    <div className="flex sm:items-center gap-2 justify-between flex-col sm:flex-row">
      <div className="flex ">
        <abbr
          title="Media"
          className="hover:bg-[#00130D] flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
        >
          <input
            type="file"
            onChange={(e) => setImg(e.target.value)}
            name=""
            id="file"
            // placeholder="sk"
            className="hidden"
          />
          <label htmlFor="file">
            <BsImageFill size={"16px"} className="text-[#00BA7C] " />
          </label>
        </abbr>

        <abbr
          title="Poll"
          className="hover:bg-[#00130D] xsm:flex hidden justify-center items-center w-10 h-10 rounded-full cursor-pointer "
        >
          <BiPoll size={"16px"} className="text-[#00BA7C] " />
        </abbr>
        <abbr
          title="Emoji"
          className="hover:bg-[#00130D] flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
        >
          <GrEmoji size={"16px"} className="text-[#00BA7C] " />
        </abbr>
        <abbr
          title="Schedule"
          className="hover:bg-[#00130D] xsm:flex hidden justify-center items-center w-10 h-10 rounded-full cursor-pointer"
        >
          <TbCalendarTime size={"16px"} className="text-[#00BA7C] " />
        </abbr>
        <abbr
          title=""
          className="flex justify-center items-center w-10 h-10 rounded-full"
        >
          <HiOutlineLocationMarker size={"16px"} className="text-[#005D3E] " />
        </abbr>
      </div>
      <div className="flex gap-3 items-center">
        {/* {state?.value?.length ? (
          <div className={`items-center  flex justify-center`}>
            <div className="flex items-end justify-center w-8 h-8 overflow-hidden bg-[#1D1F23] rounded-full relative">
              <motion.div
                animate={{
                  height: state.value.length * 2.9 + "%",
                }}
                type={"string"}
                style={{
                  height: state.value.length * 2.9 + "%",
                }}
                className={`w-full   justify-center items-center    bg-[#00BA7C] rounded-sm`}
              ></motion.div>{" "}
              <p className="absolute top-[50%]  left-[50%] -translate-x-[50%] -translate-y-[50%] text-red-500 text-sm font-bold ">
                {35 - state?.value?.length === 0
                  ? null
                  : bool || 35 - state?.value?.length === -1
                  ? 35 - state?.value?.length
                  : null}
              </p>
            </div>
            <div className="h-full w-2 border-l-2 border-[#1D1F23] "></div> */}
        <div
          className="flex items-center justify-center w-8 h-8 overflow-hidden bg-[#1D1F23] rounded-full cursor-pointer"
          //     onClick={addComposeTweet}
        >
          <BiPlus className="text-[#00BA7C]" size={"20"} />
        </div>
        {/* </div>
        ) : null} */}
        <Button
          //     text={compose.length > 1 ? "Tweet All" : "Tweet"}
          text={"Reply"}
          bg={text ? "#00BA7C" : "#005D3E"}
          onClickFn={handleAddTweet}
          color={text === "" ? "#808080" : "#ffffff"}
          disabled={text === "" ? true : false}
        />
      </div>
    </div>
  );
};

export default QuoteTweet;
