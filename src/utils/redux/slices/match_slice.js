import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    matches : [],
}

export const matchSlice = createSlice({
    name : 'match',
    initialState,
    reducers : {
        updateMatchList : (state , action) => {
            return {...state , matches : [...state.matches ,action.payload]}
            
        },

    }

})

export const { updateMatchList  } = matchSlice.actions
export default matchSlice.reducer