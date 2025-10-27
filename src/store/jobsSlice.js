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
            

            // await new Promise(res => setTimeout(res, 10000));

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
        categories : [],
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

                // ✅ Derive categories from jobs
                const categoryMap = {};
                action.payload.forEach(job => {
                    categoryMap[job.category] = (categoryMap[job.category] || 0) + 1;
                });

                state.categories = Object.entries(categoryMap).map(([category, count]) => ({
                    category,
                    numOfJobs: count,
                }));
            })
            .addCase(fetchJobs.rejected, (state, action)=>{
                state.loading = false,
                state.error = action.payload
            })

    }
    
})


export default jobsSlice.reducer