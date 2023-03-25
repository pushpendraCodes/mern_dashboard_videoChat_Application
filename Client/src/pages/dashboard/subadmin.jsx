import React, { useRef } from 'react'
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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Pagination1 from "./Pagination1";
import { useFormik } from 'formik';
import pic from "../dashboard/notfound.jpg"
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { BiEdit } from 'react-icons/bi';
import { GrView } from 'react-icons/gr';
import { Link } from 'react-router-dom';

import { HiUserAdd } from 'react-icons/hi'
import { AiFillDelete, AiOutlineConsoleSql } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switch from "react-switch";
import { Textarea } from "@material-tailwind/react";
import { BsEyeSlash } from 'react-icons/bs';
import { BsEye } from 'react-icons/bs';
import ClientList from "./clientList"

const SubAdmin = () => {
  let url = "http://localhost:4000"
  const [showPerPage, setShowPerPage] = useState(5)
  const [view, setview] = useState(false)
  const [pagination, setPagination] = useState({
    start: 0,
    end: 5
  })
  const { start, end } = pagination

  const paginationChange = (Start, End) => {

    setPagination({ start: Start, end: End })

    // console.log(Start, End)



  }


  var auth = localStorage.getItem("user")
  const [subAdminData, setData] = useState([])
  // console.log("client data", subAdminData)
  const mapReverse2 = [...subAdminData].reverse().map(element => {
    return element;
  });
  // console.log("p", mapReverse2)

  // const getSubadmin = async () => {
  //   //  try {
  //   let res = await axios.get(`${url}/list/SubAdmin `, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'authorization': JSON.parse(localStorage.getItem("user"))
  //     },



  //   })
  //   if (res) {
  //      console.log("saubadmin", res.data)
  //     setData(res.data)

  //   }



  // }
  let user_name = JSON.parse(localStorage.getItem("user_name"))
  let user_id = JSON.parse(localStorage.getItem("user_id"))
  // console.log(user_name, "us")
  let u_type = JSON.parse(localStorage.getItem("u_type"))
  // console.log(u_type, "us")



  const getSubadmin = async () => {
    //  try {
    let res = await axios.post(`${url}/list/SubAdmin `, { u_name: user_name, u_type: u_type }, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': JSON.parse(localStorage.getItem("user"))
      },



    })
    if (res) {
      // console.log("saubadmin", res.data)
      setData(res.data)

    }



  }



  useEffect(() => {
    getSubadmin();

  }, [])



  const status = async (s_id, _isactive) => {

    // console.log("g", s_id, _isactive)

    const a = !_isactive
    // console.log("fa", a)
    let res = await axios.put(`${url}/status/subAdmin/${s_id}`, { "value": a }, {
      headers: {
        // 'Content-Type': 'application/json',
        'authorization': JSON.parse(localStorage.getItem("user"))
      },
    }
    )
    // setChecked(nextChecked);

    if (res.status === 200) {
      getSubadmin();
    }
    // console.log(res)
    toast("success ", {
      type: 'success'
    });
  }




  // }

  const [Name, setName] = useState("")

  const search_user = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = subAdminData.filter((user) => {
        // return Object.values(user).some(value => value.toLowerCase().includes(keyword.toLowerCase()))
        return user.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setData(results);
    } else {
      getSubadmin()
      // If the text field is empty, show all users
    }

    setName(keyword);
  };


  const delete_admin = async (id) => {
    // console.log("d_id", id)

    if (window.confirm('Sure want to delete?')) {


      let res = await axios.delete(`${url}/delete/SubAdmin/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': JSON.parse(localStorage.getItem("user"))
        },



      })

      if (res) {

        toast("successfuly deleted user!", {
          type: 'success'
        });
        // console.log("update", res)
        getSubadmin();
      }





    }

    else {
      getclient();
    }

  }


  const [role, setrole] = useState({ role: 'sa' })
  const [cancel, setcancel] = useState(null)
  // console.log(cancel)
  let navigate = useNavigate();

  const [U_id, setU_id] = useState(null)

  // console.log(U_id)
  const isAddMode = !U_id
  const [u_password, setu_password] = useState(null)


  const onSubmit = async (values) => {
    // console.log("subadmin", values)

    // document.getElementById("puspe").classList.remove("show");



    // console.log("u", U_id)

    if (U_id) {


      let res = await axios.put(`${url}/update/SubAdmin/${U_id}`, values, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': JSON.parse(localStorage.getItem("user"))
        },



      })
      if (res.status === 200) {
        // console.log(res)
        getSubadmin();

        toast("successfuly updated user!", {
          type: 'success'
        });
        validation.resetForm();
        setU_id("")
        var myModalEl = document.getElementById('puspe');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
      } else if (res.status === 203) {
        toast(" user already exist!", {
          type: 'warning'
        });
      }

      else {
        toast("something went wrong/user already exist!", {
          type: 'warning'
        });
      }




    }

    else {

      let res = await axios.post(`${url}/add/SubAdmin`, [role, values, user_name, user_id], {
        headers: {
          'Content-Type': 'application/json',
          'authorization': JSON.parse(localStorage.getItem("user"))
        },



      })
      // console.log(res)
      if (res.status === 200) {
        // setcancel(true)
        validation.resetForm();


        toast("successfuly added user!", {
          type: 'success'
        });
        var myModalEl = document.getElementById('puspe');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();

        getSubadmin()
        setcancel("modal")
      }
      else if (res.status === 203) {
        toast(" user already exist!", {
          type: 'warning'
        });
      }

      else {
        toast("something went wrong/user already exist!", {
          type: 'warning'
        });
      }

      // console.log(res)

    }






  };



  const [password_valid, setpassword_valid] = useState(true)
  useEffect(() => {

    setpassword_valid(false)

  }, [U_id])

  // useEffect(()=>{
  //   getTotalClients(_id)
  // },[])



  const validation = useFormik({
    validationSchema: Yup.object().shape({

      // password_valid:password_valid,

      name: Yup.string()

        .min(2, 'Too Short!')

        .max(50, 'Too Long!')

        .required('Required'),
      username: Yup.string()
        .min(4, "Mininum 4 characters")
        .max(15, "Maximum 15 characters")

        .required("You must enter a username"),
      // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),

      // mobile: Yup.string()
      //   .required("required")

      //   .min(10, "too short")
      //   .max(10, "too long"),


      password: Yup.string()
        .concat(isAddMode ? Yup.string().required('Password is required') : null)
        .min(6, 'Password must be at least 6 characters')


      ,





      // address: Yup.string().min(1, "Mininum 1 characters").max(15, "Maximum 15 characters").required('Address is required'),



    })
    ,
    initialValues: {
      name: "",
      username: '',
      // email: '',
      // mobile: '',
      password: "",
      // address: ''

    },
    onSubmit,
  })


  const isValidation = (name) => !!(validation.touched[name] && validation.errors[name]);
  const formiKMessage = (name) => {
    return isValidation(name) && <p style={{ fontSize: '11px' }} className='text-danger p-0 m-0 '>{validation.errors[name]}</p>
  }





  const [updateAdmin, setupdateAdmin] = useState(null)
  // console.log(updateAdmin)
  // console.log("1", validation.values)
  //  console.log("1",validation.values[0].name)



  const update_admin = async (id) => {
    setU_id(id)

    try {
      let res = await axios.get(`${url}/get/SubAdmin/${id}`, {
        headers: {
          // 'Content-Type': 'application/json',
          'authorization': JSON.parse(localStorage.getItem("user"))
        },



      })
      // console.log("res/edit", res.data)

      validation.setValues(res.data[0])
      // console.log("validation", validation.values)


    } catch (error) {
      console.log(error)
    }

  }




  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">

      <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="puspe" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div
            className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div
              className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5 style={{ color: 'rgb(229, 57, 53)' }} className="text-xl  leading-normal  block uppercase tracking-wide text-gray-700 text-xs font-bold " id="exampleModalLabel">SubAdmin Details</h5>
              <button type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body relative p-4">


              <form >
                <div className="grid grid-cols-2 gap-4">

                  <div className="w-full  px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                      Name
                    </label>
                    <input
                      name="name"
                      value={validation.values.name}
                      onChange={validation.handleChange}

                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Name" />
                    {formiKMessage("name")}
                  </div>




                  <div className="w-full  px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                      username
                    </label>
                    <input
                      name="username"
                      value={validation.values.username}
                      onChange={validation.handleChange}
                      aria-describedby="emailHelp124"

                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="username" />
                    {formiKMessage("username")}
                  </div>







                </div>


                <br />
                {/* <div className="w-full  px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Email
                  </label>
                  <input
                    name="email"
                    value={validation.values.email}
                    onChange={validation.handleChange}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Email" />
                  {formiKMessage("email")}
                </div> */}



                <br />
                {/* <div className="w-full  px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Phone
                  </label>
                  <input
                    name="mobile"
                    value={validation.values.mobile}
                    onChange={validation.handleChange}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="Phone" />


                  {formiKMessage("mobile")}
                </div> */}






                <div className="w-full  px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Password
                  </label>
                  <input
                    autoComplete="off"
                    name="password"


                    value={validation.values.password}

                    onChange={validation.handleChange}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"  type={view===false?"password":"text"} placeholder="Password" />

{
                    view === true ? <BsEye style={{
                      position: "absolute",
                      top: "61%",
                      left: "84%"


                    }}
                      onClick={() => { setview(!view) }}

                    /> : <BsEyeSlash style={{
                      position: "absolute",
                      top: "61%",
                      left: "84%"
                    }}
                      onClick={() => { setview(!view) }}
                    />
                  }

                  {formiKMessage("password")}
                </div>

                <br></br>

                {/* <div className="w-full px-3  mb-6">


                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Address
                  </label>

                  <Textarea
                    name="address"
                    id="exampleInput123"
                    value={validation.values.address}
                    onChange={validation.handleChange}

                    label="address" />



                  {formiKMessage("address")}
                </div> */}



                <button

                  type="button" className="px-6
text-center
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
ease-in-out
ml-1"
                  onClick={validation.handleSubmit}
                  id="modal"
                  // data-bs-dismiss={cancel===true && "modal"}
                  // data-bs-dismiss={cancel==true?"modal":""}
                  data-bs-dismiss={validation.isValid}
                >Submit</button>

                <button type="button" className="px-6
        py-2.5
        mx-2
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


              </form>


            </div>

          </div>
        </div>
      </div>






      <ToastContainer />


      <Card>

        <CardHeader variant="gradient" color="blue" className="mb-8 p-2">

          <Typography variant="h6" color="white">
            Sub Admins Table
          </Typography>


          <button


            style={{ width: '115px', float: 'right', backgroundColor: "#e53935" }}
            type="button" className="px-6
  py-2.5
  // bg-yellow-600
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
  ease-in-out" data-bs-toggle="modal" data-bs-target="#puspe"

            onClick={() => { validation.resetForm() }}
          >


            Add Subadmin

          </button>


        </CardHeader>



        <div className="mr-auto md:mr-4 md:w-56  mx-4 my-4">
          <Input label="Type here"
            value={Name}
            onChange={(e) => { search_user(e) }}
          />
        </div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["S.no", "Name", "Added By", "Total Clients", "status", "Actions"].map((el) => (
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

              {subAdminData.length > 0 ? mapReverse2.slice(pagination.start, pagination.end).map(
                (data, key) => {
                  const className = `py-3 px-5 ${key === mapReverse2.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;


                  return (
                    <ClientList key={key} keword={key} startpagination={pagination.start} endpagination={pagination.end} data={data} className={className} delete={delete_admin} update={update_admin } status={status} />

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
      <div style={{ float: 'right' }}>
        {/* <Pagination showPerPage={showPerPage} paginationChange={paginationChange} total={mapReverse2.length} /> */}
        <Pagination1
          showPerPage={showPerPage}
          onPaginationChange={paginationChange}
          total={mapReverse2.length}
        />
      </div>

    </div>
  )
}

export default SubAdmin