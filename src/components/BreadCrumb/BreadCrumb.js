import classNames from "classnames/bind";

import styles from "./BreadCrumb.module.scss";
import img from "@/assets/images/slider-1.png";

const cx = classNames.bind(styles);

function BreadCrumb({ title }) {
    return (
        <div className={cx("container")}>
            <div className={cx("image-container")}>
                <img
                    src="https://bizweb.dktcdn.net/100/053/643/themes/877493/assets/sub-banner-top.jpg?1662429924636"
                    alt={title}
                />
                <h2 className={cx("text")}>{title}</h2>
            </div>
        </div>
    );
}

export default BreadCrumb;
