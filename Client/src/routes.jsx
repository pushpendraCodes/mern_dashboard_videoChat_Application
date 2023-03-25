import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, } from "@/pages/dashboard";
import Client from "./pages/dashboard/Client";
import { SignIn, SignUp } from "@/pages/auth";
// import subadmin from "./pages/dashboard/SubAdmin";
import SubAdmin from "./pages/dashboard/subadmin";
import Chat from "./pages/dashboard/Chat";
import Chat_request from "./pages/dashboard/Chat_request";
import Chat_Listing from "./pages/dashboard/Chat_Listing";
// import Roles from "./pages/dashboard/Roles";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        role:["s" ]


      },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      //   role:["s" ,"a"]
      // },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Manage Admins",
        path: "/admin",
        element: <Tables />,
        role:["s" ]
     
      },
  
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Manage S-Admins",
        path: "/Subadmin",
        element: <SubAdmin/>,
        role:["s" ,"a"]
      },
  
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Manage clients",
        path: "/client",
        element: <Client />,
        role:["s" ,"a" ,"sa"]
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "Manage clients",
      //   path: "/client/:id",
      //   element: <Client />,
      //   role:["s" ,"a" ,"sa"]
      // },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "create Chat",
        path: "/chat",
        element: <Chat />,
        role:[ "sa"]
      },
    
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Chat Request",
        path: "/chatRequest",
        element: <Chat_request />,
        role:[ "c"]
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Chats Created",
        path: "/chatsCreated",
        element: <Chat_Listing  />,
        role:["s"]
      },
    
      // 
      //   icon: <BellIcon {...icon} />,
      //   name: "notifactions",
      //   path: "/notifactions",
      //   element: <Notifications />,
      //   role:["s" ,"a"]
      // },
    ],
  },
  {
    // title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
        role:[ ]
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
        role:[ ]
      },
    ],
  },
];

export default routes;
