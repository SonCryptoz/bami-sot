import classNames from "classnames/bind";

import styles from "./AdminUser.module.scss";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../DataTable";

const cx = classNames.bind(styles);

function AdminUser() {
    return (
        <div className={cx("wrapper")}>
            <div>
                <h2>Quản lý tài khoản người dùng</h2>
            </div>
            <div className={cx("btn-wrapper")}>
                <Button primary className={cx("btn-add")}>
                    <FontAwesomeIcon icon={faAdd} style={{ fontSize: "40px" }} />
                </Button>
            </div>
            <div className={cx("table-data")}>
                <DataTable />
            </div>
        </div>
    );
}

export default AdminUser;
