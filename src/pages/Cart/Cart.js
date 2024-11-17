import classNames from "classnames/bind";

import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import styles from "./Cart.module.scss";
const cx = classNames.bind(styles);

function Cart() {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("cart")}>
                <h1>Cart Page</h1>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;
