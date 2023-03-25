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

const AdminSlice = createSlice({
    name: 'Admin',
    initialState: {
        Admindata: [],
        A_status: STATUSES.IDLE,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetch_Admin.pending, (state, action) => {
                state.status = STATUSES.Loading;


            })
            .addCase(fetch_Admin.fulfilled, (state, action) => {
                state.Admindata = action.payload
                state.status = STATUSES.IDLE;

            })
            .addCase(fetch_Admin.rejected, (state, action) => {

                state.status = STATUSES.ERROR;

            })
    }
})

export default AdminSlice.reducer;

// Thunk----
export const fetch_Admin = createAsyncThunk("Admin/fecth", async () => {
    let res = await axios.get("http://localhost:4000/list/admin", {
        headers: {
            'Content-Type': 'application/json',
            'authorization': JSON.parse(localStorage.getItem("user"))
        },



    })
    const Admindata = res.data
     console.log("a",Admindata)
    return Admindata;


})