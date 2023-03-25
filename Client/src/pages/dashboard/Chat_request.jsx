import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Input,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import pic from "../dashboard/notfound.jpg";
import "./Dashboared.css";
import { FcStart } from "react-icons/fc";
// import { FcStart } from 'react-icons/fc';
import { FcVoicePresentation } from "react-icons/fc";

const Chat_request = () => {
  const inputRef = React.useRef();
  const closeRef = React.useRef();

  const [showPerPage, setShowPerPage] = useState(6);

  const [pagination, setPagination] = useState({
    start: 0,
    end: 6,
  });

  const paginationChange = (Start, End) => {
    setPagination({ start: Start, end: End });

    // console.log(Start, End)
  };

  let user_name = JSON.parse(localStorage.getItem("user_name"));
  let user_id = JSON.parse(localStorage.getItem("user_id"));
  // console.log("user_id", user_id)

  // Replacing " " (space) to "" empty space
  const client_name = user_name.replace(/ /g, "");
  // console.log("client name", client_name);

  // console.log("l", user_name)
  const [chat_request, setChatRequest] = useState([]);
  let mapReverse2 = [...chat_request].reverse().map((element) => {
    return element;
  });

  let url = "http://localhost:4000";

  useEffect(() => {
    chat_invitation();
  }, []);

  const [chat_url, setchat_url] = useState();

  let abc = () => {
    if (mapReverse2[0]) {
      // console.log("j", mapReverse2)

      //  setchat_url(mapReverse2[0].chat_url)
      //  inputRef.current.click()
      window.location.replace(
        `${mapReverse2[0].chat_url}?client=${client_name}`
      );
      localStorage.clear("user");
    }
  };
  // console.log("h", chat_url)

  useEffect(() => {
    abc();
  }, [chat_request]);

  const chat_invitation = async () => {
    let res = await axios.get(`${url}/chat/invitation/${user_id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem("user")),
      },
    });

    if (res.data.length > 0) {
      console.log(res);
      setChatRequest(res.data);
    } else {
      toast("No  CHAT REQUEST ", {
        type: "success",
      });
    }
  };

  const close = () => {
    closeRef.current.click();
  };

  return (
    <div>
      <ToastContainer />

      <button
        ref={inputRef}
        type="button"
        className="d-none
      rounded
      bg-blue-600
      px-6
      py-2.5
      text-xs
      font-medium
      uppercase
      leading-tight
      text-white
      shadow-md transition
      ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
      focus:shadow-lg focus:outline-none
      focus:ring-0

      active:bg-blue-800 active:shadow-lg"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade fixed top-0 left-0 hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog pointer-events-none relative w-auto">
          <div className="modal-content pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">

            <div style={{ display: "flex" }} className="modal-body relative p-4 ">
              <b>Chat Request</b>

              <p className="mx-2 my-1">
                <FcVoicePresentation />
              </p>
            </div>
            <p className="text-center">click start to join!</p>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t border-gray-200 p-4">
              <button
                type="button"
                className="rounded
          bg-purple-600
          px-6
          py-2.5
          text-xs
          font-medium
          uppercase
          leading-tight
          text-white
          shadow-md
          transition duration-150
          ease-in-out hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700
          focus:shadow-lg focus:outline-none
          focus:ring-0
          active:bg-purple-800
          active:shadow-lg"
                data-bs-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
              <button
                type="button"
                className="ml-
      rounded
      bg-blue-600
      px-6
      py-2.5
      text-xs
      font-medium
      uppercase
      leading-tight
      text-white
      shadow-md transition
      duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg
      focus:outline-none
      focus:ring-0
      active:bg-blue-800
      active:shadow-lg"
              >
                {" "}
                <a
                  href={`${chat_url}?client=${user_name}`}
                  target="blank"
                  onClick={close}
                >
                  Start{" "}
                </a>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>


      <div style={{ float: "right" }}></div>
    </div>
  );
};

export default Chat_request;
