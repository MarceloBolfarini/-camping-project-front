import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = { isAuthenticated: localStorage.getItem('token') }

export const login = createAction('LOGIN')
export const logout = createAction('LOGOUT')

export default createReducer(
    initialState, {
        [login.type]: (state, action) => ({ ...state, isAuthenticated: true }),
        [logout.type]: (state, action) => ({ ...state, isAuthenticated: false }),
    }
)