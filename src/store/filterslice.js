import { createSlice } from "@reduxjs/toolkit";

const initialState = {search:"",checkbox:false,sleeve:false,male:"",value:"",filterData:[], flag:false}

export const searchSlice = createSlice({
    name :" ecommerce search",
    initialState,

    reducers: {
        updateSearch: (state,action) =>{
            state.search = action.payload;
        },
        updateCheckboox: (state,action) =>{
            state.checkbox = action.payload
        },
        updateSleeve: (state,action) =>{
            state.sleeve = action.payload
        },
        updateMale: (state,action) =>{
            state.male = action.payload
        },
        updateValue: (state,action) =>{
            state.value = action.payload
        },
        toggleModel: (state,action) =>{
            state.flag = action.payload
        }
    }
})


export const searchActions = searchSlice.actions;