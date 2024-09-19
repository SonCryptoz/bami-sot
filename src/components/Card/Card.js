import classNames from "classnames/bind";

import styles from "./Card.module.scss";

const cx = classNames.bind(styles);

function CardItem() {
    return (
        <div className={cx("item")}>
            <div
                className={cx("image")}
                style={{
                    backgroundImage: `url("https://bizweb.dktcdn.net/thumb/large/100/053/643/products/112.jpg?v=1454040113190")`,
                }}
            ></div>
            <div className={cx("product-info")}>
                <h3 className={cx("name")}>Pizza</h3>
                <div className={cx("price")}>
                    <span className={cx("current-price")}>200.000 ₫</span>
                    <span className={cx("old-price")}>223.000 ₫</span>
                </div>
            </div>
        </div>
    );
}

export default CardItem;
