import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

import { FiLogOut } from 'react-icons/fi';
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { useEffect, useState } from "react";
import { getValue } from "@mui/system";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  let navigate = useNavigate()
  const logout = () => {
    localStorage.clear("user")
    navigate("/auth/sign-in")
  }
  let url = "http://localhost:4000"

  const [username, setusername] = useState(null)
  // console.log(email)
  const [pass, setpass] = useState(null)

  let user_id = JSON.parse(localStorage.getItem("user_id"))

  const getData = async () => {
    let result = await axios.get(`${url}/admin/update`, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': JSON.parse(localStorage.getItem("user"))
      },


    })

    if (result) {
      // console.log(result.data[0].email)
      setusername(result.data[0].username)
    }


  }
  useEffect(() => {
    getData()
  }, [])

  const submit = async () => {


    if (username) {
      let result = await axios.put(`${url}/admin/profile/update`, { username: username, password: pass, id: user_id }, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': JSON.parse(localStorage.getItem("user"))
        },


      })
      if (result.status === 200) {
        console.log("update/admin", result)
        var myModalEl = document.getElementById('puspe1');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
        toast("successfuly updated profile!", {
          type: 'success'
        });
      }
      else {
        toast("something went wrong", {
          type: 'error'
        });
      }
    } else {
      toast("email is required!", {
        type: 'warning'
      });
    }

  }

  let u_type = JSON.parse(localStorage.getItem("u_type"))
  return (

    <>
      <ToastContainer />
      <Navbar
        color={fixedNavbar ? "white" : "transparent"}
        className={`rounded-xl transition-all ${fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
          }`}
        fullWidth
        blurred={fixedNavbar}
      >
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
          <div className="capitalize">

          </div>
          <div className="flex items-center">

            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
              onClick={() => setOpenSidenav(dispatch, !openSidenav)}
            >
              <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
            </IconButton>


            <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-1 ml-4 font-normal"
                        data-bs-toggle="modal"
                        data-bs-target=  {u_type==="s"? "#puspe1":""}
                      >
                        <strong className="cursor-pointer text-uppercase" >{JSON.parse(localStorage.getItem("user_name"))}</strong>
                      </Typography>

                    </div>


            <Link to="/auth/sign-in">
              <Button
                variant="text"
                color="blue-gray"
                className="hidden items-center gap-1 px-4 xl:flex"

                onClick={() => { logout() }}
              >

                Sign Out
                <FiLogOut />

              </Button>

              <Tooltip
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
                placement="top" content="Log Out">



                <IconButton

                  variant="text"
                  color="blue-gray"
                  className="grid xl:hidden mx-4  "

                  onClick={() => { logout() }}
                >
                 <FiLogOut />
                </IconButton>

              </Tooltip>


            </Link>


          </div>
        </div>
      </Navbar>







      <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="puspe1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div
            className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div
              className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
                Admin Profile
              </h5>
              <button type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body relative p-4">
              <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlhtmlFor="username">
                      username
                    </label>
                    <input
                      value={username}
                      onChange={(e) => { setusername(e.target.value) }}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email" />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlhtmlFor="password">
                      Password
                    </label>
                    <input
                      value={pass}
                      onChange={(e) => { setpass(e.target.value) }}
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                    <p className="text-red-500 text-xs italic">Please choose a password.</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      id="modal"
                      onClick={submit}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">

                      Submit
                    </button>

                  </div>
                </form>

              </div>
            </div>
            <div
              className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button type="button"
                className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-dismiss="modal">Close</button>

            </div>
          </div>
        </div>
      </div>


    </>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
