import classNames from "classnames/bind";
import PropTypes from "prop-types";

import Header from "@/layouts/components/Header";
import styles from "./DefaultLayout.module.scss";
import Sidebar from "@/layouts/components/Sidebar";
import Slider from "@/components/Slider";
import Footer from "../components/Footer";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <Slider />
            <div className={cx("container")}>
                <Sidebar title="DANH MỤC SẢN PHẨM" />
                <div className={cx("content")}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
