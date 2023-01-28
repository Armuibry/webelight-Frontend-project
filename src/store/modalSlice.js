import { createSlice } from "@reduxjs/toolkit";

const initialState = {modelItem:""};

export const modelSlice = createSlice({
    name: "model Item",
    initialState,
    reducers:{
        addToModel: (state,action) => {
            state.modelItem = action.payload
        }
    }
})

export const modelActions = modelSlice.actions;

