import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from './loginSlice'
import jobsReducer from './jobsSlice'
import jobHistoryReducer from './applicationSlice'
import signupReducer from './signupSlice'
import saveJobReducer from './saveJobSlice'

import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
 } from "redux-persist";
import storage from 'redux-persist/lib/storage'


const authPersistConfig = {
    key : 'auth',
    storage
}

const jobPersistConfig = {
    key : 'jobs',
    storage
}

// const persistedAuthReducer = persistReducer(authPersistConfig, )
const persistedJobReducer = persistReducer(jobPersistConfig, saveJobReducer)

const rootReducer = combineReducers({
        login : loginReducer,

        jobs : jobsReducer,                

        jobHistory : jobHistoryReducer,
        signup : signupReducer,
        saveJob : persistedJobReducer // this will persist
})

export const store = configureStore({
    reducer : rootReducer,

    //adding middle ware config
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)