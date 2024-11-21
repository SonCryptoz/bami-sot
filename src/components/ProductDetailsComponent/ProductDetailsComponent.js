import classNames from "classnames/bind";
import { Col, Row, Image } from "antd";

import styles from "./ProductDetailsComponent.module.scss";
import Button from "../Button";
import * as ProductService from "@/services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addOrderProduct } from "@/redux/slices/orderSlice";

const cx = classNames.bind(styles);

function ProductDetailsComponent({ idProduct }) {
    const user = useSelector((state) => state.user);
    const { pathname } = useLocation();

    const [numProduct, setNumProduct] = useState(1);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const fetchAllDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        if (id) {
            const res = await ProductService.getDetailsProduct(id);
            return res?.data;
        }
    };

    // Sử dụng useQuery để fetch dữ liệu sản phẩm
    const { data: productDetails } = useQuery({
        queryKey: ["product-details", idProduct],
        queryFn: fetchAllDetailsProduct,
        enabled: !!idProduct,
    });

    const quantityChange = (event) => {
        let value = Number.parseInt(event.target.value);
        if (!value || value < 1) {
            value = 1;
        } else if (value > 100) {
            value = 100;
        }
        setNumProduct(value);
    };

    const handleChange = (type) => {
        if (type === "increase" && numProduct < 100) {
            setNumProduct(numProduct + 1);
        } else if (type === "decrease" && numProduct > 1) {
            setNumProduct(numProduct - 1);
        }
    };

    const addToCart = () => {
        if (!user?.id) {
            navigate("/login", { state: pathname });
        } else {
            dispatch(
                addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails._id,
                    },
                }),
            );
        }
    };

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
                                <button className={cx("button-control")} onClick={() => handleChange("decrease")}>
                                    -
                                </button>
                                <input
                                    type="number"
                                    min={1}
                                    max={100}
                                    onChange={quantityChange}
                                    value={numProduct}
                                    className={cx("input-control")}
                                />
                                <button className={cx("button-control")} onClick={() => handleChange("increase")}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className={cx("buy-action")}>
                            <Button primary className={cx("button-buy")} onClick={addToCart}>
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
                        <p>{productDetails?.description}</p>
                        <p>
                            <img className={cx("image")} src={productDetails?.image} alt="product-details" />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsComponent;
