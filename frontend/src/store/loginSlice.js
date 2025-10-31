import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({

    // slice name
    name : "login",

    // initial state for login 
    initialState : {
        isLoggedIn : true,
        loggedInUser : null
    },

    // login reducer
    reducers : {
        addUser : (state, action) =>{
            return {
                ...state,
                isLoggedIn : true,
                loggedInUser : action.payload.user
            }
        },
        removeUser : (state, action) =>{
            return {
                ...state,
                isLoggedIn : false,
                loggedInUser : null
            }
        }
    }

})


export const {addUser, removeUser} = loginSlice.actions;
export default loginSlice.reducer;