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
import Pagination from "./Pagination";
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
import { FaBeer } from 'react-icons/fa';

const clientList = (props) => {
    const { name, username, _id, is_active, addedBy } = props.data
    const { className } = props.className
    const { key } = props.keword

    // { , className,key ,startpagination}
    let url = "http://localhost:4000"
    const [clientData, setclient] = useState([])
    const getTotalClients = async () => {
        // console.log(_id)

        let res = await axios.get(`${url}/get/totalClients/${_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': JSON.parse(localStorage.getItem("user"))
            },



        })


        // console.log("a", res.data)
        setclients(res.data.length)
        setclient(res.data)

    }
    const [totalclients, setclients] = useState(null)
    React.useEffect(() => {

        getTotalClients()


    }, [])



    return (
        <tr key={name}>

            <td className="border-b border-blue-gray-50 py-3 px-5 ">
                <Typography className="text-xs font-semibold text-blue-gray-600">

                    {props.keword + 1}
                </Typography>
                <Typography className="text-xs font-normal text-blue-gray-500">

                </Typography>
            </td>

            <td
                className="border-b border-blue-gray-50 py-3 px-5 "
            >
                <div className="flex items-center gap-4">

                    <div>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                        >
                            {name}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                            {username}
                        </Typography>
                    </div>
                </div>
            </td>

            <td className="border-b border-blue-gray-50 py-3 px-5 ">
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {
                        addedBy}
                </Typography>
            </td>
            <td className="border-b border-blue-gray-50 py-3 px-5 " style={{ display: 'flex' }}>
                <Typography className="text-xs font-semibold text-blue-gray-600">

                    <h2 style={{ fontSize: "15px" }}>   {totalclients}</h2>

                </Typography>

                <Typography> <Link to={`/dashboard/client/${_id}`}><GrView style={{
                    width: "59px",
                    fontSize: '21px'
                }} /></Link></Typography>
            </td>
            <td className="border-b border-blue-gray-50 py-3 px-5 ">
                <Switch onChange={() => { props.status(_id, is_active) }}
                    checked={is_active === true} />
            </td>



            <td style={{ display: 'flex' }} className="border-b border-blue-gray-50 py-3 px-5 ">




                <button data-bs-toggle="modal" data-bs-target="#puspe" onClick={() => { props.update(_id) }} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded mx-2">
                    <BiEdit />
                </button>
                <button onClick={() => { props.delete(_id) }} className="bg-red-500 hover:bg-blue-800 text-white font-bold py-1 px-2 rounded">
                    <AiFillDelete />
                </button>


            </td>
        </tr>
    )
}

export default clientList
