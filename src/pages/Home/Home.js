import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import CardItem from "@/components/Card/Card";
import Button from "@/components/Button";
import { Pagination } from "antd";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "@/services/ProductService";
import Loading from "@/components/Loading";

const cx = classNames.bind(styles);

function Home() {
    const fetchAllProducts = async () => {
        const res = await ProductService.getAllProducts();
        return res;
    };

    // Sử dụng useQuery để fetch dữ liệu sản phẩm
    const { isPending, data: products } = useQuery({
        queryKey: ["products"],
        queryFn: fetchAllProducts,
    });

    const onChange = () => {};

    return (
        <div className={cx("body")}>
            <div className={cx("wrapper")}>
                {products?.data?.map((product) => (
                    <CardItem key={product._id} product={product} />
                ))}
            </div>
            <div className={cx("button")}>
                <Loading isPending={isPending}>
                    <Button primary className={cx("more-button")}>
                        Xem thêm
                    </Button>
                </Loading>
            </div>
            <div className={cx("pagination")}>
                <Pagination defaultCurrent={1} total={products?.total || 0} onChange={onChange} />
            </div>
        </div>
    );
}

export default Home;
