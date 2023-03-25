

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from "yup"

import axios from "axios";
import { BsEyeSlash } from 'react-icons/bs';
import { BsEye } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from "react";
import { ThreeDots } from 'react-loader-spinner'

export function SignIn() {
  let [loading, setLoading] = useState(false);


  const [view, setview] = useState(false)


  let navigate = useNavigate();

  const alert = () => {
    <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
      <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
      <p>successfully logged in.</p>
    </div>
  }

  const onSubmit = async (values) => {
    //  console.log(values)

    setLoading(!loading)
    try {
      let res = await axios.post("http://localhost:4000/login", values)
      console.log(res.data)


      if (res.status === 200) {
        setLoading(!loading)

        localStorage.setItem("user", JSON.stringify(res.data.token))
        localStorage.setItem("u_type", JSON.stringify(res.data.u_type))
        localStorage.setItem("user_name", JSON.stringify(res.data.user_name))
        localStorage.setItem("user_id", JSON.stringify(res.data.user_id))




        if (res.data.u_type === "s") {
          navigate("/dashboard/home")


        }
        else if (res.data.u_type === "a") {
          navigate("/dashboard/Subadmin")


        }
        else if (res.data.u_type === "sa") {
          navigate("/dashboard/client")


        }
        else if (res.data.u_type === "c") {
          navigate("/dashboard/chatRequest")
          // window.location.replace(`${mapReverse2[0].chat_url}?client=${client_name}`);


        }

      }
      else {
        setLoading(false)
        toast(res.response.data.msg, {
          type: 'error'
        });


      }
    } catch (error) {
      //  console.log(error)
      setLoading(false)
      toast("invalide username/password", {
        type: 'error'
      });

    }
  };

  const validation = useFormik({
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(1, "Mininum 1 characters")
        .max(30, "Maximum 30 characters"),
      password: Yup.string().max(255).required('Password is required')


    })
    ,
    initialValues: {
      username: "",
      password: ''

    },
    onSubmit,
  })


  const isValidation = (name) => !!(validation.touched[name] && validation.errors[name]);
  const formiKMessage = (name) => {
    return isValidation(name) && <p style={{ fontSize: '11px' }} className='text-danger '>{validation.errors[name]}</p>
  }




  return (
    <>
      <div>
        <ToastContainer />

      </div>


      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">


          <form onSubmit={validation.handleSubmit}>
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign In
              </Typography>
            </CardHeader>

            <CardBody className="flex flex-col gap-4">
              <Input
                name="username"
                value={validation.values.username}
                onChange={validation.handleChange}
                type="username" label="username" size="lg" />
              {formiKMessage("username")}
              <div    style={{position:"relative"}} className="d-flex">
                <Input

                  name="password"
                  value={validation.values.password}
                  onChange={validation.handleChange}
                  type={view === false ? "password" : "text"} label="Password" size="lg"


                />

                {
                  view === true ? <BsEye style={{
                    position: "absolute",
                    top: "47%",
                    left: "90%"


                  }}
                    onClick={() => { setview(!view) }}

                  /> : <BsEyeSlash style={{
                    position: "absolute",
                    top: "47%",
                    left: "90%"
                  }}
                    onClick={() => { setview(!view) }}
                  />
                }


              </div>


              {formiKMessage("password")}

              <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                Sign In
              </Button>

            </CardFooter>
          </form>

          {
loading?  <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{display:"flex",justifyContent:"center"}}
            wrapperClassName="text-center mx-auto"
            visible={true}
            className="mx-auto"

          />:""
          }

        </Card>
      </div>










    </>
  );
}

export default SignIn;
