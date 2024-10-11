import classNames from "classnames/bind";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import styles from "./Login.module.scss";
import InputForm from "@/components/InputForm";
import images from "@/assets/images";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("suka123@gmail.com");
    const [password, setPassword] = useState("12345");

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

    const handleLogin = () => {
        console.log(email, password);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("left")}>
                    <h1>Xin chào</h1>
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
                    <Button
                        disabled={!email.length || !password.length}
                        primary
                        className={cx("login")}
                        onClick={handleLogin}
                    >
                        Đăng nhập
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
