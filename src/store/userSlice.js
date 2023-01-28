import { createSlice } from "@reduxjs/toolkit";

const initialState = {user:"",token:"",error:""}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        updateUser: (state,action) => {
            state.user = action.payload
            state.token = action.payload
        },
        updateError:(state,action) =>{
            state.error = action.payload
        }
    }
})

export const userAction = userSlice.actions;