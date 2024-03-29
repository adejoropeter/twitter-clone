import React, { useId, useState } from "react";
import { BsImageFill } from "react-icons/bs";
import { RiFileGifFill } from "react-icons/ri";
import { BiPlus, BiPoll } from "react-icons/bi";
import { GrEmoji } from "react-icons/gr";
import { TbCalendarTime } from "react-icons/tb";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToTweetArr, setAddComment } from "../../redux/tweetSlice";
import { clearInputField } from "../../redux/inputFieldSlice";
import Button from "../button/Button";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { clearCommentInputField } from "../../redux/commentSlice";
const CommentSectionReplyTweet = () => {
  const dispatch = useDispatch();
  const id = Math.random();
  //   const [state, setState] = useState([]);
  //   const [bool, setBool] = useState(false);
  const state = useSelector((state) => state.comment.value);
  const bool = useSelector((state) => state.comment.bool);
  const tweets = useSelector((state) => state.post.tweet);
  const tweet = useSelector((state) => state.post.viewTweet);
  const name = useSelector((state) => state.user.user_details);
  const [img, setImg] = useState("");
  const inputVal = state?.value?.join("");

  const renderColoredText = () => {
    // Use regular expression to find words starting with "@"
    const regex = /(?:^|\s)(@\w+)/g;
    const coloredText = inputVal?.replace(regex, (match, word) => {
      return ` ${match} `;
    });
    return coloredText
      .split(" ")
      ?.filter((_, i) => i < 35)
      ?.map((word, index) => {
        if (word.startsWith("@")) {
          return (
            <span className="text-[#00BA7C]" key={index}>
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
  const handleAddTweet = async () => {
    dispatch(
      setAddComment({
        id: tweet.id,
        profileName: "Ade",
        // text: renderColoredText(),
        text:inputVal,
        cmtId: id,
      })
    );
    // await addDoc(collection(db, "tweets"), {
    //   text: text?.join(""),
    //   name: name?.name,
    //   // profilePic:
    //   timeStamp: serverTimestamp(),
    // });
    // console.log(tweet);
    // console.log(tweets);
    dispatch(clearCommentInputField());
  };
  return (
    <div className="flex sm:items-center gap-2 justify-between flex-col sm:flex-row">
      <div className="flex gap-1">
        <abbr
          title="Media"
          className="hover:bg-[#00130D] flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
        >
          <input
            type="file"
            onChange={(e) => setImg(e.target.value)}
            name=""
            id="file"
            className="hidden"
          />
          <label htmlFor="file">
            <BsImageFill size={"16px"} className="text-[#00BA7C] " />
          </label>
        </abbr>
        <abbr
          title="GIF"
          className="hover:bg-[#00130D] flex justify-center items-center w-10 h-10 rounded-full cursor-pointer"
        >
          <RiFileGifFill size={"16px"} className="text-[#00BA7C] " />
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
        {state?.value?.length ? (
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
            <div className="h-full w-2 border-l-2 border-[#1D1F23] "></div>
          </div>
        ) : null}
        <Button
          text="Reply"
          onClickFn={handleAddTweet}
          color={!state?.value?.length ? "#808080" : "#ffffff"}
          bg={!state?.value?.length ? "#005D3E" : "#00BA7C"}
          disabled={!state?.value?.length}
        />
      </div>
    </div>
  );
};

export default CommentSectionReplyTweet;
