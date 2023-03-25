import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  // statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { useState, useEffect } from "react";


import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Home() {

let navigate = useNavigate()

  // let user_name = JSON.parse(localStorage.getItem("u_type"))
  let url = "http://localhost:4000"
  const [chat_request, setChatRequest] = useState()
  const [admin, setadmin] = useState()
  const [subadmin, setsubadmin] = useState()
  const [client, setclient] = useState()
  let user_name = JSON.parse(localStorage.getItem("user_name"))
  //  console.log(user_name,"us")
   let u_type = JSON.parse(localStorage.getItem("u_type"))
  //  console.log(u_type,"ut")
  const chat_invitation = async () => {
    let res = await axios.post(`${url}/chat/list`,{u_type:u_type , user_name:user_name}, {
      headers: {
        // 'Content-Type': 'application/json',
        'authorization': JSON.parse(localStorage.getItem("user"))
      },



    })

    if (res) {
      //  console.log("chat", res)
      setChatRequest(res.data.length)


    }

  }

  const getadmin = async () => {
    let res = await axios.get("http://localhost:4000/list/admin", {
      headers: {
        'Content-Type': 'application/json',
        'authorization': JSON.parse(localStorage.getItem("user"))
      },



    })
    setadmin(res.data.length)

  }
  const getSubadmin = async () => {
    let res = await axios.post(`${url}/list/SubAdmin`, {u_name:user_name,u_type:u_type}, {
      headers: {
        // 'Content-Type': 'application/json',
        'authorization': JSON.parse(localStorage.getItem("user"))
      },



    })
    setsubadmin(res.data.length)

  }
  const getclient = async () => {
    let res = await axios.post(`${url}/list/client`,{user_name:user_name ,u_type:u_type}, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': JSON.parse(localStorage.getItem("user"))
      },



    })
    setclient(res.data.length)

  }






  useEffect(() => {

    getadmin()
    getSubadmin()
    getclient()
    chat_invitation()

  }, [])

  const statisticsCardsData = [
    {
      color: "blue",
      icon: UserIcon,
      title: "Total Admins",
      value: admin,
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },
    {
      color: "pink",
      icon: UserIcon,
      title: "Total S-Admins",
      value: subadmin,
      footer: {
        color: "text-green-500",
        value: "+3%",
        label: "than last month",
      },
    },
    {
      color: "green",
      icon: UserIcon,
      title: "Total  Clients",
      value: client,
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },
    {
      color: "green",
      icon: ChartBarIcon,
      title: "Total Chats",
      value: chat_request,
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },

  ];


  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}



            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}

          />
        ))}
      </div>

    </div>
  );
}

export default Home;
