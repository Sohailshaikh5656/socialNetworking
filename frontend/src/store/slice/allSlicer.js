import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";
import { decrypt, encrypt } from "@/app/assets/encription";
export const fetchAllUsers = createAsyncThunk(
    "users/fetchAllUsers",
    async () => {
        let token = null;
        // Safe client-side check
        if (typeof window !== "undefined") {
            token = localStorage.getItem("auth_token");
        }
        console.log("Token : ",token)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/getAllUsers`, {
            headers: {
                'accept-language': 'en',
                'api_key': process.env.NEXT_PUBLIC_BACKEND_API_KEY,
                "jwt_token" : token
            }
        })
        let responseData = decrypt(response.data);
        responseData = JSON.parse(responseData);
        console.log("This is Response : ", responseData);
        let finalData = []
        if(responseData.data && Array.isArray(responseData.data) && responseData.data.length>0){
            responseData.data.forEach((user)=>{
                try {
                    const encryptedId = encrypt(user.id.toString());
                    finalData.push({...user, id: encryptedId});
                } catch (error) {
                    console.error("Error encrypting user ID:", error);
                }
            })
        }
        return finalData;
    },
);

export const fetchAllPost = createAsyncThunk(
    "users/fetchAllPost",
    async () => {
        let token = null;
        // Safe client-side check
        if (typeof window !== "undefined") {
            token = localStorage.getItem("auth_token");
        }
        console.log("Token : ",token)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/getAllPosts`, {
            headers: {
                'accept-language': 'en',
                'api_key': process.env.NEXT_PUBLIC_BACKEND_API_KEY,
                "jwt_token" : token
            }
        })
        let responseData = decrypt(response.data);
        responseData = JSON.parse(responseData);
        console.log("This is Response : ", responseData);
        let finalData = []
        if(responseData.data && Array.isArray(responseData.data) && responseData.data.length>0){
            responseData.data.forEach((user)=>{
                try {
                    const encryptedId = encrypt(user.id.toString());
                    finalData.push({...user, id: encryptedId});
                } catch (error) {
                    console.error("Error encrypting user ID:", error);
                }
            })
        }
        return finalData;
})


const userSlice = createSlice({
    name : "mySlice",
    initialState:{
        allUsers : [],
        allPosts : [],
        status : 'idle',
        error : null
    },
    reducers :{ 

    },
    extraReducers : (builder)=>{
        builder
        .addCase(fetchAllUsers.pending,(state)=>{
            state.status = "loading"
        })
        .addCase(fetchAllUsers.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.allUsers = action.payload
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchAllPost.pending,(state)=>{
            state.status = "loading"
        })
        .addCase(fetchAllPost.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.allPosts = action.payload
        })
        .addCase(fetchAllPost.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
})

export default userSlice.reducer