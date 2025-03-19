import classNames from "classnames/bind";
import { Checkbox } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "antd";

import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import styles from "./Cart.module.scss";
import Button from "@/components/Button";
import {
    increaseAmount,
    decreaseAmount,
    updateAmount,
    removeOrderProduct,
    removeAllOrdersProduct,
} from "@/redux/slices/orderSlice";
import { useEffect, useMemo, useState } from "react";
import { convertPrice } from "@/utils";
import { useMutationHook } from "@/hooks/useMutationHook";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import * as UserService from "@/services/UserService";
import InputForm from "@/components/InputForm";
import { updateUser } from "@/redux/slices/userSlice";
import * as message from "@/components/Message/message";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Cart() {
    const navigate = useNavigate();
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const [form] = Form.useForm();

    const [cartChecked, setCartChecked] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [stateUserDetails, setStateUserDetails] = useState({
        name: "",
        phone: 0,
        address: "",
        city: "",
    });

    const dispatch = useDispatch();

    const handleChange = (type, idProduct) => {
        if (type === "increase") {
            dispatch(increaseAmount({ idProduct }));
        } else if (type === "decrease") {
            dispatch(decreaseAmount({ idProduct }));
        }
    };

    const handleChangeOneOrder = (e) => {
        const value = e.target.value;
        if (cartChecked.includes(value)) {
            const newCartListChecked = cartChecked.filter((check) => check !== value);
            setCartChecked(newCartListChecked);
        } else {
            setCartChecked([...cartChecked, value]);
        }
    };

    const handleChangeOrders = (e) => {
        const checked = e.target.checked;
        if (checked) {
            const newCartListChecked = order?.orderItems?.map((item) => item.product);
            setCartChecked(newCartListChecked);
        } else {
            setCartChecked([]);
        }
    };

    const quantityChange = (event, idProduct) => {
        let value = Number.parseInt(event.target.value);
        if (!value || value < 1) {
            value = 1;
        } else if (value > 100) {
            value = 100;
        }
        dispatch(updateAmount({ idProduct, amount: value }));
    };

    const handleDeleteOneOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }));
    };

    const handleOnChangeDetails = (e) => {
        const { name, value } = e.target;
        setStateUserDetails({
            ...stateUserDetails,
            [name]: value,
        });
    };

    useEffect(() => {
        if (!order?.orderItems) return;

        // Chỉ cập nhật cartChecked nếu số lượng checked items không khớp
        if (cartChecked.length > order?.orderItems.length) {
            const checkedItems = order?.orderItems
                .filter((item) => cartChecked.includes(item.product))
                .map((item) => item.product);
            setCartChecked(checkedItems);
        }
    }, [order?.orderItems, cartChecked]);

    const priceMemo = useMemo(() => {
        const result = order?.orderItems?.reduce((total, current) => {
            return total + current.price * current.amount * (1 - 0 / 100);
        }, 0);
        if (result) return result;
        return 0;
    }, [order]);

    const discountMemo = useMemo(() => {
        const result = order?.orderItems?.reduce((total, current) => {
            return total + current.discount * current.amount;
        }, 0);
        if (result) return result;
        return 0;
    }, [order]);

    const deliveryMemo = useMemo(() => {
        if (priceMemo < 200000) {
            return 10000;
        } else if (priceMemo > 200000 && priceMemo < 1000000) {
            return 25000;
        } else {
            return 50000;
        }
    }, [priceMemo]);

    const totalPriceMemo = useMemo(() => {
        return priceMemo + deliveryMemo;
    }, [priceMemo, deliveryMemo]);

    const handleDeleteOrders = () => {
        if (cartChecked?.length > 0) {
            dispatch(removeAllOrdersProduct({ cartChecked }));
            setCartChecked([]);
        }
    };

    const validateUserDetails = () => {
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(stateUserDetails.phone)) {
            message.error("Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.");
            return false;
        }

        return true; // Trả về true nếu tất cả hợp lệ
    };

    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...res } = data;
        return UserService.updateUser(id, { ...res }, token);
    });
    const { data, isSuccess, isError, isPending } = mutationUpdate;

    useEffect(() => {
        if (isSuccess && data?.status === "success") {
            message.success("Cập nhật thành công");
            isModalClose();
        } else if (isError) {
            message.error("Cập nhật thất bại");
        }
    }, [data, isSuccess, isError]);

    const isModalClose = () => {
        setStateUserDetails({ name: "", phone: 0, address: "", city: "" });
        setIsOpenModal(false);
    };

    useEffect(() => {
        form.setFieldsValue({ ...stateUserDetails });
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (isOpenModal) {
            setStateUserDetails({
                name: user?.name || "",
                phone: user?.phone || "",
                address: user?.address || "",
                city: user?.city || "",
            });
        }
    }, [isOpenModal, user?.name, user?.phone, user?.address, user?.city]);

    const handleChangeAddress = () => {
        setIsOpenModal(true);
    };

    const handleUpdate = () => {
        const { name, phone, address, city } = stateUserDetails;
        if (!validateUserDetails()) {
            return;
        }
        if (name && phone && address && city) {
            mutationUpdate.mutate(
                { id: user?.id, token: user?.access_token, ...stateUserDetails },
                {
                    onSuccess: (data) => {
                        if (data?.status === "success") {
                            dispatch(updateUser(stateUserDetails));
                            setIsOpenModal(false);
                        }
                    },
                },
            );
        }
    };

    const handleBuy = () => {
        if (!user?.phone || !user?.address || !user?.name || !user?.city) {
            setIsOpenModal(true);
        } else {
            navigate("/order");
        }
    };

    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <h1 className={cx("cart-title")}>Giỏ hàng</h1>
                {order?.orderItems?.length !== 0 ? (
                    <div className={cx("cart")}>
                        <div className={cx("cart-table-container")}>
                            <table className={cx("cart-table")}>
                                <thead>
                                    <tr>
                                        <th>
                                            <Checkbox
                                                className={cx("chbx-title")}
                                                onChange={handleChangeOrders}
                                                checked={
                                                    cartChecked?.length === order?.orderItems?.length &&
                                                    cartChecked?.length > 0
                                                }
                                            >
                                                Tất cả {order?.orderItems?.length || 0} sản phẩm
                                            </Checkbox>
                                        </th>
                                        <th>Tên sản phẩm</th>
                                        <th>Đơn giá</th>
                                        <th>Số lượng</th>
                                        <th>Thành tiền</th>
                                        <th>
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className={cx("icon-trash")}
                                                onClick={handleDeleteOrders}
                                            />
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {order?.orderItems?.map((order, index) => (
                                        <tr key={index}>
                                            <td>
                                                <Checkbox
                                                    onChange={handleChangeOneOrder}
                                                    value={order?.product}
                                                    checked={cartChecked.includes(order?.product)}
                                                >
                                                    <img src={order?.image} alt="Product" className={cx("image")} />
                                                </Checkbox>
                                            </td>
                                            <td>{order?.name}</td>
                                            <td>{convertPrice(order?.price)}</td>
                                            <td>
                                                <div className={cx("control-quantity")}>
                                                    <button
                                                        className={cx("button-control")}
                                                        onClick={() => handleChange("decrease", order?.product)}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        max={100}
                                                        value={order?.amount}
                                                        onChange={(e) => quantityChange(e, order?.product)}
                                                        className={cx("input-control")}
                                                    />
                                                    <button
                                                        className={cx("button-control")}
                                                        onClick={() => handleChange("increase", order?.product)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td>{convertPrice(order?.price * order?.amount)}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className={cx("icon-trash")}
                                                    onClick={() => handleDeleteOneOrder(order?.product)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={cx("cart-summary")}>
                            <h2 className={cx("summary-title")}>Tóm tắt đơn hàng</h2>
                            <div className={cx("summary-item")}>
                                <span>Tổng tiền hàng:</span>
                                <span>{convertPrice(priceMemo)}</span>
                            </div>
                            <div className={cx("summary-item")}>
                                <span>Giảm giá:</span>
                                <span>{discountMemo} %</span>
                            </div>
                            <div className={cx("summary-item")}>
                                <span>Phí vận chuyển:</span>
                                <span>{convertPrice(deliveryMemo)}</span>
                            </div>
                            <div className={cx("bordered")}></div>
                            <div className={cx("summary-item")}>
                                <span>Địa chỉ:</span>
                                <span style={{ color: "green", fontWeight: "600" }}>
                                    {user?.address + ", " + user?.city}
                                </span>
                            </div>
                            <div className={cx("summary-item", "right")}>
                                <span className={cx("change-address")} onClick={handleChangeAddress}>
                                    Thay đổi
                                </span>
                            </div>
                            <div className={cx("summary-total")}>
                                <span>Tổng thanh toán:</span>
                                <span style={{ color: "#ff7700" }}>{convertPrice(totalPriceMemo)}</span>
                            </div>
                            <Button primary className={cx("checkout-button")} onClick={handleBuy}>
                                Tiến hành thanh toán
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className={cx("empty-cart")}>
                        <div className={cx("empty-title")}>
                            <h1>Giỏ hàng trống</h1>
                        </div>
                        <div className={cx("empty-icon")}>
                            <FontAwesomeIcon icon={faCartPlus} style={{ fontSize: "10rem" }} />
                        </div>
                    </div>
                )}
            </div>
            <Modal title="Cập nhật thông tin giao hàng (bắt buộc)" isOpen={isOpenModal} onClose={isModalClose}>
                <Loading isPending={isPending}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        style={{
                            maxWidth: 600,
                            fontFamily: "var(--font-family)",
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={handleUpdate}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tên User"
                            name="name"
                            className={cx("custom-form-item")}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên người dùng!",
                                },
                            ]}
                        >
                            <InputForm
                                placeholder="Tên người dùng"
                                className={cx("input", "spacing")}
                                value={stateUserDetails.name}
                                onChange={handleOnChangeDetails}
                                name="name"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số điện thoại!",
                                },
                            ]}
                            className={cx("custom-form-item")}
                        >
                            <InputForm
                                placeholder="+84"
                                type="text"
                                className={cx("input", "spacing")}
                                value={stateUserDetails.phone}
                                onChange={handleOnChangeDetails}
                                name="phone"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập địa chỉ!",
                                },
                            ]}
                            className={cx("custom-form-item")}
                        >
                            <InputForm
                                placeholder="123 Satte..."
                                className={cx("input", "spacing")}
                                value={stateUserDetails.address}
                                onChange={handleOnChangeDetails}
                                name="address"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Thành phố"
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên thành phố!",
                                },
                            ]}
                            className={cx("custom-form-item")}
                        >
                            <InputForm
                                placeholder="Ha Noi"
                                className={cx("input", "spacing")}
                                value={stateUserDetails.address}
                                onChange={handleOnChangeDetails}
                                name="city"
                            />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 6,
                                span: 18,
                            }}
                        >
                            <Button primary className={cx("upload-btn")}>
                                Cập nhật thông tin
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </Modal>
            <Footer />
        </div>
    );
}

export default Cart;
