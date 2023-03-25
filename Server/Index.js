const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
require("./db/Config")
const admins = require("./db/admin")
const create_Chat = require("./db/createChat")
const app = express();
const { uuid } = require('uuidv4');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {
    json
} = require("express")
const bodyParser = require("body-parser")
const { unstable_detectScrollType } = require("@mui/utils")
let jwtKey = process.env.REACT_jwtKey
app.use(cors());
app.use(express.json())
// const server = app.listen(4000)
// server.keepAliveTimeout = 61 * 1000
app.use(cors())
// app.use(bodyParser)
let port = process.env.PORT || 4000



const verifyToken = (req, res, next) => {
    console.warn(req.headers["authorization"]);
    let token = req.headers["authorization"]
    if (token) {
        token.split(" ")[1];
        jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({
                    result: "please provide b token"
                })
            } else {
                next()
            }
        })
    } else {
        res.status(401).send({
            result: "please provide a token"
        })
    }

}

app.post("/login", async (req, res) => {
     console.log("b", req.body.username, req.body.password)

    if (req.body.username && req.body.password) {
        // const pw = await bcrypt.hash(req.body.password, 10)
        // console.log("pw",pw)
        let user = await admins.findOne({
            username: req.body.username
        })

        //  console.log("p/w",req.body.password)
         console.log("a", user)
        if (user && user.is_active == true) {


            bcrypt.compare(req.body.password, user.password, function (err, results) {
                if (err) {
                    throw new Error(err)
                }
                if (results) {
                    console.log("result",results)

                    const token = jwt.sign({
                        username: user.username
                    }, jwtKey)
                    return res.status(200).send({
                        token: token,
                        u_type: user.u_type,
                        user_name:user.name,
                        user_id:user._id
                    })
                } else {
                    return res.status(401).send({
                        msg: "Invalid credencial"
                    })
                }
            })

        } else {
            return res.status(401).send({
                msg: "user not found"
            })

        }

    } else {
        return res.status(401).json({
            msg: "both fields required"
        })
    }




})

app.post("/add/admin", verifyToken, async (req, res) => {

     console.log("body", req.body)

    const {
        role
    } = req.body[0]
     console.log(role)
    const {
        name,
        username,
        // email,
        // mobile,
        password,
        // address
    } = req.body[1]
     console.log(name)


    const pw = await bcrypt.hash(password, 10)
    console.log(pw)

    if (req.body) {
        const userExists = await admins.findOne({
            username: username,
            u_type: role
        });

        if (userExists) {
            res.status(203).send({
                mesage: "User already exists"
            });
            throw new Error("User already exists");
        } else {
            let user = new admins({
                name: name,
                username: username,
                // email: email,
                // mobile: mobile,
                password: pw,
                // address: address,
                u_type: role,
                is_active: true
            })
            let result = await user.save();
             console.log("result", result)

            if (result) {
                res.status(200).send(result)

            }
        }



    }



})

app.get("/list/admin", verifyToken, async (request, response) => {

    let result = await admins.find({
        u_type: "a"
    }).select("-password")
    //  console.log(result)
    if (result) {
        response.send(result)
    }

})
app.delete("/delete/admin/:id", verifyToken, async (request, response) => {
     console.log("id", request.params.id)
    let result = await admins.deleteOne({
        _id: request.params.id
    })
     console.log("result", result)
    if (result) {
        response.send(result)
    }

})
app.get("/get/admin/:id", verifyToken, async (request, response) => {
     console.log("edit/id", request.params.id)
    let result = await admins.find({
        _id: request.params.id
    }).select("-password")
    //  console.log("result",result)
    if (result) {
        response.send(result)
    } else {
        response.send({
            result: 'something went wrong'
        })
    }
})
app.put("/update/admin/:id", verifyToken, async (request, response) => {
     console.log("edit/id", request.params.id)
    const {
        name,
        username,
        // email,
        mobile,
        password,
        // address
    } = request.body

    //  console.log("name", password)

    if (password) {

        const salt = await bcrypt.genSalt(10)
        const pw = await bcrypt.hash(password, salt)


         console.log("body", request.body)
        let result = await admins.findOneAndUpdate({
                _id: request.params.id
            }, {
                $set: {
                    name: name,
                    username: username,
                    // email: email,
                    // mobile: mobile,
                    password: pw,
                    // address: address,
                }
            }


        )
         console.log("result1", result)
        if (result) {
            response.send(result)
        } else {
            response.status(203).send({
                result: 'something went wrong'
            })
        }

    } else {



         console.log("body", request.body)
        let result = await admins.findOneAndUpdate({
                _id: request.params.id
            }, {
                $set: {
                    name: name,
                    username: username,
                    // email: email,
                    // mobile: mobile,
                    // address: address,
                }
            }


        )
         console.log("result1", result)
        if (result) {
            response.status(200).send(result)
        } else {
            response.status(203).send({
                result: 'something went wrong'
            })
        }
    }

})




