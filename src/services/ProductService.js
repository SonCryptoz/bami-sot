import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProducts = async (value, limitPage) => {
    let res = {};
    if (value?.length > 0) {
        res = await axios.get(
            `${process.env.REACT_APP_API_URL}/product/get-all-products?filter=name&filter=${value}&items=${limitPage}`,
        );
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-products?items=${limitPage}`);
    }
    return res.data;
};

export const getProductsType = async (type, page, limitPage) => {
    if (type) {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/product/get-all-products?filter=type&filter=${type}&items=${limitPage}&page=${page}`,
        );
        return res.data;
    }
};

export const getAllTypeProducts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-types`);
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

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
        headers: { token: `Bearer ${access_token}` },
    });
    return res.data;
};

export const deleteManyProduct = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/delete-many`, data, {
        headers: { token: `Bearer ${access_token}` },
    });
    return res.data;
};
