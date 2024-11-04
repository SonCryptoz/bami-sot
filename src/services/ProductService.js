import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProducts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-products`);
    return res.data;
};

export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details-product/${id}`);
    return res.data;
};

export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data);
    return res.data;
};

export const updateProduct = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
        headers: { token: `Bearer ${access_token}` },
    });
    return res.data;
};
