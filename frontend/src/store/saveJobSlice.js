import { createSlice } from "@reduxjs/toolkit";
import reducer from "./loginSlice";


const saveJobSlice = createSlice({

    name : 'saveJob',
    initialState : {
        savedJobs : []
    },
    reducers : {
        saveJob : (state, action)=>{
            state.savedJobs = [...state.savedJobs ,action.payload.job]
        }
    }
})

export const {saveJob} = saveJobSlice.actions
export default saveJobSlice.reducer