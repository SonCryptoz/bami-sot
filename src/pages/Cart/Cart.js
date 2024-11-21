import classNames from "classnames/bind";
import { Checkbox } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import styles from "./Cart.module.scss";
import Button from "@/components/Button";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function Cart() {
    const order = useSelector((state) => state.order);

    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <h1 className={cx("cart-link")}>Giỏ hàng</h1>
                <div className={cx("cart")}>
                    <div className={cx("cart-table-container")}>
                        <table className={cx("cart-table")}>
                            <thead>
                                <tr>
                                    <th>
                                        <Checkbox className={cx("chbx-title")}>
                                            Tất cả {order?.orderItems?.length || 0} sản phẩm
                                        </Checkbox>
                                    </th>
                                    <th>Tên sản phẩm</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                    <th>
                                        <FontAwesomeIcon icon={faTrash} className={cx("icon-trash")} />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {order?.orderItems?.map((order, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Checkbox>
                                                <img src={order?.image} alt="Product" className={cx("image")} />
                                            </Checkbox>
                                        </td>
                                        <td>{order?.name}</td>
                                        <td>
                                            {order?.price.toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </td>
                                        <td>
                                            <div className={cx("control-quantity")}>
                                                <button className={cx("button-control")}>-</button>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    max={100}
                                                    value={order?.amount}
                                                    className={cx("input-control")}
                                                />
                                                <button className={cx("button-control")}>+</button>
                                            </div>
                                        </td>
                                        <td>
                                            {(order?.price * order?.amount).toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faTrash} className={cx("icon-trash")} />
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
                            <span>200.000 đ</span>
                        </div>
                        <div className={cx("summary-item")}>
                            <span>Giảm giá:</span>
                            <span>0 đ</span>
                        </div>
                        <div className={cx("summary-item")}>
                            <span>Phí vận chuyển:</span>
                            <span>30.000 đ</span>
                        </div>
                        <div className={cx("summary-total")}>
                            <span>Tổng thanh toán:</span>
                            <span>230.000 đ</span>
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
