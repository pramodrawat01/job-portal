import { createSlice } from "@reduxjs/toolkit";


const jobHistorySlice = createSlice({
    name : 'applicationHistory',
    initialState : {
        appliedJobs : []
    },
    reducers : {
        addJob : (state, action) =>{
            return{
                ...state,
                appliedJobs : [...state.appliedJobs, action.payload]
            }
            
        }
    }
})


export const {addJob} = jobHistorySlice.actions;
export default jobHistorySlice.reducer;