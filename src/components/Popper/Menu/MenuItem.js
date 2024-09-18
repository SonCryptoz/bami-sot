import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

function MenuItem({ data, onClick = () => {} }) {
    return (
        <Link
            className={cx("menu-item", {
                separate: data.separate,
            })}
            to={data.to}
            onClick={onClick}
        >
            {data.title}
        </Link>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