app.get("/search/:key", verifyToken, async (req, res) => {

    let result = await admins.find({
        "$or": [{
                name: {
                    $regex: req.params.key
                },
                u_type: "a"
            },
            {
                username: {
                    $regex: req.params.key
                },
                u_type: "a"
            },
            // {
            //     email: {
            //         $regex: req.params.key
            //     },
            //     u_type: "a"
            // },
            // {
            //     mobile: {
            //         $regex: req.params.key
            //     },
            //     u_type: "a"
            // },
            // {
            //     address: {
            //         $regex: req.params.key
            //     },
            //     u_type: "a"
            // },
        ]
    })
    if (result) {
        res.send(result)
    }
})


app.put("/status/admin/:id", verifyToken, async (req, res) => {

     console.log(req.params.id)

     console.log("status", req.body)

    let result = await admins.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                is_active: req.body.value
            }
        }


    )
     console.log("result1", result)
    if (result) {
        res.status(200).send(result)
    } else {
        res.status(201).send("something went wrong")
    }


})

// clients section--------------

app.post("/add/client", verifyToken, async (req, res) => {

     console.log("body", req.body)

    // res.send("hello")

    const {
        role
    } = req.body[0]
     console.log(role)
    const {
        name,
        username,
        // email,
        // mobile,
        password,
        // address
    } = req.body[1]
     console.log(name)
    let addedBy = req.body[2]
    let addedBy_id = req.body[3]
    const salt = await bcrypt.genSalt(10)
    const pw = await bcrypt.hash(password, salt)

    if (req.body) {


        const userExists = await admins.findOne({
            username: username,
            u_type: role
        });

        if (userExists) {
            res.status(203).send("User already exists")
            throw new Error("User already exists");
        } else {
            let user = new admins({
                name: name,
                username: username,
                // email: email,
                // mobile: mobile,
                password: pw,
                // address: address,
                u_type: role,
                addedBy: addedBy,
                addedBy_id: addedBy_id,
                is_active: true
            })
            let result = await user.save();
             console.log("result", result)

            if (result) {
                res.status(200).send(result)

            }
        }



    }



})

// app.get("/list/client", verifyToken, async (request, response) => {

//     let result = await admins.find({
//         u_type: "c"
//     }).select("-password")
//      console.log("client", result)
//     if (result) {
//         response.send(result)
//     }

// })


app.post("/list/client", verifyToken, async (request, response) => {

// console.log(request.body.user_name)
    if(request.body.u_type ==="s"){
        let result = await admins.find({
            u_type: "c",



        }).select("-password")
         console.log("client", result)
        if (result) {
            response.send(result)
        }

    }
    else{
        let result = await admins.find({
            u_type: "c",
            addedBy_id:request.body.user_id,
            // is_active:true


        }).select("-password")
         console.log("client", result)
        if (result) {
            response.send(result)
        }
    }


})

app.delete("/delete/client/:id", verifyToken, async (request, response) => {
     console.log("id", request.params.id)
    let result = await admins.deleteOne({
        _id: request.params.id
    })
     console.log("result", result)
    if (result) {
        response.send(result)
    }

})



