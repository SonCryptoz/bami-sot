import classNames from "classnames/bind";
import PropTypes from "prop-types";

import routes from "@/config/routes";
import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function CardItem({ product, id }) {
    const navigate = useNavigate();
    const handleDetailsProduct = (id) => {
        navigate(routes.productDetails.replace(":id", id));
    };

    return (
        <div className={cx("item")} onClick={() => handleDetailsProduct(id)}>
            <img
                src={product.image || "http://localhost:3000/static/media/bami-sot.9fdfa0bd114f70652ee6.png"}
                alt="avatar"
                className={cx("image")}
            />
            <div className={cx("product-info")}>
                <h3 className={cx("name")}>{product.name}</h3>
                <div className={cx("price")}>
                    <span className={cx("current-price")}>
                        {product.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </span>
                    <span className={cx("old-price")}>{product.discount || 0} %</span>
                </div>
            </div>
        </div>
    );
}

CardItem.propTypes = {
    product: PropTypes.object.isRequired,
    id: PropTypes.string,
};

export default CardItem;
