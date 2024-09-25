import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

import styles from "./Footer.module.scss";
import routes from "@/config/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("top-footer")}>
                    <div className={cx("left")}>
                        <Row>
                            <Col span={6} style={{ fontFamily: "var(--font-family)" }}>
                                <h3 className="footer__heading">VỀ CHÚNG TÔI</h3>
                                <ul className={cx("footer-list")}>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.home} className={cx("footer-item_link")}>
                                            Trang chủ
                                        </Link>
                                    </li>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.product.product} className={cx("footer-item_link")}>
                                            Sản phẩm
                                        </Link>
                                    </li>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.product.promotionProduct} className={cx("footer-item_link")}>
                                            Khuyến mãi
                                        </Link>
                                    </li>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.introduction} className={cx("footer-item_link")}>
                                            Giới thiệu
                                        </Link>
                                    </li>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.contact} className={cx("footer-item_link")}>
                                            Liên hệ
                                        </Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col span={6} style={{ fontFamily: "var(--font-family)" }}>
                                <h3 className="footer__heading">ĐIỀU KHOẢN</h3>
                                <ul className={cx("footer-list")}>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.home} className={cx("footer-item_link")}>
                                            Trang chủ
                                        </Link>
                                    </li>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.product.product} className={cx("footer-item_link")}>
                                            Sản phẩm
                                        </Link>
                                    </li>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.product.promotionProduct} className={cx("footer-item_link")}>
                                            Khuyến mãi
                                        </Link>
                                    </li>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.introduction} className={cx("footer-item_link")}>
                                            Giới thiệu
                                        </Link>
                                    </li>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.contact} className={cx("footer-item_link")}>
                                            Liên hệ
                                        </Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col span={6} style={{ fontFamily: "var(--font-family)" }}>
                                <h3 className="footer__heading">HƯỚNG DẪN</h3>
                                <ul className={cx("footer-list")}>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.home} className={cx("footer-item_link")}>
                                            Trang chủ
                                        </Link>
                                    </li>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.product.product} className={cx("footer-item_link")}>
                                            Sản phẩm
                                        </Link>
                                    </li>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.product.promotionProduct} className={cx("footer-item_link")}>
                                            Khuyến mãi
                                        </Link>
                                    </li>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.introduction} className={cx("footer-item_link")}>
                                            Giới thiệu
                                        </Link>
                                    </li>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.contact} className={cx("footer-item_link")}>
                                            Liên hệ
                                        </Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col span={6} style={{ fontFamily: "var(--font-family)" }}>
                                <h3 className="footer__heading">CHÍNH SÁCH</h3>
                                <ul className={cx("footer-list")}>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.home} className={cx("footer-item_link")}>
                                            Trang chủ
                                        </Link>
                                    </li>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.product.product} className={cx("footer-item_link")}>
                                            Sản phẩm
                                        </Link>
                                    </li>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.product.promotionProduct} className={cx("footer-item_link")}>
                                            Khuyến mãi
                                        </Link>
                                    </li>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.introduction} className={cx("footer-item_link")}>
                                            Giới thiệu
                                        </Link>
                                    </li>
                                    <li className={cx("footer-item")}>
                                        <Link to={routes.contact} className={cx("footer-item_link")}>
                                            Liên hệ
                                        </Link>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </div>
                    <div className={cx("right")}>
                        <Row>
                            <Col span={24} style={{ fontFamily: "var(--font-family)" }}>
                                <h3 className="footer__heading">ĐĂNG KÝ NHẬN TIN</h3>
                                <div className={cx("content")}>
                                    <span>Đăng ký nhận thông tin ưu đãi cùng với khuyến mãi khủng từ Bami Sot</span>
                                </div>
                                <div>
                                    <ul className={cx("social")}>
                                        <li className={cx("footer-item")}>
                                            <a href="/" className={cx("footer-item_link")}>
                                                <FontAwesomeIcon icon={faFacebook} style={{ fontSize: "2rem" }} />
                                            </a>
                                        </li>
                                        <li className={cx("footer-item")}>
                                            <a href="/" className={cx("footer-item_link")}>
                                                <FontAwesomeIcon icon={faTiktok} style={{ fontSize: "2rem" }} />
                                            </a>
                                        </li>
                                        <li className={cx("footer-item")}>
                                            <a href="/" className={cx("footer-item_link")}>
                                                <FontAwesomeIcon icon={faGoogle} style={{ fontSize: "2rem" }} />
                                            </a>
                                        </li>
                                        <li className={cx("footer-item")}>
                                            <a href="/" className={cx("footer-item_link")}>
                                                <FontAwesomeIcon icon={faYoutube} style={{ fontSize: "2rem" }} />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className={cx("contact-footer")}>
                    <h2>CỬA HÀNG BÁNH MỲ BAMI SOT</h2>
                    <span className={cx("address")}>Bami Sot: 1 Quang Trung, Hải Dương</span>
                    <div className={cx("phone")}>
                        <span>Điện thoại: </span>
                        <a href="tel:0987654321">0987654321</a>
                    </div>
                    <div className={cx("email")}>
                        <span>Email: </span>
                        <a href="mailto:suka123@gmail.com">suka123@gmail.com</a>
                    </div>
                </div>
                <div className={cx("bottom-footer")}>
                    <div className={cx("copyright")}>
                        <span>© Bản quyền thuộc về SonDev | Cung cấp bởi Bami Corp</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
