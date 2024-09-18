import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./AccountMenu.module.scss";

const cx = classNames.bind(styles);

function AccountItem({ data, onClick = () => {} }) {
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

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default AccountItem;
