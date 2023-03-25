import React from 'react'

import {
  Card,
  CardHeader,
  Typography
} from "@material-tailwind/react";

import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { FcApproval } from 'react-icons/fc';

import TimePicker from 'react-time-picker';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import moment from "moment";


const Chat = () => {
  let url = "http://localhost:4000"



  // const [copy, setcopy] = useState("copy")
  var val = Math.floor(1000 + Math.random() * 9000);
  // console.log(val);
  const [Random, setval] = useState(val)

  let u_type = JSON.parse(localStorage.getItem("u_type"))
  let user_name = JSON.parse(localStorage.getItem("user_name"))
  let type = "host"
  let user_id = JSON.parse(localStorage.getItem("user_id"))

  const client_name = user_name.replace(/ /g, '')





  const dataFetch = useRef(false)
  let arr = []
  let arr1 = []

  const getclient = async () => {

    let res = await axios.post(`${url}/list/client`, { user_id: user_id, u_type: u_type }, {
      headers: {

        'authorization': JSON.parse(localStorage.getItem("user"))
      },

    })

    if (res.data) {
      console.log(res, "res")

      for (let i = 0; i < res.data.length; i++) {


        arr.push(res.data[i]._id)
        arr1.push(res.data[i].name)
        console.log(arr, arr1, "listing")

      }

    }

  }

  useEffect(() => {

    if (dataFetch.current)
      return
    dataFetch.current = true

    getclient()

  }, [])


  console.log(arr, arr1, "data")

  const createChat = async () => {
    // e.preventDefault()

    if (arr.length > 0 && arr1.length > 0) {
      console.log(arr1)
      console.log(arr)
      let res = await axios.post(`${url}/create/chat`, { arr1, arr, u_type, user_name, Random, user_id }, {
        headers: {

          'authorization': JSON.parse(localStorage.getItem("user"))
        },
      })
      if (res.status === 200) {
        // console.log(res.data)
        toast("success created chat ", {
          type: 'success'
        });

        location.replace(`https://voicechat.online:3000/join/${Random}${user_id}${arr.length}?client=${client_name}&type=${type}`);




      }
      else {
        toast("something Went wrong ", {
          type: 'error'
        });
      }




    } else {
      toast("something Went wrong ! try again ", {
        type: 'warning'
      });
    }
  }


  return (
    <div>

      <ToastContainer />

      <Card>

        <CardHeader variant="gradient" color="blue" className="mb-8  mt-3 p-3">

          <button

            style={{ width: '150px', backgroundColor: "#e58938" }}
            type="button" className="px-6
py-2.5

text-white
font-medium
text-xs
leading-tight
uppercase
rounded
shadow-md
hover:bg-yellow-700 hover:shadow-lg
focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0
active:bg-yellow-800 active:shadow-lg
transition
duration-150
ease-in-out"
            onClick={createChat}

          >


            Start Chat

          </button>





        </CardHeader>
      </Card>
      <br />
      <br />



    </div>
  )
}

export default Chat