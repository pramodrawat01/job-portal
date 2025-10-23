import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name : "search",
    initialState : {
        searchValue : ""
    }, 
    reducers : {
        userSearch : (state, action)=>{
            return {
                ...state,
                searchValue : action.payload
            }
        }
    }
})



export const {userSearch} = searchSlice.actions
export default searchSlice.reducer