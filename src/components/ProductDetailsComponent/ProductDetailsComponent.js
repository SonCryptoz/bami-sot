import classNames from "classnames/bind";
import { Col, Row, Image } from "antd";

import styles from "./ProductDetailsComponent.module.scss";
import imgProduct_l from "@/assets/images/l-image.png";
import imgProduct_s from "@/assets/images/s-image.png";
import Button from "../Button";

const cx = classNames.bind(styles);

function ProductDetailsComponent() {
    const quantityChange = () => {};

    return (
        <div>
            <Row>
                <Col span={12} style={{ display: "flex", flexDirection: "column" }}>
                    <Image
                        src={imgProduct_l}
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
                                src={imgProduct_s}
                                alt="image product"
                                preview={false}
                                style={{ border: "1px solid var(--section-color)", borderRadius: "10px" }}
                            />
                        </Col>
                        <Col span={6} style={{ flexBasis: "unset" }}>
                            <Image
                                src={imgProduct_s}
                                alt="image product"
                                preview={false}
                                style={{ border: "1px solid var(--section-color)", borderRadius: "10px" }}
                            />
                        </Col>
                        <Col span={6} style={{ flexBasis: "unset" }}>
                            <Image
                                src={imgProduct_s}
                                alt="image product"
                                preview={false}
                                style={{ border: "1px solid var(--section-color)", borderRadius: "10px" }}
                            />
                        </Col>
                        <Col span={6} style={{ flexBasis: "unset" }}>
                            <Image
                                src={imgProduct_s}
                                alt="image product"
                                preview={false}
                                style={{ border: "1px solid var(--section-color)", borderRadius: "10px" }}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <div className={cx("product")}>
                        <h1 className={cx("title")}>Pizza nhân bò phô mai</h1>
                        <div className={cx("price-describe")}>
                            <div className={cx("price")}>
                                <span>340.000₫</span>
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
                            Nguồn nguyên liệu tươi ngon được nhập chính ngạch hằng ngày đã qua kiểm định an toàn thực
                            phẩm nên khách hàng có thể hoàn toàn yên tâm về độ tươi ngon của những chiếc bánh nơi đây.
                        </p>
                        <p>
                            Bột mỳ trắng mịn cùng với phương pháp nhào bột thủ công để làm nên những chiếc đế bánh khi
                            nướng thì nở xốp và giòn mà không hề chai cứng. Một sự kết hợp hoàn hảo giữa đế bánh và nhân
                            bánh, Chiếc bánh bạn nhận được sẽ vẫn còn nóng hổi, viền bánh hơi cháy cạnh rất thơm và giòn
                            tan khi đưa vào miệng. Nhân bánh đặc sánh phô mai với sốt cà chua đỏ tươi và nhiều bột xen
                            lẫn các lát thịt, hải sản tươi thơm ngon làm nên chiếc pizza hoàn hảo và đúng phong vị nhất.
                        </p>
                        <p>
                            <img src={imgProduct_l} alt="product-details" />
                        </p>
                        <p>
                            Thời gian nướng và nhiệt độ nướng bánh: Thời gian nướng rất quan trọng. Chiếc pizza mang tới
                            tận nhà cho khách cũng rất nóng hổi chứ không hề nguội. Nếu pizza để nguội thì vị thực sự
                            của nó sẽ biến mất. Thời gian để nướng chiếc pizza rất quan trọng. Nếu không căn được thời
                            gian nướng thì chiếc bánh có thể bị cháy, hoặc có thể đế bánh không thể giòn và cũng có thể
                            là đế bánh chín không đều. Vậy nên nền nhiệt và thời gian rất quan trọng để quyết định cho
                            ra một chiếc pizza đế bánh giòn rụm khi đưa vào miệng và phần nhân bánh vẫn không bị cháy.
                            Nhiệt độ nướng tại cửa hàng pizza luôn đạt tại 250-350 độ C với thời gian 1-2 phút. Nếu tự
                            làm ở nhà thì nướng mất khoảng 7-8 phút trong nền nhiệt 250 độ C.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsComponent;
