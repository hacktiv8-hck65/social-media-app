import { configureStore } from '@reduxjs/toolkit'
import postReducer from './features/post/postSlice'
import authReducer from './features/post/authSlice.js'

export default configureStore({
    reducer: {
        post: postReducer,
        auth: authReducer,
    },
})