import classNames from "classnames/bind";
import { Form, Upload } from "antd";

import styles from "./AdminProduct.module.scss";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../DataTable";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import InputForm from "../InputForm";
import { getBase64 } from "@/utils";
import * as ProductService from "@/services/ProductService";
import { useMutationHook } from "@/hooks/useMutationHook";
import Loading from "../Loading";
import * as message from "@/components/Message/message";

const cx = classNames.bind(styles);

function AdminProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateProduct, setStateProduct] = useState({
        name: "",
        image: "",
        type: "",
        quantity: 0,
        price: 0,
        discount: 0,
        description: "",
    });

    const mutation = useMutationHook((data) => {
        const res = ProductService.createProduct(data);
        return res;
    });
    const { data, isPending, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess && data?.status === "success") {
            handleClose();
            message.success("Tạo sản phẩm thành công");
        } else if (isError) {
            message.error("Tạo sản phẩm thất bại");
        }
    }, [data, isSuccess, isError]);

    const openModal = () => setIsModalOpen(true);
    const handleClose = () => {
        setIsModalOpen(false);
        setStateProduct({ name: "", image: "", type: "", quantity: 0, price: 0, discount: 0, description: "" });
    };

    const onFinish = () => {
        mutation.mutate(stateProduct);
    };

    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleImage = async (info) => {
        const { fileList } = info;

        if (fileList.length > 0) {
            const file = fileList[0];

            // Kiểm tra trạng thái upload là 'done'
            if (file.status === "done") {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                setStateProduct({
                    ...stateProduct,
                    image: file.preview,
                });
            }
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div>
                <h2>Quản lý sản phẩm</h2>
            </div>
            <div className={cx("btn-wrapper")}>
                <Button primary className={cx("btn-add")} onClick={openModal}>
                    <FontAwesomeIcon icon={faAdd} style={{ fontSize: "40px" }} />
                </Button>
            </div>
            <div className={cx("table-data")}>
                <DataTable />
            </div>
            <Modal title="Tạo sản phẩm" isOpen={isModalOpen} onClose={handleClose}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                        fontFamily: "var(--font-family)",
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="product-name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên sản phẩm!",
                            },
                        ]}
                        className={cx("custom-form-item")}
                    >
                        <InputForm
                            placeholder="Tên sản phẩm"
                            className={cx("input", "spacing")}
                            value={stateProduct.name}
                            onChange={handleOnChange}
                            name="name"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Loại sản phẩm"
                        name="product-type"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập loại sản phẩm!",
                            },
                        ]}
                        className={cx("custom-form-item")}
                    >
                        <InputForm
                            placeholder="Loại sản phẩm"
                            className={cx("input", "spacing")}
                            value={stateProduct.type}
                            onChange={handleOnChange}
                            name="type"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="product-quantity"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số lượng sản phẩm!",
                            },
                        ]}
                        className={cx("custom-form-item")}
                    >
                        <InputForm
                            placeholder="Số lượng sản phẩm"
                            type="number"
                            className={cx("input", "spacing")}
                            value={stateProduct.quantity}
                            onChange={handleOnChange}
                            name="quantity"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Giá sản phẩm"
                        name="product-price"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập giá sản phẩm!",
                            },
                        ]}
                        className={cx("custom-form-item")}
                    >
                        <InputForm
                            placeholder="Giá sản phẩm"
                            type="number"
                            className={cx("input", "spacing")}
                            value={stateProduct.price}
                            onChange={handleOnChange}
                            name="price"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Giảm giá"
                        name="product-discount"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                        className={cx("custom-form-item")}
                    >
                        <InputForm
                            placeholder="Giảm giá"
                            type="number"
                            className={cx("input", "spacing")}
                            value={stateProduct.discount}
                            onChange={handleOnChange}
                            name="discount"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả sản phẩm"
                        name="product-description"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                        className={cx("custom-form-item")}
                    >
                        <InputForm
                            placeholder="Mô tả sản phẩm"
                            className={cx("input", "spacing")}
                            value={stateProduct.description}
                            onChange={handleOnChange}
                            name="description"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ảnh sản phẩm"
                        name="product-image"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn ảnh sản phẩm!",
                            },
                        ]}
                        className={cx("custom-form-item")}
                    >
                        <div className={cx("custom-product-field")}>
                            <Upload onChange={handleImage} maxCount={1}>
                                <Button primary>Tải ảnh lên</Button>
                            </Upload>
                            {stateProduct.image && (
                                <img
                                    src={
                                        stateProduct.image ||
                                        "http://localhost:3000/static/media/bami-sot.9fdfa0bd114f70652ee6.png"
                                    }
                                    alt="Product-Image"
                                    className={cx("image")}
                                />
                            )}
                        </div>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button primary className={cx("upload-btn")}>
                            <Loading isPending={isPending}>Tạo sản phẩm</Loading>
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AdminProduct;
