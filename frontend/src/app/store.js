import {configureStore} from "@reduxjs/toolkit" 
import videoReducer from "../features/VideoSlice.js"

export const store = configureStore({
    reducer: {
        videoStore: videoReducer
    }
})