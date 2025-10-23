import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './loginSlice'
import searchReducer from './searchSlice'
import jobsReducer from './jobsSlice'

const store = configureStore({
    reducer : {
        login : loginReducer,
        search : searchReducer,
        jobs : jobsReducer,
    }
})

export default store