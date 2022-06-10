import { configureStore } from '@reduxjs/toolkit'
import matchReducer from './slices/match_slice'


export const store = configureStore({
  reducer: matchReducer
    
})
