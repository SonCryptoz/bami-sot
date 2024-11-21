import classNames from "classnames/bind";
import { Link, useParams } from "react-router-dom";

import * as ProductService from "@/services/ProductService";
import Header from "@/layouts/components/Header";
import styles from "@/layouts/DefaultLayout/DefaultLayout.module.scss";
import styles2 from "./ProductDetails.module.scss";
import ProductDetailsComponent from "@/components/ProductDetailsComponent";
import Footer from "@/layouts/components/Footer";
import BreadCrumb from "@/components/BreadCrumb";
import { useQuery } from "@tanstack/react-query";

const cx = classNames.bind(styles);
const cy = classNames.bind(styles2);

function ProductDetails() {
    const { id } = useParams();

    const fetchAllDetailsProduct = async (context) => {
        const _id = context?.queryKey && context?.queryKey[1];
        if (_id) {
            const res = await ProductService.getDetailsProduct(_id);
            return res?.data;
        }
    };

    // Sử dụng useQuery để fetch dữ liệu sản phẩm
    const { data: productDetails } = useQuery({
        queryKey: ["product-details", id],
        queryFn: fetchAllDetailsProduct,
        enabled: !!id,
    });

    return (
        <div className={cx("wrapper")}>
            <Header />
            <BreadCrumb title={productDetails?.name} />
            <div className={cy("product-details")}>
                <div className={cy("breadcrumb")}>
                    <Link to="/">
                        <span>Trang chủ </span>
                    </Link>
                    / Chi tiết sản phẩm
                </div>
                <ProductDetailsComponent idProduct={id} />
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetails;
