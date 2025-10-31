import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './loginSlice'
import searchReducer from './searchSlice'
import jobsReducer from './jobsSlice'
import jobHistoryReducer from './applicationSlice'
import signupReducer from './signupSlice'

const store = configureStore({
    reducer : {
        login : loginReducer,
        search : searchReducer,
        jobs : jobsReducer,
        jobHistory : jobHistoryReducer,
        signup : signupReducer,
    }
})

export default store