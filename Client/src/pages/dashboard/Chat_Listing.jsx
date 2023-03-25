import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Input
} from "@material-tailwind/react";
import Switch from "react-switch";
import { useEffect } from 'react';
import { useState } from 'react';
import pic from "../dashboard/notfound.jpg"
import Pagination1 from './Pagination1';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NoBackpackSharp } from '@mui/icons-material';
import { useRef } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import SweetPagination from "sweetpagination";
const Chat_Listing = () => {

  let viewmore = React.useRef()


  let url = "http://localhost:4000"
  const [total_clients, setClients] = useState([])
  const View_more = async (id) => {
    viewmore.current.click()
    let res = await axios.post(`${url}/get/client/list/${id}`, {
      headers: {

        'authorization': JSON.parse(localStorage.getItem("user"))
      },
    })

    if (res.status === 200) {
      setClients(res.data[0].chat_members_name)
      // console.log("clinetlist", res)
    }
  }

  const [showPerPage, setShowPerPage] = useState(5)

  const [pagination, setPagination] = useState({
    start: 0,
    end: 5
  })

  const paginationChange = (Start, End) => {

    setPagination({ start: Start, end: End })

    // console.log(Start, End)



  }



  const [chats, setchats] = useState([])

  const mapReverse2 = [...chats].reverse().map(element => {
    return element;
  });
  // console.log("p", mapReverse2)

  let u_type = JSON.parse(localStorage.getItem("u_type"))
  // console.log("a", u_type)
  let user_name = JSON.parse(localStorage.getItem("user_name"))
  let user_id = JSON.parse(localStorage.getItem("user_id"))
  // console.log("a", u_type)
  const client_name = user_name.replace(/ /g, '')

  const getChats = async () => {

    let res = await axios.post(`${url}/chat/list`, { u_type: u_type, user_id: user_id }, {
      headers: {

        'authorization': JSON.parse(localStorage.getItem("user"))
      },
    })
    // console.log("chats", res.data)
    if (res) {
      setchats(res.data)
    }
  }


  useEffect(() => {


    getChats()
  }, [])


  const [Name, setName] = useState("")

  const search_user = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = chats.filter((user) => {
        // return Object.values(user).some(value => value.toLowerCase().includes(keyword.toLowerCase()))
        return user.chat_name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setchats(results);
    } else {
      getChats()
      // If the text field is empty, show all users
    }

    setName(keyword);
  };


  const status = async (s_id, _isactive) => {

    // console.log(s_id, _isactive)

    const a = !_isactive
    // console.log("f", a)
    let res = await axios.put(`${url}/status/chats/${s_id}`, { "value": a }, {
      headers: {
        // 'Content-Type': 'application/json',
        'authorization': JSON.parse(localStorage.getItem("user"))
      },
    }
    )
    // setChecked(nextChecked);

    if (res.status === 200) {
      getChats();
      // console.log(res)
      toast("success ", {
        type: 'success'
      });
    }
    else {
      toast("something went wrong ", {
        type: 'error'
      });
    }

  }

  return (
    <div>
      {/* Modal-------------------- */}


      <button type="button"
        ref={viewmore}
        className="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div
            className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div
              className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Chat Members</h5>
              <button type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body relative p-4">

              <div style={{ maxHeight: "100px", overflowY: "auto" }}>
                <ul>
                  {total_clients &&
                    total_clients.map((item, i) => {
                      return (
                        <li className='d-flex'><FaArrowAltCircleRight className="text-danger m-1" /> {item}</li>

                      )
                    })
                  }

                </ul>
              </div>
            </div>
            <div
              className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button type="button" className="px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out" data-bs-dismiss="modal">Close</button>

            </div>
          </div>
        </div>
      </div>










      <ToastContainer />

      <Card className='mt-4'>

        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">

          <Typography variant="h6" color="white">
            CHATS CREATED
          </Typography>





        </CardHeader>



        <div className="mr-auto md:mr-4 md:w-56  mx-4 my-4">
          <Input label="Type here"
            value={Name}
            onChange={search_user}
          />
        </div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["S.no",  "chat Host", "chatMembers",  "chat Url", "status"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>


            <tbody>


              {chats ? mapReverse2.slice(pagination.start, pagination.end).map(
                ({ chat_name, chat_host, chat_members_name, chat_date, chat_url, is_active, user_type, _id, chat_time }, key) => {
                  const className = `py-3 px-5 ${key === mapReverse2.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;
                  {/* console.log(chat_members) */}
                  return (
                    <tr key={chat_name}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">

                          {pagination.start === 0 ? key + 1 : pagination.start + key + 1}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">

                        </Typography>
                      </td>


                      <td className={className}>
                        <div className="flex items-center gap-4">
                          {/* <Avatar src={img} alt={name} size="sm" /> */}
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold text-[12px] "
                            >
                             {chat_host}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">

                            </Typography>
                          </div>
                        </div>
                      </td>

                      {/* <td className={className}>

                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {chat_host}
                        </Typography>
                      </td> */}
                      <td className={className}>

                        {
                          chat_members_name.length > 1 ?
                            <Tooltip
                              animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                              }}
                              placement="top" content="View More">



                              <Typography


                                className="text-xs cursor-pointer font-semibold text-blue-gray-600">
                                [  {chat_members_name.slice(0, 1).map((e) => {
                                  return (

                                    <span onClick={() => { View_more(_id) }} className='mx-1'>{e}...&nbsp;</span>)
                                })}
                                ]
                              </Typography>


                            </Tooltip> :

                            <Typography


                              className="text-xs cursor-pointer font-semibold text-blue-gray-600">
                              [  {chat_members_name.slice(0, 1).map((e) => {
                                return (

                                  <span  className='mx-1'>{e}</span>)
                              })}
                              ]
                            </Typography>


                        }




                      </td>

                      <td className={className}>

                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          <a className='text-danger' target="_blank" href={`${chat_url}?client=${client_name}`}>{chat_url}</a>
                        </Typography>

                      </td>
                      <td className={className}>


                        <Switch onChange={() => { status(_id, is_active) }}
                          checked={is_active === true} />


                      </td>

                    </tr>
                  );
                }
              )

                : <>

                  <figure style={{ width: '500px' }}>
                    <img style={{ width: '150px', float: 'right' }} src={pic} alt="" />
                  </figure>

                </>


              }
            </tbody>
          </table>


        </CardBody>

      </Card>
      <div >
        {/* <Pagination1 showPerPage={showPerPage} paginationChange={paginationChange} total={mapReverse2.length} /> */}
        <Pagination1
          showPerPage={showPerPage}
          onPaginationChange={paginationChange}
          total={mapReverse2.length}
        />

      </div>

    </div>
  )
}

export default Chat_Listing

