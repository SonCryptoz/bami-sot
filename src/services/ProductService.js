import axios from "axios";

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
