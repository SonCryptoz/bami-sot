import classNames from "classnames/bind";
import { Pagination } from "antd";
// import { useQuery } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { useDebounceHook } from "@/hooks/useDebounceHook";

import styles from "./TypeProduct.module.scss";
import CardItem from "@/components/Card/Card";
import Button from "@/components/Button";
import * as ProductService from "@/services/ProductService";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

function TypeProduct() {
    const location = useLocation();

    // Lấy pathname từ URL
    const { pathname } = location;

    // Bỏ phần '/san_pham/' khỏi pathname
    const rawType = pathname.replace("/san_pham/", "");

    // Giải mã ký tự đặc biệt
    const decodedType = decodeURIComponent(rawType);

    const [products, setProducts] = useState([]);

    const fetchAllProductsType = async (type, limitPage) => {
        const res = await ProductService.getProductsType(type, limitPage);
        console.log(res);
        if (res?.status === "success") {
            setProducts(res?.data);
        } else {
        }
    };

    useEffect(() => {
        if (decodedType) {
            fetchAllProductsType(decodedType, 10);
        }
    }, [decodedType]);

    const onChange = () => {};

    return (
        <div className={cx("body")}>
            <div className={cx("wrapper")}>
                {products?.map((product) => (
                    <CardItem key={product._id} product={product} id={product._id} />
                ))}
            </div>
            <div className={cx("button")}>
                <Button
                    primary
                    className={cx("more-button")}
                    // onClick={() => setLimitPage((prev) => prev + 3)}
                    disabled={products?.total === products?.data?.length || products?.totalPages === 1}
                >
                    Xem thêm
                </Button>
            </div>
            <div className={cx("pagination")}>
                <Pagination defaultCurrent={1} total={products?.total || 0} onChange={onChange} />
            </div>
        </div>
    );
}

export default TypeProduct;
