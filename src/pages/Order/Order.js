import classNames from "classnames/bind";

import Header from "@/layouts/components/Header";
import Footer from "@/layouts/components/Footer";
import styles from "./Order.module.scss";

const cx = classNames.bind(styles);

function Order() {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <h1 className={cx("order-title")}>Thanh toán đơn hàng</h1>
            </div>
            <Footer />
        </div>
    );
}

export default Order;