app.get("/get/client/:id", verifyToken, async (request, response) => {
     console.log("edit/id", request.params.id)
    let result = await admins.find({
        _id: request.params.id
    }).select("-password")
    //  console.log("result",result)
    if (result) {
        response.send(result)
    } else {
        response.send({
            result: 'something went wrong'
        })
    }
})

app.put("/update/client/:id", verifyToken, async (request, response) => {
     console.log("edit/id", request.params.id)
    const {
        name,
        username,

        password,

    } = request.body

     console.log("name", password)
    if (password) {
        const salt = await bcrypt.genSalt(10)
        const pw = await bcrypt.hash(password, salt)


         console.log("body", request.body)
        let result = await admins.findOneAndUpdate({
                _id: request.params.id
            }, {
                $set: {
                    name: name,
                    username: username,

                    password: pw,

                }
            }


        )
         console.log("result1", result)
        if (result) {
            response.send(result)
        } else {
            response.status(203).send({
                result: 'something went wrong'
            })
        }
    } else {



         console.log("body", request.body)
        let result = await admins.findOneAndUpdate({
                _id: request.params.id
            }, {
                $set: {
                    name: name,
                    username: username,

                }
            }


        )
         console.log("result1", result)
        if (result) {
            response.send(result)
        } else {
            response.status(203).send({
                result: 'something went wrong'
            })
        }
    }

})



app.get("/search/client/:key", verifyToken, async (req, res) => {

    let result = await admins.find({
        "$or": [{
                name: {
                    $regex: req.params.key
                },
                u_type: "c"
            },
            {
                username: {
                    $regex: req.params.key
                },
                u_type: "c"
            },


        ]
    })
    if (result) {
        res.send(result)
    }
})




app.put("/status/client/:id", verifyToken, async (req, res) => {

     console.log(req.params.id)

     console.log("status", req.body)

    let result = await admins.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                is_active: req.body.value
            }
        }


    )
     console.log("result1", result)
    if (result) {
        res.status(200).send(result)
    } else {
        res.status(201).send("something went wrong")
    }


})



// Sub Admin SDection-----------

app.post("/add/SubAdmin", verifyToken, async (req, res) => {



     console.log("subadmin", req.body)

    // res.send("hello")

    const {
        role
    } = req.body[0]
     console.log(role)
    const {
        name,
        username,
        // email,
        // mobile,
        password,
        // address
    } = req.body[1]
    let addedBy  = req.body[2]
    let addedBy_id  = req.body[3]
     console.log(name)
    const salt = await bcrypt.genSalt(10)
    const pw = await bcrypt.hash(password, salt)

    if (req.body) {
        const userExists = await admins.findOne({
            username: username,
            u_type: role
        });

        if (userExists) {
            res.status(203).send("User already exists");
            throw new Error("User already exists");
        } else {
            let user = new admins({
                name: name,
                username: username,
                // email: email,
                // mobile: mobile,
                password: pw,
                // address: address,
                u_type: role,
                addedBy: addedBy,
                addedBy_id: addedBy_id,
                is_active: true
            })
            let result = await user.save();
             console.log("result", result)

            if (result) {
                res.send(result)

            }

        }


    }



})




app.post("/list/SubAdmin", verifyToken, async (request, response) => {
console.log(request.body.u_name)

if(request.body.u_type === "s"){

    let result = await admins.find({
        u_type: "sa",

    }).select("-password")
     console.log("client", result)
    if (result) {
        response.send(result)
    }
}
else{
    let result = await admins.find({
        u_type: "sa",
        addedBy:request.body.u_name
    }).select("-password")
     console.log("client", result)
    if (result) {
        response.send(result)
    }
}

})


app.delete("/delete/SubAdmin/:id", verifyToken, async (request, response) => {
     console.log("id", request.params.id)
    let result = await admins.deleteOne({
        _id: request.params.id
    })
     console.log("result", result)
    if (result) {
        response.send(result)
    }

})



