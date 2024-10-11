import classNames from "classnames/bind";
import { Image } from "antd";

import styles from "./Login.module.scss";
import InputForm from "@/components/InputForm";
import images from "@/assets/images";
import Button from "@/components/Button";

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("left")}>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập hoặc tạo tài khoản</p>
                    <InputForm placeholder="example123@gmail.com" className={cx("input", "spacing")} />
                    <InputForm placeholder="Mật khẩu" className={cx("input")} />
                    <Button primary className={cx("login")}>
                        Đăng nhập
                    </Button>
                    <p className={cx("text-light")}>Quên mật khẩu</p>
                    <p>
                        Chưa có tài khoản?
                        <span className={cx("text-light")}> Tạo tài khoản</span>
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
