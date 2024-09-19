import classNames from "classnames/bind";

import styles from "./Home.module.scss";
import CardItem from "@/components/Card/Card";

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx("body")}>
            <CardItem />
        </div>
    );
}

export default Home;