app.get("/get/SubAdmin/:id", verifyToken, async (request, response) => {
     console.log("edit/id", request.params.id)
    let result = await admins.find({
        _id: request.params.id
    }).select("-password")
    //  console.log("result",result)
    if (result) {
        response.send(result)
    } else {
        response.send({
            result: 'something went wrong'
        })
    }
})

app.put("/update/SubAdmin/:id", verifyToken, async (request, response) => {
     console.log("edit/id", request.params.id)
    const {
        name,
        username,
        // email,
        // mobile,
        password,
        // address
    } = request.body

     console.log("name", password)
    if (password) {
        const salt = await bcrypt.genSalt(10)
        const pw = await bcrypt.hash(password, salt)
        //  console.log(decrypt(pw))

         console.log("body", request.body)
        let result = await admins.findOneAndUpdate({
                _id: request.params.id
            }, {
                $set: {
                    name: name,
                    username: username,
                    // email: email,
                    // mobile: mobile,
                    password: pw,
                    // address: address,
                }
            }


        )
         console.log("result1", result)
        if (result) {
            response.send(result)
        } else {
            response.status(203).send({
                result: 'something went wrong'
            })
        }
    } else {


         console.log("body", request.body)
        let result = await admins.findOneAndUpdate({
                _id: request.params.id
            }, {
                $set: {
                    name: name,
                    username: username,
                    // email: email,
                    // mobile: mobile,
                    // address: address,
                }
            }


        )
         console.log("result1", result)
        if (result) {
            response.send(result)
        } else {
            response.status(203).send({
                result: 'something went wrong'
            })
        }
    }


})




app.get("/search/SubAdmin/:key", verifyToken, async (req, res) => {

    let result = await admins.find({
        "$or": [{
                name: {
                    $regex: req.params.key
                },
                u_type: "sa"
            },
            {
                username: {
                    $regex: req.params.key
                },
                u_type: "sa"
            },
            // {
            //     email: {
            //         $regex: req.params.key
            //     },
            //     u_type: "sa"
            // },
            // {
            //     mobile: {
            //         $regex: req.params.key
            //     },
            //     u_type: "sa"
            // },
            // {
            //     address: {
            //         $regex: req.params.key
            //     },
            //     u_type: "sa"
            // },
        ]
    })
    if (result) {
        res.send(result)
    }
})

app.put("/status/subadmin/:id", verifyToken, async (req, res) => {



     console.log(req.params.id)

     console.log("status", req.body)

    let result = await admins.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                is_active: req.body.value
            }
        }


    )
     console.log("result1", result)
    if (result) {
        res.status(200).send(result)
    } else {
        res.status(201).send("something went wrong")
    }


})

app.post("/chat/client", verifyToken, async (request, response) => {


    if(request.body.u_type ==="s"){
        let result = await admins.find({
            u_type:'c',is_Active:true
          })
          //  console.log("result",result)
          if (result) {
              response.send(result)
               console.log(result)
          } else {
              response.send({
                  result: 'something went wrong'
              })
          }
    }
    else{
        let result = await admins.find({
            addedBy_id : request.body.user_id ,is_Active:true
          })
          //  console.log("result",result)
          if (result) {
              response.send(result)
               console.log(result)
          } else {
              response.send({
                  result: 'something went wrong'
              })
          }
    }

})


// app.get("/delet/akk" ,async(req,res)=>{
//     let result = await create_Chat.deleteMany({
//         is_active:true
//     })
//     if(result){
//         res.send(result)
//         console.log(result)
//     }
// })

app.post("/create/chat", verifyToken,async(req,res)=>{



//  console.log( req.body.chat_date)
    if(req.body){
        console.warn("chat",req.body.arr )
        console.warn("chat",req.body.arr1 )
        let user = new create_Chat({

            chat_host: req.body.user_name,
            user_type: req.body.u_type,
            chat_members_id: req.body.arr,
            chat_members_name: req.body.arr1,
            chat_host_id:req.body.user_id,

            chat_url: `https://voicechat.online:3000/join/${req.body.Random}${req.body.user_id}${req.body.arr.length}`,
            is_active:true,


        })
        let result = await user.save();
         console.log("create_Chat",result)
        res.status(200).send({result:"successfully created chat"})
    }
    else{
        res.status(201).send({result:"all fields required"})
    }


})


