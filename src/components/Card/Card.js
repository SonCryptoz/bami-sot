import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./Card.module.scss";

const cx = classNames.bind(styles);

function CardItem({ product }) {
    return (
        <div className={cx("item")}>
            <div
                className={cx("image")}
                style={{
                    backgroundImage: `url("https://bizweb.dktcdn.net/thumb/large/100/053/643/products/112.jpg?v=1454040113190")`,
                }}
            ></div>
            <div className={cx("product-info")}>
                <h3 className={cx("name")}>{product.name}</h3>
                <div className={cx("price")}>
                    <span className={cx("current-price")}>{product.price.toLocaleString("vi-VN")} ₫</span>
                    <span className={cx("old-price")}>{product.discount || 0} ₫</span>
                </div>
            </div>
        </div>
    );
}

CardItem.propTypes = {
    product: PropTypes.object.isRequired,
};

export default CardItem;
