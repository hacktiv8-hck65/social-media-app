import {createSlice} from '@reduxjs/toolkit'

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        listPost: [],
    },
    reducers: {
        setPost: (state, action) => {
            state.listPost = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {setPost} = postSlice.actions

export default postSlice.reducer