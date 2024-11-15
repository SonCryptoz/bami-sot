import classNames from "classnames/bind";
import { Col, Row, Image } from "antd";

import styles from "./ProductDetailsComponent.module.scss";
import Button from "../Button";
import * as ProductService from "@/services/ProductService";
import { useQuery } from "@tanstack/react-query";

const cx = classNames.bind(styles);

function ProductDetailsComponent({ idProduct }) {
    const fetchAllDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        if (id) {
            const res = await ProductService.getDetailsProduct(id);
            return res.data;
        }
    };

    // Sử dụng useQuery để fetch dữ liệu sản phẩm
    const { data: productDetails } = useQuery({
        queryKey: ["product-details", idProduct],
        queryFn: fetchAllDetailsProduct,
        enabled: !!idProduct,
    });

    const quantityChange = () => {};

    return (
        <div>
            <Row>
                <Col span={12} style={{ display: "flex", flexDirection: "column" }}>
                    <Image
                        src={productDetails?.image}
                        alt="image product"
                        preview={false}
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "1px solid var(--section-color)",
                            borderRadius: "10px",
                        }}
                    />
                    <Row style={{ paddingTop: "10px", display: "flex", justifyContent: "space-around" }}>
                        <Col span={6} style={{ flexBasis: "unset" }}>
                            <Image
                                src={productDetails?.image}
                                alt="image product"
                                preview={false}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    border: "1px solid var(--section-color)",
                                    borderRadius: "10px",
                                }}
                            />
                        </Col>
                        <Col span={6} style={{ flexBasis: "unset" }}>
                            <Image
                                src={productDetails?.image}
                                alt="image product"
                                preview={false}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    border: "1px solid var(--section-color)",
                                    borderRadius: "10px",
                                }}
                            />
                        </Col>
                        <Col span={6} style={{ flexBasis: "unset" }}>
                            <Image
                                src={productDetails?.image}
                                alt="image product"
                                preview={false}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    border: "1px solid var(--section-color)",
                                    borderRadius: "10px",
                                }}
                            />
                        </Col>
                        <Col span={6} style={{ flexBasis: "unset" }}>
                            <Image
                                src={productDetails?.image}
                                alt="image product"
                                preview={false}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    border: "1px solid var(--section-color)",
                                    borderRadius: "10px",
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <div className={cx("product")}>
                        <h1 className={cx("title")}>{productDetails?.name}</h1>
                        <div className={cx("price-describe")}>
                            <div className={cx("price")}>
                                <span>{productDetails?.price.toLocaleString("vi-VN")} ₫</span>
                            </div>
                            <div className={cx("describe")}>
                                <span>Mô tả ngắn</span>
                                <div>
                                    <em>(Đang cập nhật)</em>
                                </div>
                            </div>
                        </div>
                        <div className={cx("quantity")}>
                            <label>SỐ LƯỢNG:</label>
                            <div className={cx("control-quantity")}>
                                <button className={cx("button-control")}>-</button>
                                <input
                                    type="number"
                                    min={1}
                                    max={10}
                                    onChange={quantityChange}
                                    defaultValue={1}
                                    className={cx("input-control")}
                                />
                                <button className={cx("button-control")}>+</button>
                            </div>
                        </div>
                        <div className={cx("buy-action")}>
                            <Button primary className={cx("button-buy")}>
                                Mua hàng
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <div className={cx("product-description")}>
                <div className={cx("description")}>
                    <span>Mô tả sản phẩm</span>
                </div>
                <div className={cx("content")}>
                    <div className={cx("text-img")}>
                        <p>
                            <img className={cx("image")} src={productDetails?.image} alt="product-details" />
                        </p>
                        <p>{productDetails.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsComponent;
