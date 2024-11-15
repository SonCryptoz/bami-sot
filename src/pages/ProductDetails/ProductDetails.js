import classNames from "classnames/bind";
import { Link, useParams } from "react-router-dom";

import Header from "@/layouts/components/Header";
import styles from "@/layouts/DefaultLayout/DefaultLayout.module.scss";
import styles2 from "./ProductDetails.module.scss";
import ProductDetailsComponent from "@/components/ProductDetailsComponent";
import Footer from "@/layouts/components/Footer";
import BreadCrumb from "@/components/BreadCrumb";

const cx = classNames.bind(styles);
const cy = classNames.bind(styles2);

function ProductDetails() {
    const { id } = useParams();

    return (
        <div className={cx("wrapper")}>
            <Header />
            <BreadCrumb title="Pizza nhân bò phô mai" />
            <div className={cy("product-details")}>
                <div className={cy("breadcrumb")}>
                    <Link to="/">
                        <span>Trang chủ</span>
                    </Link>
                    <span> / Chi tiết sản phẩm</span>
                </div>
                <ProductDetailsComponent idProduct={id} />
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetails;
