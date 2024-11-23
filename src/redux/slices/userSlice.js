import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    isAdmin: false,
    phone: "",
    address: "",
    avatar: "",
    id: "",
    access_token: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            Object.assign(state, action.payload); // Cập nhật từ payload
        },
        resetUser: (state) => {
            Object.assign(state, initialState); // Reset về giá trị ban đầu
        },
    },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
