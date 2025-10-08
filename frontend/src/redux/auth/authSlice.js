import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser, googleLogin} from "./authThunk";


const initialState = {
    user : null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder 
        // register
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user

        })
            .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    
        //login
         .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null
        })
            .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user

        })
            .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })

        //logout

        .addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.user = null
        })

        //google login

        .addCase(googleLogin.pending, (state) => {
            state.loading = true;
            state.error = null
        })
          .addCase(googleLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user
        })

      
    
    }
  
})
export const {setUser} = authSlice.actions
export default authSlice.reducer