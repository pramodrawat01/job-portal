import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// async thunk to call an api

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async(category = '', {rejectWithValue})=>{
        try {
            // const response = axios.get(
            //     `https://remotive.com/api/remote-jobs?category=${category}&limit=500`

            // )
            // return data.data.jobs;

            const response = await fetch(`https://remotive.com/api/remote-jobs?category=${category}&limit=50`)
            const data = await response.json()
            console.log(data.jobs, "aodsfjk")

            return data.jobs
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data || `failed to fetch jobs${error}`)
        }
    }
)

const jobsSlice = createSlice({
    name : 'jobs',
    initialState : {
        jobs : [],
        loading : false,
        error : false
    },
    reducers : {},
    extraReducers : (builder) =>{
        builder
            .addCase(fetchJobs.pending, (state)=>{
                state.loading = true,
                state.error = null
            })
            .addCase(fetchJobs.fulfilled, (state, action)=>{
                state.loading = false,
                state.jobs = action.payload
            })
            .addCase(fetchJobs.rejected, (state, action)=>{
                state.loading = false,
                state.error = action.payload
            })

    }
    
})


export default jobsSlice.reducer