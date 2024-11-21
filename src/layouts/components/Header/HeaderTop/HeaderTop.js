import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import config from "@/config";
import images from "@/assets/images";
import styles from "./HeaderTop.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function HeaderTop() {
    return (
        <header className={cx("inner")}>
            <div className={cx("container")}>
                <div className={cx("logo")}>
                    <Link to={config.routes.home}>
                        <img src={images.logo} className={cx("logo-link")} alt="Bami-Sot" />
                    </Link>
                </div>
                <div className={cx("time-contact")}>
                    <div className={cx("item")}>
                        <div className={cx("icon")}>
                            <FontAwesomeIcon icon={faClock} style={{ width: "20px", height: "20px" }} />
                        </div>
                        <div className={cx("content")}>
                            <span className={cx("title")}>Open</span>
                            <div className={cx("info")}>
                                <span>6AM - 10PM</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx("item")}>
                        <div className={cx("icon")}>
                            <FontAwesomeIcon icon={faEnvelope} style={{ width: "20px", height: "20px" }} />
                        </div>
                        <div className={cx("content")}>
                            <span className={cx("title")}>Email</span>
                            <div className={cx("info")}>
                                <a href="mailto:suka123@gmail.com">suka123@gmail.com</a>
                            </div>
                        </div>
                    </div>
                    <div className={cx("item")}>
                        <div className={cx("icon")}>
                            <FontAwesomeIcon icon={faPhone} style={{ width: "20px", height: "20px" }} />
                        </div>
                        <div className={cx("content")}>
                            <span className={cx("title")}>Contact</span>
                            <div className={cx("info")}>
                                <a href="tel:0987654321">0987654321</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderTop;
