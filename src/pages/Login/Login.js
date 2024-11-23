import classNames from "classnames/bind";
import { Image } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";

import styles from "./Login.module.scss";
import InputForm from "@/components/InputForm";
import images from "@/assets/images";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import * as UserService from "@/services/UserService";
import { useMutationHook } from "@/hooks/useMutationHook";
import Loading from "@/components/Loading";
import { updateUser } from "@/redux/slices/userSlice";

const cx = classNames.bind(styles);

function Login() {
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const navigate = useNavigate();
    const handleRegister = () => {
        navigate("/register");
    };

    const mutation = useMutationHook((data) => UserService.loginUser(data));

    const { data, isPending, isSuccess } = mutation;

    // Hàm lấy thông tin người dùng
    const handleGetDetailsUser = useCallback(
        async (id, token) => {
            const res = await UserService.getDetailsUser(id, token);
            dispatch(updateUser({ ...res?.data, access_token: token }));
        },
        [dispatch],
    );

    useEffect(() => {
        const handleLoginSuccess = async () => {
            if (data?.access_token) {
                localStorage.setItem("access_token", JSON.stringify(data.access_token));
                const decoded = jwtDecode(data.access_token);
                if (decoded?.id) {
                    try {
                        await handleGetDetailsUser(decoded.id, data.access_token); // Đợi lấy thông tin người dùng
                        navigate(location?.state || "/"); // Điều hướng chỉ khi hoàn thành
                    } catch (error) {
                        console.error("Failed to fetch user details", error);
                    }
                }
            }
        };

        if (isSuccess) {
            handleLoginSuccess(); // Gọi hàm xử lý logic đăng nhập thành công
        }
    }, [isSuccess, data, handleGetDetailsUser, navigate, location]);

    const handleLogin = () => {
        mutation.mutate({
            email,
            password,
        });
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("left")}>
                    <h1>Bami Sot xin chào</h1>
                    <p>Đăng nhập hoặc tạo tài khoản</p>
                    <InputForm
                        placeholder="example123@gmail.com"
                        className={cx("input", "spacing")}
                        value={email}
                        onChange={handleEmail}
                    />
                    <div style={{ position: "relative" }}>
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                zIndex: 10,
                                position: "absolute",
                                top: "20px",
                                right: "2px",
                                transform: "translate(-50%, -50%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "24px",
                                height: "24px",
                            }}
                        >
                            {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                        </span>
                    </div>
                    <InputForm
                        placeholder="Mật khẩu"
                        className={cx("input")}
                        value={password}
                        onChange={handlePassword}
                        type={showPassword ? "text" : "password"}
                    />
                    {data?.status === "error" && <span>{data?.message}</span>}
                    <Button
                        disabled={!email.length || !password.length}
                        primary
                        className={cx("login")}
                        onClick={handleLogin}
                    >
                        <Loading isPending={isPending}>Đăng nhập</Loading>
                    </Button>
                    <p className={cx("text-light")}>Quên mật khẩu</p>
                    <p>
                        Chưa có tài khoản?
                        <span className={cx("text-light")} onClick={handleRegister}>
                            {" "}
                            Tạo tài khoản
                        </span>
                    </p>
                </div>
                <div className={cx("right")}>
                    <Image src={images.logo} preview={false} alt="image-logo" height="203px" width="203px" />
                    <h4>Đặt hàng nhận ưu đãi tại Bami Sot</h4>
                </div>
            </div>
        </div>
    );
}

export default Login;
