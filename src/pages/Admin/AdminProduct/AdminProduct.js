import classNames from "classnames/bind";
import { Form, Upload } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./AdminProduct.module.scss";
import Button from "@/components/Button";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";
import { useEffect, useMemo, useState } from "react";
import InputForm from "@/components/InputForm";
import { getBase64 } from "@/utils";
import * as ProductService from "@/services/ProductService";
import { useMutationHook } from "@/hooks/useMutationHook";
import Loading from "@/components/Loading";
import * as message from "@/components/Message/message";
import Search from "@/components/Search";

const cx = classNames.bind(styles);

function AdminProduct() {
    const user = useSelector((state) => state?.user);
    const [form] = Form.useForm();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalDeleteManyOpen, setIsModalDeleteManyOpen] = useState(false);
    const [selectedRowsToDelete, setSelectedRowsToDelete] = useState([]);
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);
    const [stateProduct, setStateProduct] = useState({
        name: "",
        image: "",
        type: "",
        quantity: 0,
        price: 0,
        discount: 0,
        description: "",
        newType: "",
    });
    const [stateProductDetails, setStateProductDetails] = useState({
        name: "",
        image: "",
        type: "",
        quantity: 0,
        price: 0,
        discount: 0,
        description: "",
    });
    const [rowSelected, setRowSelected] = useState("");

    const mutation = useMutationHook((data) => {
        const res = ProductService.createProduct(data);
        return res;
    });
    const { data, isPending, isSuccess, isError } = mutation;

    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...res } = data;
        return ProductService.updateProduct(id, { ...res }, token);
    });
    const {
        data: dataUpdated,
        isPending: isPendingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = mutationUpdate;

    const mutationDelete = useMutationHook((data) => {
        const { id, token } = data;
        return ProductService.deleteProduct(id, token);
    });
    const {
        data: dataDeleted,
        isPending: isPendingDeleted,
        isSuccess: isSuccessDeleted,
        isError: isErrorDeleted,
    } = mutationDelete;

    const mutationDeleteMany = useMutationHook((data) => {
        const { token, ...ids } = data;
        return ProductService.deleteManyProduct(ids, token);
    });
    const {
        data: dataDeletedMany,
        isPending: isPendingDeletedMany,
        isSuccess: isSuccessDeletedMany,
        isError: isErrorDeletedMany,
    } = mutationDeleteMany;

    useEffect(() => {
        if (isSuccess && data?.status === "success") {
            message.success("Tạo sản phẩm thành công");
            handleCreateClose();
        } else if (isError) {
            message.error("Tạo sản phẩm thất bại");
        }
    }, [data, isSuccess, isError]);

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === "success") {
            message.success("Cập nhật sản phẩm thành công");
            handleUpdateClose();
        } else if (isErrorUpdated) {
            message.error("Cập nhật sản phẩm thất bại");
        }
    }, [dataUpdated, isSuccessUpdated, isErrorUpdated]);

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === "success") {
            message.success("Xóa sản phẩm thành công");
            handleDeleteClose();
        } else if (isErrorDeleted) {
            message.error("Xóa sản phẩm thất bại");
        }
    }, [dataDeleted, isSuccessDeleted, isErrorDeleted]);

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === "success") {
            message.success("Xóa sản phẩm thành công");
            setIsModalDeleteManyOpen(false);
        } else if (isErrorDeletedMany) {
            message.error("Xóa sản phẩm thất bại");
        }
    }, [dataDeletedMany, isSuccessDeletedMany, isErrorDeletedMany]);

    const fetchAllProducts = async () => {
        const res = await ProductService.getAllProducts();
        return res;
    };

    const fetchAllProductTypes = async () => {
        const res = await ProductService.getAllTypeProducts();
        return res;
    };

    // Sử dụng useQuery để fetch dữ liệu sản phẩm
    const queryProduct = useQuery({
        queryKey: ["products"],
        queryFn: fetchAllProducts,
    });
    const { data: products } = queryProduct;

    const queryProductTypes = useQuery({
        queryKey: ["type-product"],
        queryFn: fetchAllProductTypes,
    });
    const { data: productTypes } = queryProductTypes;

    const openModal = () => setIsModalCreateOpen(true);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleCreateClose = () => {
        setIsModalCreateOpen(false);
        setStateProduct({ name: "", image: "", type: "", quantity: 0, price: 0, discount: 0, description: "" });
    };

    const handleUpdateClose = () => {
        setIsModalUpdateOpen(false);
    };

    const handleDeleteClose = () => {
        setIsModalDeleteOpen(false);
    };

    const handleDeleteManyClose = () => {
        setIsModalDeleteManyOpen(false);
    };

    const onFinish = () => {
        const newType = stateProduct.type === "more" ? stateProduct.newType : stateProduct.type;
        const params = {
            name: stateProduct.name,
            image: stateProduct.image,
            type: newType,
            quantity: stateProduct.quantity,
            price: stateProduct.price,
            discount: stateProduct.discount,
            description: stateProduct.description,
        };
        mutation.mutate(params, {
            onSettled: () => {
                queryProduct.refetch();
                queryProductTypes.refetch();
            },
        });
    };

    const onFinishUpdate = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateProductDetails },
            {
                onSettled: () => {
                    queryProduct.refetch();
                    queryProductTypes.refetch();
                },
            },
        );
    };

    const handleDeleteProduct = () => {
        mutationDelete.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                    queryProductTypes.refetch();
                },
            },
        );
    };

    const handleDeleteManyProduct = () => {
        mutationDeleteMany.mutate(
            { ids: selectedRowsToDelete, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                    queryProductTypes.refetch();
                },
            },
        );
    };

    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnChangeSelect = (e) => {
        const value = e.target.value;
        setStateProduct({
            ...stateProduct,
            type: value,
        });
    };

    const handleOnChangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
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

    const handleImageDetails = async (info) => {
        const { fileList } = info;

        if (fileList.length > 0) {
            const file = fileList[0];

            // Kiểm tra trạng thái upload là 'done'
            if (file.status === "done") {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                setStateProductDetails({
                    ...stateProductDetails,
                    image: file.preview,
                });
            }
        }
    };

    const handleOnRow = (record, rowIndex) => {
        return {
            onClick: (e) => {
                setRowSelected(record._id);
            },
        };
    };

    const fetchAllDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected);
        if (res?.data) {
            setStateProductDetails({
                name: res.data.name,
                image: res.data.image,
                type: res.data.type,
                quantity: res.data.quantity,
                price: res.data.price,
                discount: res.data.discount,
                description: res.data.description,
            });
        }
        setIsPendingUpdate(false);
    };

    useEffect(() => {
        form.setFieldsValue(stateProductDetails);
    }, [form, stateProductDetails]);

    useEffect(() => {
        if (rowSelected) {
            setIsPendingUpdate(true);
            fetchAllDetailsProduct(rowSelected);
        }
    }, [rowSelected]);

    const productColumns = [
        { key: "name", title: "Tên sản phẩm", dataIndex: "name" },
        {
            key: "type",
            title: "Loại ",
            dataIndex: "type",
            filters:
                productTypes?.data?.map((option) => ({
                    text: option,
                    value: option,
                })) || [],
        },
        {
            key: "quantity",
            title: "Số lượng ",
            dataIndex: "quantity",
            filters: [
                { text: "Dưới 50", value: "under50" },
                { text: "Trên 50", value: "over50" },
            ],
        },
        { key: "price", title: "Giá bán", dataIndex: "price" },
    ];

    // Lọc dữ liệu sản phẩm dựa trên từ khóa tìm kiếm
    const filteredProducts = useMemo(() => {
        if (!products?.data) return []; // Trả về mảng rỗng nếu không có dữ liệu
        if (!searchTerm) return products.data.map((product) => ({ ...product, key: product._id }));

        return products.data
            .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((product) => ({ ...product, key: product._id }));
    }, [products, searchTerm]);

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("title")}>Quản lý sản phẩm</h1>
            <div className={cx("btn-wrapper")}>
                <Button primary className={cx("btn-add")} onClick={openModal}>
                    <FontAwesomeIcon icon={faAdd} style={{ fontSize: "40px" }} />
                </Button>
            </div>
            <div className={cx("search-wrapper")}>
                <Search onSearch={handleSearch} placeholder="Tìm kiếm bánh mỳ, đồ uống..." />
            </div>
            <div className={cx("table-data")}>
                <DataTable
                    data={filteredProducts}
                    columns={productColumns}
                    renderActions={(row) => (
                        <div className={cx("action-icon")}>
                            <FontAwesomeIcon
                                icon={faPen}
                                className={cx("update-icon")}
                                onClick={() => setIsModalUpdateOpen(true)}
                            />
                            <FontAwesomeIcon
                                icon={faTrash}
                                className={cx("delete-icon")}
                                onClick={() => setIsModalDeleteOpen(true)}
                            />
                        </div>
                    )}
                    handle={(ids) => {
                        setSelectedRowsToDelete(ids);
                        setIsModalDeleteManyOpen(true);
                    }}
                    onRow={handleOnRow}
                />
            </div>
            <Modal title="Tạo sản phẩm" isOpen={isModalCreateOpen} onClose={handleCreateClose}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
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
                            className={cx("input")}
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
                                message: "Vui lòng chọn loại sản phẩm!",
                            },
                        ]}
                        className={cx("custom-form-item")}
                    >
                        <div className={cx("spacing-type")}>
                            <select name="type" onChange={handleOnChangeSelect} className={cx("input")}>
                                <option value="">Chọn loại</option>
                                {productTypes?.data?.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                                <option key="10" value="more">
                                    Thêm
                                </option>
                            </select>
                            {stateProduct.type === "more" && (
                                <Form.Item
                                    name="newType"
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
                                        value={stateProduct.newType}
                                        onChange={handleOnChange}
                                        name="newType"
                                    />
                                </Form.Item>
                            )}
                        </div>
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
                            min={1}
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
                            min={1}
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
                            min={0}
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
                            offset: 6,
                            span: 18,
                        }}
                    >
                        <Button primary className={cx("upload-btn")}>
                            <Loading isPending={isPending}>Tạo sản phẩm</Loading>
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Sửa sản phẩm" isOpen={isModalUpdateOpen} onClose={handleUpdateClose}>
                <Loading isPending={isPendingUpdate || isPendingUpdated}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        style={{
                            maxWidth: 600,
                            fontFamily: "var(--font-family)",
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinishUpdate}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            className={cx("custom-form-item")}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên sản phẩm!",
                                },
                            ]}
                        >
                            <InputForm
                                placeholder="Tên sản phẩm"
                                className={cx("input", "spacing")}
                                value={stateProductDetails.name}
                                onChange={handleOnChangeDetails}
                                name="name"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Loại sản phẩm"
                            name="type"
                            className={cx("custom-form-item")}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập loại sản phẩm!",
                                },
                            ]}
                        >
                            <select name="type" onChange={handleOnChangeDetails} className={cx("input")}>
                                {productTypes?.data?.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </Form.Item>

                        <Form.Item
                            label="Số lượng"
                            name="quantity"
                            className={cx("custom-form-item")}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số lượng sản phẩm!",
                                },
                            ]}
                        >
                            <InputForm
                                placeholder="Số lượng sản phẩm"
                                type="number"
                                className={cx("input", "spacing")}
                                value={stateProductDetails.quantity}
                                onChange={handleOnChangeDetails}
                                min={1}
                                name="quantity"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Giá sản phẩm"
                            name="price"
                            className={cx("custom-form-item")}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập giá sản phẩm!",
                                },
                            ]}
                        >
                            <InputForm
                                placeholder="Giá sản phẩm"
                                type="number"
                                className={cx("input", "spacing")}
                                value={stateProductDetails.price}
                                onChange={handleOnChangeDetails}
                                min={1}
                                name="price"
                            />
                        </Form.Item>

                        <Form.Item label="Giảm giá" name="discount" className={cx("custom-form-item")}>
                            <InputForm
                                placeholder="Giảm giá"
                                type="number"
                                className={cx("input", "spacing")}
                                value={stateProductDetails.discount}
                                onChange={handleOnChangeDetails}
                                min={0}
                                name="discount"
                            />
                        </Form.Item>

                        <Form.Item label="Mô tả sản phẩm" name="description" className={cx("custom-form-item")}>
                            <InputForm
                                placeholder="Mô tả sản phẩm"
                                className={cx("input", "spacing")}
                                value={stateProductDetails.description}
                                onChange={handleOnChangeDetails}
                                name="description"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ảnh sản phẩm"
                            name="image"
                            className={cx("custom-form-item")}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn ảnh sản phẩm!",
                                },
                            ]}
                        >
                            <div className={cx("custom-product-field")}>
                                <Upload onChange={handleImageDetails} maxCount={1}>
                                    <Button primary htmlType="submit">
                                        Tải ảnh lên
                                    </Button>
                                </Upload>
                                {stateProductDetails.image && (
                                    <img
                                        src={
                                            stateProductDetails.image ||
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
                                offset: 6,
                                span: 18,
                            }}
                        >
                            <Button primary className={cx("upload-btn")}>
                                <Loading isPending={isPendingUpdated}>Sửa sản phẩm</Loading>
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </Modal>
            <Modal
                title="Xóa sản phẩm"
                isOpen={isModalDeleteOpen}
                onClose={handleDeleteClose}
                onOk={handleDeleteProduct}
                displayOk={true}
            >
                <Loading isPending={isPendingDeleted}>
                    <span>Bạn có muốn xóa sản phẩm này không?</span>
                </Loading>
            </Modal>
            <Modal
                title="Xóa sản phẩm"
                isOpen={isModalDeleteManyOpen}
                onClose={handleDeleteManyClose}
                onOk={handleDeleteManyProduct}
                displayOk={true}
            >
                <Loading isPending={isPendingDeletedMany}>
                    <span>Bạn có muốn xóa sản phẩm đã chọn không?</span>
                </Loading>
            </Modal>
        </div>
    );
}

export default AdminProduct;
