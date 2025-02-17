import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userDetails: null, // Store user details as an object or null if not logged in
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            // This reducer sets the user details in the store
            state.userDetails = action.payload;
        },
        clearUserDetails: (state) => {
            // This reducer clears the user details (for logout)
            state.userDetails = null;
        },
    },
});

// Export action creators
export const { setUserDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;
