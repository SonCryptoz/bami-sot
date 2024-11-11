import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, data);
    return res.data;
};

export const registerUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, data);
    return res.data;
};

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details-user/${id}`, {
        headers: { token: `Bearer ${access_token}` },
    });
    return res.data;
};

export const getAllUsers = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-all-users`, {
        headers: { token: `Bearer ${access_token}` },
    });
    return res.data;
};

export const refreshToken = async () => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/refresh-token`,
        {},
        {
            withCredentials: true,
        },
    );
    return res.data;
};

export const logoutUser = async () => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/logout`,
        {},
        {
            withCredentials: true,
        },
    );
    return res.data;
};

export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
        headers: { token: `Bearer ${access_token}` },
    });
    return res.data;
};

export const deleteUser = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, {
        headers: { token: `Bearer ${access_token}` },
    });
    return res.data;
};
