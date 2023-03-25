import { Routes, Route, useNavigate, } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "../widgets/layout/";
import routes from "../routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import Client from "@/pages/dashboard/Client";
import SubAdmin from "@/pages/dashboard/subadmin";
import Chat from "@/pages/dashboard/Chat";
import { Profile, } from "@/pages/dashboard";
import { Tables } from "@/pages/dashboard";
import { Children } from "react";
import Chat_request from "@/pages/dashboard/Chat_request";
import { Home } from "@/pages/dashboard";
import Chat_Listing from "@/pages/dashboard/Chat_Listing";
import { useEffect } from "react";
import { SignIn } from "@/pages/auth";
import { useState } from "react";

// import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  let u_type = JSON.parse(localStorage.getItem("u_type"))
  // console.log(u_type)

let navigate  = useNavigate()
let auth = JSON.parse(localStorage.getItem("user"))

useEffect(()=>{
  if(!auth){
    navigate("/auth/sign-in")
  }
},[])

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
{

  !auth ?   <SignIn/>:

  <>

  <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo.jpeg" : "/img/logo.jpeg"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>





          {u_type === 's' ? (
            <>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/admin" element={<Tables />} />
              <Route exact path="/subadmin" element={<SubAdmin />} />
              <Route exact path="/client" element={<Client />} />
              <Route exact path="/client/:id" element={<Client />} />
              <Route exact path="/notification" element={<Notification />} />
              {/* <Route exact path="/chat" element={<Chat />} /> */}
              {/* <Route exact path="/chatRequest" element={<Chat_request />} /> */}
              <Route exact path="/chatsCreated" element={<Chat_Listing />} />


            </>
          ) : null
          }
          {u_type === 'a' && (
            <>
              {/* <Route exact path="/profile" element={<Profile/>} /> */}
              <Route exact path="/subadmin" element={<SubAdmin />} />
              <Route exact path="/client" element={<Client />} />
              <Route exact path="/client/:id" element={<Client />} />
              {/* <Route exact path="/notification" element={<Notification/>} />  */}
              {/* <Route exact path="/chat" element={<Chat />} /> */}
              {/* <Route exact path="/chatsCreated" element={<Chat_Listing />} /> */}



            </>
          )
          }
          {u_type === 'sa' && (
            <>
              {/* <Route exact path="/profile" element={<Profile/>} /> */}
              <Route exact path="/client" element={<Client />} />
              {/* <Route exact path="/notification" element={<Notification/>} />  */}
              <Route exact path="/chat" element={<Chat />} />
              {/* <Route exact path="/chatRequest" element={<Chat_request/>} />  */}
              {/* <Route exact path="/chatsCreated" element={<Chat_Listing />} /> */}


            </>
          )
          }
          {u_type === 'c' && (
            <>

              {/* <Route exact path="/chat" element={<Chat />} /> */}
              <Route exact path="/chatRequest" element={<Chat_request />} />
           {/* {   window.location.replace(`${mapReverse2[0].chat_url}?client=${client_name}`)} */}



            </>
          )
          }







        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
  </>
}


    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
