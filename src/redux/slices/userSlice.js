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
            const {
                name = "",
                email = "",
                isAdmin = false,
                phone = "",
                address = "",
                avatar = "",
                _id = "",
                access_token = "",
            } = action.payload;
            state.name = name || email;
            state.email = email;
            state.isAdmin = isAdmin;
            state.phone = phone;
            state.address = address;
            state.avatar = avatar;
            state.id = _id;
            state.access_token = access_token;
        },
        resetUser: (state) => {
            state.name = "";
            state.email = "";
            state.isAdmin = false;
            state.phone = "";
            state.address = "";
            state.avatar = "";
            state.id = "";
            state.access_token = "";
        },
    },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
