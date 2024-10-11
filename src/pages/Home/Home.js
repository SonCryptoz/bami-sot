import classNames from "classnames/bind";

import styles from "./Home.module.scss";
import CardItem from "@/components/Card/Card";
import Button from "@/components/Button";
import { Pagination } from "antd";

const cx = classNames.bind(styles);

function Home() {
    const onChange = () => {};

    return (
        <div className={cx("body")}>
            <div className={cx("wrapper")}>
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
            </div>
            <div className={cx("button")}>
                <Button primary className={cx("more-button")}>
                    Xem thêm
                </Button>
            </div>
            <div className={cx("pagination")}>
                <Pagination defaultCurrent={2} total={50} onChange={onChange} />
            </div>
        </div>
    );
}

export default Home;
