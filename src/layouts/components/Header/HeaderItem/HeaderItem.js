import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import styles from "./HeaderItem.module.scss";

const cx = classNames.bind(styles);

function HeaderItem({ title, to }) {
    return (
        <NavLink to={to} className={(nav) => cx("title", { active: nav.isActive })}>
            {title}
        </NavLink>
    );
}

HeaderItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default HeaderItem;
