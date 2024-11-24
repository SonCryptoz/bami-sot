import { Upload } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "@/layouts/components/Header";
import styles from "./Profile.module.scss";
import Footer from "@/layouts/components/Footer";
import InputForm from "@/components/InputForm";
import Button from "@/components/Button";
import * as UserService from "@/services/UserService";
import { useMutationHook } from "@/hooks/useMutationHook";
import Loading from "@/components/Loading";
import * as message from "@/components/Message/message";
import { updateUser } from "@/redux/slices/userSlice";
import { getBase64 } from "@/utils";

const cx = classNames.bind(styles);

function Profile() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone);
    const [address, setAddress] = useState(user?.address);
    const [city, setCity] = useState(user?.city);
    const [avatar, setAvatar] = useState(user?.avatar);

    useEffect(() => {
        if (user) {
            setName(user?.name);
            setEmail(user?.email);
            setPhone(user?.phone);
            setAddress(user?.address);
            setCity(user?.city);
            setAvatar(user?.avatar);
        }
    }, [user]);

    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePhone = (e) => setPhone(e.target.value);
    const handleAddress = (e) => setAddress(e.target.value);
    const handleCity = (e) => setCity(e.target.value);

    const handleAvatar = async (info) => {
        const { fileList } = info;

        if (fileList.length > 0) {
            const file = fileList[0];

            // Kiểm tra trạng thái upload là 'done'
            if (file.status === "done") {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                setAvatar(file.preview);
            }
        }
    };

    const mutation = useMutationHook((data) => {
        const { id, access_token, ...res } = data;
        return UserService.updateUser(id, res, access_token);
    });
    const { isPending, isSuccess, isError } = mutation;

    const handleGetDetailsUser = useCallback(
        async (id, token) => {
            const res = await UserService.getDetailsUser(id, token);
            dispatch(updateUser({ ...res?.data, access_token: token }));
        },
        [dispatch],
    );

    useEffect(() => {
        if (isSuccess && user?.id) {
            handleGetDetailsUser(user?.id, user?.access_token);
            message.success("Cập nhật thông tin thành công");
        } else if (isError) {
            message.error("Cập nhật thông tin thất bại");
        }
    }, [isSuccess, isError, user?.id, user?.access_token, handleGetDetailsUser]);

    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, name, email, phone, address, avatar, city, access_token: user?.access_token });
    };

    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <div className={cx("content")}>
                    <h1 className={cx("profile-title")}>Thông tin người dùng</h1>
                    <div className={cx("user")}>
                        <div className={cx("profile")}>
                            <div className={cx("profile-left")}>
                                <h4>Tên tài khoản</h4>
                                <InputForm
                                    placeholder="Tên tài khoản"
                                    className={cx("input", "spacing")}
                                    value={name}
                                    onChange={handleName}
                                />
                                <h4>Email</h4>
                                <InputForm
                                    placeholder="Email"
                                    className={cx("input", "spacing")}
                                    value={email}
                                    onChange={handleEmail}
                                />
                                <h4>Số điện thoại</h4>
                                <InputForm
                                    placeholder="+84"
                                    className={cx("input", "spacing")}
                                    value={phone}
                                    onChange={handlePhone}
                                />
                                <h4>Địa chỉ</h4>
                                <InputForm
                                    placeholder="123 Quang Trung"
                                    className={cx("input", "spacing")}
                                    value={address}
                                    onChange={handleAddress}
                                />
                                <h4>Thành phố</h4>
                                <InputForm
                                    placeholder="Ha Noi"
                                    className={cx("input", "spacing")}
                                    value={city}
                                    onChange={handleCity}
                                />
                            </div>
                            <div className={cx("profile-right")}>
                                {avatar && (
                                    <img
                                        src={
                                            avatar ||
                                            "http://localhost:3000/static/media/bami-sot.9fdfa0bd114f70652ee6.png"
                                        }
                                        alt="avatar"
                                        className={cx("avatar")}
                                    />
                                )}
                                <Upload onChange={handleAvatar} maxCount={1}>
                                    <Button
                                        primary
                                        leftIcon={<FontAwesomeIcon icon={faUpload} />}
                                        className={cx("upload-btn")}
                                    >
                                        Tải ảnh lên
                                    </Button>
                                </Upload>
                            </div>
                        </div>
                        <div className={cx("btn-update")}>
                            <Button primary onClick={handleUpdate} disabled={isPending}>
                                <Loading isPending={isPending}>Cập nhật</Loading>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;
