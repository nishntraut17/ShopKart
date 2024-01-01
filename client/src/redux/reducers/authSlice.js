import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
    name: "auth",
    initialState: {
        userInfo: {},
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        updateRole: (state, action) => {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    role: action.payload
                }
            }
        }
    },
});

export const { setUserInfo, updateRole } = authReducer.actions;
export default authReducer.reducer;
export const selectCurrentUser = (state) => state.auth.userInfo;
