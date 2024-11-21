import classNames from "classnames/bind";
import { Pagination } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useDebounceHook } from "@/hooks/useDebounceHook";

import styles from "./Home.module.scss";
import CardItem from "@/components/Card/Card";
import Button from "@/components/Button";
import * as ProductService from "@/services/ProductService";

const cx = classNames.bind(styles);

function Home() {
    const searchProductValue = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounceHook(searchProductValue, 500);
    const refSearch = useRef(true);

    const [limitPage, setLimitPage] = useState(6);
    // const [paginate, setPaginate] = useState({
    //     page: 1,
    //     limitPage: 6,
    //     total: 1,
    // });

    // Sử dụng useQuery để fetch dữ liệu sản phẩm
    const { data: products } = useQuery({
        queryKey: ["products", searchDebounce, limitPage],
        queryFn: () => ProductService.getAllProducts(searchDebounce, limitPage),
        enabled: !!searchDebounce || refSearch.current,
        keepPreviousData: true,
        onSuccess: (data) => {
            refSearch.current = true;
        },
    });
    const onChange = () => {};

    return (
        <div className={cx("body")}>
            <div className={cx("wrapper")}>
                {products?.data?.map((product) => (
                    <CardItem key={product._id} product={product} id={product._id} />
                ))}
            </div>
            <div className={cx("button")}>
                <Button
                    primary
                    className={cx("more-button")}
                    onClick={() => setLimitPage((prev) => prev + 6)}
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

export default Home;
