import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

import { publicRoutes } from "@/routes";
import { DefaultLayout } from "@/layouts";
import { isJSONString } from "./utils/user";
import * as UserService from "@/services/UserService";
import { updateUser } from "@/redux/slices/userSlice";
import Loading from "./components/Loading";

function App() {
    const dispatch = useDispatch();

    const [pending, setPending] = useState(false);

    const user = useSelector((state) => state.user);

    // Định nghĩa hàm lấy chi tiết người dùng
    const handleGetDetailsUser = useCallback(
        async (id, token) => {
            const res = await UserService.getDetailsUser(id, token);
            dispatch(updateUser({ ...res?.data, access_token: token }));
        },
        [dispatch],
    );

    // Hàm xử lý token
    const handleDecoded = () => {
        let accessToken = localStorage.getItem("access_token");
        let decoded = {};
        if (accessToken && isJSONString(accessToken)) {
            accessToken = JSON.parse(accessToken);
            decoded = jwtDecode(accessToken);
        }
        return { decoded, accessToken };
    };

    useEffect(() => {
        setPending(true);
        const { accessToken, decoded } = handleDecoded(); // Gọi hàm handleDecoded()
        if (decoded?.id) {
            handleGetDetailsUser(decoded.id, accessToken);
        }
        setPending(false);
    }, [handleGetDetailsUser]); // Đảm bảo rằng handleGetDetailsUser là dependency

    // Interceptor để làm mới token nếu hết hạn
    UserService.axiosJWT.interceptors.request.use(
        async function (config) {
            const currentTime = new Date().getTime();
            const accessToken = localStorage.getItem("access_token");

            if (accessToken && isJSONString(accessToken)) {
                const decoded = jwtDecode(JSON.parse(accessToken));
                if (decoded?.exp < currentTime / 1000) {
                    // Token hết hạn
                    try {
                        const data = await UserService.refreshToken();
                        localStorage.setItem("access_token", JSON.stringify(data?.access_token)); // Cập nhật token mới
                        config.headers["token"] = `Bearer ${data?.access_token}`;
                    } catch (error) {
                        console.error("Làm mới token thất bại", error);
                        return Promise.reject(error); // Trả về lỗi nếu refresh token thất bại
                    }
                } else {
                    config.headers["token"] = `Bearer ${JSON.parse(accessToken)}`;
                }
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        },
    );

    return (
        <Router>
            <div className="App">
                <Loading isPending={pending}>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;

                            // Xác định quyền truy cập
                            const isAuthorized = !route.private || user.isAdmin;

                            let Layout = route.layout === null ? Fragment : DefaultLayout;

                            return (
                                <Route
                                    key={index}
                                    path={isAuthorized ? route.path : undefined}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </Loading>
            </div>
        </Router>
    );
}

export default App;
