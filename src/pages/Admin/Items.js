import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const items = [
    {
        key: "1",
        icon: <FontAwesomeIcon icon={faUser} />,
        label: "Tài khoản người dùng",
    },
    {
        key: "2",
        icon: <FontAwesomeIcon icon={faProductHunt} />,
        label: "Sản phẩm",
    },
    {
        key: "3",
        icon: <FontAwesomeIcon icon={faGear} />,
        label: "Cài đặt",
    },
];
