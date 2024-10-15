import classNames from "classnames/bind";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import InputForm from "@/components/InputForm";
import images from "@/assets/images";
import Button from "@/components/Button";
import styles from "./Register.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import * as UserService from "@/services/UserService";
import { useMutationHook } from "@/hooks/useMutationHook";
import Loading from "@/components/Loading";
import * as message from "@/components/Message/message";

const cx = classNames.bind(styles);

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswsord = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handlePhone = (e) => {
        setPhone(e.target.value);
    };

    const navigate = useNavigate();
    const handleLogin = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    const mutation = useMutationHook((data) => UserService.registerUser(data));

    const { data, isPending, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess && data?.status === "success") {
            message.success("Đăng ký thành công!");
            handleLogin();
        } else if (isError) {
            message.error(data?.message || "Đăng ký thất bại, vui lòng thử lại!");
        }
    }, [isSuccess, isError, data, navigate, handleLogin]);

    const handleRegister = () => {
        mutation.mutate({
            name,
            email,
            password,
            confirmPassword,
            phone,
        });
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("left")}>
                    <h1>Bami Sot xin chào</h1>
                    <p>Đăng nhập hoặc tạo tài khoản</p>
                    <InputForm
                        placeholder="Tên tài khoản"
                        className={cx("input", "spacing")}
                        value={name}
                        onChange={handleName}
                    />
                    <InputForm
                        placeholder="Số điện thoại"
                        className={cx("input", "spacing")}
                        value={phone}
                        onChange={handlePhone}
                    />
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
                        className={cx("input", "spacing")}
                        value={password}
                        onChange={handlePassword}
                        type={showPassword ? "text" : "password"}
                    />
                    <div style={{ position: "relative" }}>
                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                            {showConfirmPassword ? (
                                <FontAwesomeIcon icon={faEye} />
                            ) : (
                                <FontAwesomeIcon icon={faEyeSlash} />
                            )}
                        </span>
                    </div>
                    <InputForm
                        placeholder="Xác nhận mật khẩu"
                        className={cx("input")}
                        value={confirmPassword}
                        onChange={handleConfirmPasswsord}
                        type={showConfirmPassword ? "text" : "password"}
                    />
                    {data?.status === "error" && <span>{data?.message}</span>}
                    <Button
                        disabled={!email.length || !password.length || !confirmPassword.length}
                        primary
                        className={cx("login")}
                        onClick={handleRegister}
                    >
                        <Loading isPending={isPending}>Đăng ký</Loading>
                    </Button>
                    <p>
                        Bạn đã có tài khoản?
                        <span className={cx("text-light")} onClick={handleLogin}>
                            {" "}
                            Đăng nhập
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

export default Register;
