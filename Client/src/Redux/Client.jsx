import axios from "axios";

import {
    createSlice
} from "@reduxjs/toolkit";
import {
    createAsyncThunk
} from "@reduxjs/toolkit";

export const STATUSES = {
    IDLE: 'idle',
    ERROR: 'error',
    Loading: 'loading'
}

const ClientSlice = createSlice({
    name: 'Client',
    initialState: {
        Clientdata: [],
        status: STATUSES.IDLE,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetch_Client.pending, (state, action) => {
                state.status = STATUSES.Loading;


            })
            .addCase(fetch_Client.fulfilled, (state, action) => {
                state.Clientdata = action.payload
                state.status = STATUSES.IDLE;

            })
            .addCase(fetch_Client.rejected, (state, action) => {

                state.status = STATUSES.ERROR;

            })
    }
})

export default ClientSlice.reducer;

// Thunk----
export const fetch_Client = createAsyncThunk("Client/fecth", async () => {
    let res = await axios.get("http://localhost:4000/list/client", {
        headers: {
            'Content-Type': 'application/json',
            'authorization': JSON.parse(localStorage.getItem("user"))
        },



    })
    const Clientdata = res.data
    //  console.log("c",Clientdata)
    return Clientdata;


})