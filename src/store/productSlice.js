import { createSlice } from "@reduxjs/toolkit";

const initialState = {product:[],filterArray:[],status:"pending",error:false,message:"Loading data from server"}

export const productSlice = createSlice({
    name: "ecommerce",
    initialState,
    reducers:{
        addproduct:(state,action)=>{
            state.product = action.payload;
        },
        setStatus: (state,action)=>{
            state.status = action.payload.status
            state.error = action.payload.error
            state.message = action.payload.message
        }
    }
})

export const productActions = productSlice.actions;

export const getProduct = ()=>{
    return async (dispatch) =>{
        
        const fetchData = async()=>{
           const response = await fetch("https://ecommerce-backend-webe.onrender.com/api/products");

           if(!response.ok){
            throw new Error("Data could not fetch");
           }
           const data = response.json();
           
           return data;
        }
        try {
            const product = await fetchData();
            dispatch(productActions.setStatus({
                status:"success",
                error:false,
                message:"Data Fetched Success"
            }))
            
            dispatch(productActions.addproduct(product))
        } catch (error) {
            dispatch({
                status:"error",
                title:"Error from server",
                message:"Fetching product data is failed"
            })
            
        }
    }
}


