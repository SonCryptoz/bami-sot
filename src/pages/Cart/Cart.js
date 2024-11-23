import classNames from "classnames/bind";
import { Checkbox } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

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

const cx = classNames.bind(styles);

function Cart() {
    const order = useSelector((state) => state.order);

    const [cartChecked, setCartChecked] = useState([]);

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
            return total + current.price * current.amount;
        }, 0);
        return result;
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
        return priceMemo * (1 - discountMemo / 100) + deliveryMemo;
    }, [priceMemo, discountMemo, deliveryMemo]);

    const handleDeleteOrders = () => {
        if (cartChecked?.length > 0) {
            dispatch(removeAllOrdersProduct({ cartChecked }));
            setCartChecked([]);
        }
    };

    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <h1 className={cx("cart-title")}>Giỏ hàng</h1>
                <div className={cx("cart")}>
                    <div className={cx("cart-table-container")}>
                        {order?.orderItems?.length !== 0 ? (
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
                        <div className={cx("summary-total")}>
                            <span>Tổng thanh toán:</span>
                            <span style={{ color: "#ff7700" }}>{convertPrice(totalPriceMemo)}</span>
                        </div>
                        <Button primary className={cx("checkout-button")}>
                            Tiến hành thanh toán
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;
