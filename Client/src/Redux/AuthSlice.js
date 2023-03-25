

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"


export const loginUser = createAsyncThunk("user" ,async(body)=>{

    const resp = await axios.post("http://localhost:4000/login" ,body)
    //  console.log(resp)

    return resp.data



})

const AuthSlice = createSlice({
    name:'Auth',
    intialState:{
      isLoading:false,
      iserror:false,



    }
    ,reducer:{
        addToken:(state , action)=>{
            state.token=localStorage.getItem("token" )
        },
        addUser:(state,action)=>{
            state.user=localStorage.getItem("user" )
        }
    },
    extraReducers:{

        [loginUser.pending]:(state,action)=>{
            state.isLoading=true
        },
        [loginUser.fulfilled]:(state, {payload:{user,token}})=>{
            state.isLoading=false,
            state.token=token,
            state.user=user
            localStorage.setItem("token",JSON.stringify(token))
            localStorage.setItem("user",JSON.stringify(user))
        },
        [loginUser.rejected]:(state, action)=>{
            state.iserror=true
        }

    }
})
export default AuthSlice.reducer;
export const {addToken,addUser  } = AuthSlice.actions
