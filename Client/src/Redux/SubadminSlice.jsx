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

const SubAdminSlice = createSlice({
    name: 'SubAdmin',
    initialState: {
        SubAdmindata: [],
        status: STATUSES.IDLE,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetch_SubAdmin.pending, (state, action) => {
                state.status = STATUSES.Loading;


            })
            .addCase(fetch_SubAdmin.fulfilled, (state, action) => {
                state.SubAdmindata = action.payload
                state.status = STATUSES.IDLE;

            })
            .addCase(fetch_SubAdmin.rejected, (state, action) => {

                state.status = STATUSES.ERROR;

            })
    }
})

export default SubAdminSlice.reducer;

// Thunk----
export const fetch_SubAdmin = createAsyncThunk("subAdmin/fecth", async () => {
    let res = await axios.get("http://localhost:4000/list/SubAdmin", {
        headers: {
            'Content-Type': 'application/json',
            'authorization': JSON.parse(localStorage.getItem("user"))
        },



    })
    const SubAdmindata = res.data
     console.log("a",SubAdmindata)
    return SubAdmindata;


})