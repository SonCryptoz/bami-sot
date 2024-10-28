import axios from "axios";

export const getAllProducts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-products`);
    return res.data;
};
