import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import styles from "./HeaderItem.module.scss";

const cx = classNames.bind(styles);

function HeaderItem({ title, to, icon = null, end = false }) {
    return (
        <NavLink
            to={to}
            end={end} // Sử dụng thuộc tính 'end' để chỉ kích hoạt khi đường dẫn khớp chính xác
            className={(nav) => cx("title", { active: nav.isActive })}
        >
            {title}
            <span className={cx("icon")}>{icon}</span>
        </NavLink>
    );
}

HeaderItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node,
    end: PropTypes.bool,
};

export default HeaderItem;
