import classNames from "classnames/bind";

import styles from "./Home.module.scss";
import CardItem from "@/components/Card/Card";
import Button from "@/components/Button";

const cx = classNames.bind(styles);

function Home() {
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
        </div>
    );
}

export default Home;
