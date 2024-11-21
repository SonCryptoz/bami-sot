import classNames from "classnames/bind";
import { Pagination } from "antd";
// import { useQuery } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDebounceHook } from "@/hooks/useDebounceHook";

import styles from "./TypeProduct.module.scss";
import CardItem from "@/components/Card/Card";
import Button from "@/components/Button";
import * as ProductService from "@/services/ProductService";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function TypeProduct() {
    const searchProductValue = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounceHook(searchProductValue, 500);
    const location = useLocation();

    // Lấy pathname từ URL
    const { pathname } = location;

    // Bỏ phần '/san_pham/' khỏi pathname
    const rawType = pathname.replace("/san_pham/", "");

    // Giải mã ký tự đặc biệt
    const decodedType = decodeURIComponent(rawType);

    const [products, setProducts] = useState([]);
    const [paginate, setPaginate] = useState({
        page: 1,
        limitPage: 6,
        total: 1,
    });

    const fetchAllProductsType = async (type, page, limitPage) => {
        const res = await ProductService.getProductsType(type, page, limitPage);
        if (res?.status === "success") {
            setProducts(res?.data);
            setPaginate((prev) => ({
                ...prev,
                total: res?.total,
            }));
        }
    };

    useEffect(() => {
        if (decodedType) {
            fetchAllProductsType(decodedType, paginate.page, paginate.limitPage);
        }
    }, [decodedType, paginate.page, paginate.limitPage]);

    const onChange = (current, pageSize) => {
        setPaginate((prev) => ({
            ...prev,
            page: current,
            limitPage: pageSize,
        }));
    };

    const filteredProducts = products?.filter(
        (product) => searchDebounce === "" || product?.name?.toLowerCase()?.includes(searchDebounce.toLowerCase()),
    );

    return (
        <div className={cx("body")}>
            <div className={cx("wrapper")}>
                {filteredProducts?.map((product) => (
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
                <Pagination defaultCurrent={paginate.page} total={paginate?.total} onChange={onChange} />
            </div>
        </div>
    );
}

export default TypeProduct;
