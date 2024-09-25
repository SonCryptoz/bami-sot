import classNames from "classnames/bind";
import PropTypes from "prop-types";

import Header from "@/layouts/components/Header";
import styles from "@/layouts/DefaultLayout/DefaultLayout.module.scss";
import styles2 from "./ProductDetails.module.scss";
import ProductDetailsComponent from "@/components/ProductDetailsComponent";
import { Link } from "react-router-dom";
import Footer from "@/layouts/components/Footer";

const cx = classNames.bind(styles);
const cy = classNames.bind(styles2);

function ProductDetails() {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cy("product-details")}>
                <div className={cy("breadcrumb")}>
                    <Link to="/">
                        <span>Trang chủ</span>
                    </Link>
                </div>
                <ProductDetailsComponent />
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetails;