app.get("/chat/invitation/:key"  , verifyToken ,async(req,res)=>{

   console.log(req.params.key)

    let result = await create_Chat.find({
        "chat_members_id": {
            "$in": [
                req.params.key

            ]
          },
        is_active:true

      })

       console.log( "request",result)


      if(result){
        res.status(200).send(result)
      }
      else{
        res.status(201).send("no chat request")
      }

}  )

app.post("/chat/list" ,async (req,res)=>{

// let u_type = req.params.key
//  console.log("n",u_type)

if(req.body.u_type === "s"){
    let result = await create_Chat.find({

    })

     console.log( "list",result)



    if(result){
      res.status(200).send(result)
    }
    else{
      res.status(201).send("no data found")
    }


}else{

    let result = await create_Chat.find({

        user_type:req.body.u_type,
        chat_host_id:req.body.user_id

    })

     console.log( "list",result)



    if(result){
      res.status(200).send(result)
    }
    else{
      res.status(201).send("no data found")
    }

}


  }  )
  app.put("/status/chats/:id", verifyToken, async (req, res) => {



     console.log(req.params.id)

     console.log("status1", req.body)

    let result = await create_Chat.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                is_active: req.body.value
            }
        }


    )
     console.log("result1", result)
    if (result) {
        res.status(200).send(result)
    } else {
        res.status(201).send("something went wrong")
    }


})

app.get("/admin/update", verifyToken, async (req,res)=>{

    // res.send("hello")

    let result = await admins.find({
        u_type:'s'
      }).select("-password")
 console.log(result)
    res.send(result)
})

app.put("/admin/profile/update", verifyToken, async (req,res)=>{

let username = req.body.username
let password = req.body.password
//  console.log("j",req.body.email)

 console.log("k",req.body.password)


    if(req.body.username && req.body.password){

        const salt = await bcrypt.genSalt(10)
        const pw = await bcrypt.hash(password, salt)

        let result = await admins.findOneAndUpdate({
            u_type:'s',
            _id:req.body.id
        },{
            $set: {
                username: username,
                password:pw

            }
        }

        )
        if(result){
            res.status(200).send({message:"successfully updated the profile"})
        }
        else{
            res.status(203).send({message:"something went wrong try again later!"})
        }


    }

    else {

        let result = await admins.findOneAndUpdate({
            u_type:'s'
        },{
            $set: {
                username: username

            }
        }

        )
        if(result){
            res.status(200).send({message:"successfully updated the profile"})
        }
        else{
            res.status(203).send({message:"something went wrong try again later!"})
        }


    }
})


app.post("/validate" ,async (req, res)=>{
    // res.send("hello")
     console.log("a",req.body.hello)


  let result = await  create_Chat.find({
    chat_url:req.body.hello,is_active:true ,
  })
     console.log(result)
    if(result.length>0){
        res.status(200).send(result)
         console.log(result)
    }
    else{
        res.status(201).send("something wrong")
         console.log("no data found")
    }


})

app.get("/get/totalClients/:id" , verifyToken, async (req,res)=>{
console.log("fg",req.params.id)

    let result = await  admins.find({
        addedBy_id:req.params.id
      })

      if(result){
        res.status(200).send(result)
         console.log("o",result)
      }else{
        res.status(201).send({result:"no result found"})
        // console.log(result)
      }

})
app.post("/get/client/list/:id" , async (req,res)=>{
// console.log("fg",req.params.id)

// res.send("hello" ,req.params.id)
console.log("id",req.params.id)

    let result = await  create_Chat.find({
        _id:req.params.id
      })

      if(result){
        res.status(200).send(result)
         console.log("o",result)
      }else{
        res.status(201).send({result:"no result found"})
        // console.log(result)
      }

})
if(process.env.NODE_ENV === "production"){
    app.use(express.static("Client/dist"))
}

app.listen(port, () => {
     console.log(`app is running on port ${port}`)
})