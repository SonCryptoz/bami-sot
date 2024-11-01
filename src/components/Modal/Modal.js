import React from "react";
import classNames from "classnames/bind";

import styles from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Modal({ title, isOpen, onClose, onOk, children }) {
    if (!isOpen) return null; // Nếu modal đóng, không hiển thị gì cả

    return (
        <div className={cx("overlay")}>
            <div className={cx("modal")}>
                <div className={cx("modal-header")}>
                    <h2 className={cx("modal-title")}>{title}</h2>
                    <button className={cx("close-button")} onClick={onClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className={cx("modal-body")}>{children}</div>
                <div className={cx("modal-footer")}>
                    <button className={cx("btn")} onClick={onClose}>
                        Hủy
                    </button>
                    {/* <button className={cx("btn", "primary-btn")} onClick={onOk}>
                        OK
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default Modal;
