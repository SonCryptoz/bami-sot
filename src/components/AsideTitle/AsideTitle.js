import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./AsideTitle.module.scss";

const cx = classNames.bind(styles);

function AsideTitle({ children }) {
    return (
        <div className={cx("title")}>
            <span>{children}</span>
        </div>
    );
}

AsideTitle.propTypes = {
    children: PropTypes.string.isRequired,
};

export default AsideTitle;
