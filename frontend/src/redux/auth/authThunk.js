import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios";




export const googleLogin = createAsyncThunk("auth/googleLogin",
    async (firebaseToken, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/google", {}, {
                headers: {Authorization: `Bearer ${firebaseToken}`}
            })
            console.log(res.data)
            return res.data

           
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Registration Failed!")
        }
    }
)



export const registerUser = createAsyncThunk("auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/register", userData)
            return res.data
           
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Registration Failed!")
        }
    }
)

export const loginUser = createAsyncThunk("auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/login", userData)
            console.log(res.data)
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login Failed!")
        }
    }
)



export const logoutUser = createAsyncThunk("auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/logout")
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Logout Failed!")
        }
    }
)