import classNames from "classnames/bind";
import { Form, Upload } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./AdminUser.module.scss";
import Button from "../../../components/Button";
import DataTable from "../../../components/DataTable";
import Modal from "../../../components/Modal";
import { useEffect, useMemo, useState } from "react";
import InputForm from "../../../components/InputForm";
import { getBase64 } from "@/utils";
import * as UserService from "@/services/UserService";
import { useMutationHook } from "@/hooks/useMutationHook";
import Loading from "../../../components/Loading";
import * as message from "@/components/Message/message";
import Search from "@/components/Search";

const cx = classNames.bind(styles);

function AdminUser() {
    const user = useSelector((state) => state?.user);
    const [form] = Form.useForm();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalDeleteManyOpen, setIsModalDeleteManyOpen] = useState(false);
    const [selectedRowsToDelete, setSelectedRowsToDelete] = useState([]);
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);
    const [stateUserDetails, setStateUserDetails] = useState({
        name: "",
        email: "",
        phone: 0,
        address: "",
        avatar: "",
    });
    const [rowSelected, setRowSelected] = useState("");

    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...res } = data;
        return UserService.updateUser(id, { ...res }, token);
    });
    const {
        data: dataUpdated,
        isPending: isPendingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = mutationUpdate;

    const mutationDelete = useMutationHook((data) => {
        const { id, token } = data;
        return UserService.deleteUser(id, token);
    });
    const {
        data: dataDeleted,
        isPending: isPendingDeleted,
        isSuccess: isSuccessDeleted,
        isError: isErrorDeleted,
    } = mutationDelete;

    const mutationDeleteMany = useMutationHook((data) => {
        const { token, ...ids } = data;
        return UserService.deleteManyUser(ids, token);
    });
    const {
        data: dataDeletedMany,
        isPending: isPendingDeletedMany,
        isSuccess: isSuccessDeletedMany,
        isError: isErrorDeletedMany,
    } = mutationDeleteMany;

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === "success") {
            message.success("Cập nhật tài khoản người dùng thành công");
            handleUpdateClose();
        } else if (isErrorUpdated) {
            message.error("Cập nhật tài khoản người dùng thất bại");
        }
    }, [dataUpdated, isSuccessUpdated, isErrorUpdated]);

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === "success") {
            message.success("Xóa tài khoản người dùng thành công");
            handleDeleteClose();
        } else if (isErrorDeleted || dataDeleted?.status === "error") {
            message.error("Xóa tài khoản người dùng thất bại");
        }
    }, [dataDeleted, isSuccessDeleted, isErrorDeleted]);

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === "success") {
            message.success("Xóa tài khoản người dùng thành công");
            setIsModalDeleteManyOpen(false);
        } else if (isErrorDeletedMany || dataDeletedMany?.status === "error") {
            message.error("Xóa tài khoản người dùng thất bại");
        }
    }, [dataDeletedMany, isSuccessDeletedMany, isErrorDeletedMany]);

    const fetchAllUsers = async () => {
        const res = await UserService.getAllUsers();
        return res;
    };

    // Sử dụng useQuery để fetch dữ liệu người dùng
    const queryUser = useQuery({
        queryKey: ["user"],
        queryFn: fetchAllUsers,
    });
    const { data: users } = queryUser;

    const handleSearch = (term) => {
        setSearchTerm(term);
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

    const onFinishUpdate = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateUserDetails },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        );
    };

    const handleDeleteUser = () => {
        mutationDelete.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        );
    };

    const handleDeleteManyUser = () => {
        mutationDeleteMany.mutate(
            { ids: selectedRowsToDelete, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        );
    };

    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleAvatarDetails = async (info) => {
        const { fileList } = info;

        if (fileList.length > 0) {
            const file = fileList[0];

            // Kiểm tra trạng thái upload là 'done'
            if (file.status === "done") {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                setStateUserDetails({
                    ...stateUserDetails,
                    avatar: file.preview,
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

    const fetchAllDetailsUser = async (rowSelected) => {
        const res = await UserService.getDetailsUser(rowSelected);
        if (res?.data) {
            setStateUserDetails({
                name: res.data.name,
                email: res.data.email,
                phone: res.data.phone,
                address: res.data.address,
                avatar: res.data.avatar,
            });
        }
        setIsPendingUpdate(false);
    };

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (rowSelected) {
            setIsPendingUpdate(true);
            fetchAllDetailsUser(rowSelected);
        }
    }, [rowSelected]);

    const handleDetailsUser = () => {
        setIsModalUpdateOpen(true);
    };

    const userColumns = [
        { key: "name", title: "Tên người dùng", dataIndex: "name" },
        {
            key: "email",
            title: "Email",
            dataIndex: "email",
        },
        { key: "phone", title: "SĐT", dataIndex: "phone" },
        { key: "address", title: "Địa chỉ", dataIndex: "address" },
        {
            key: "isAdmin",
            title: "Quyền",
            dataIndex: "isAdmin",
            filters: [
                { text: "Admin", value: "True" },
                { text: "None", value: "False" },
            ],
        },
    ];

    // Lọc dữ liệu người dùng dựa trên từ khóa tìm kiếm
    const filteredUsers = useMemo(() => {
        if (!searchTerm) {
            return (
                users?.data.map((user) => ({
                    ...user,
                    key: user._id,
                    isAdmin: user.isAdmin ? "True" : "False", // Chuyển đổi boolean thành chuỗi
                })) || []
            );
        }
        return users?.data
            .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((user) => ({
                ...user,
                key: user._id,
                isAdmin: user.isAdmin ? "True" : "False", // Chuyển đổi boolean thành chuỗi
            }));
    }, [users, searchTerm]);

    return (
        <div className={cx("wrapper")}>
            <div>
                <h2>Quản lý tài khoản người dùng</h2>
            </div>
            <div className={cx("search-wrapper")}>
                <Search onSearch={handleSearch} placeholder="Tìm kiếm tên tài khoản" />
            </div>
            <div className={cx("table-data")}>
                <DataTable
                    data={filteredUsers}
                    columns={userColumns}
                    renderActions={(row) => (
                        <div className={cx("action-icon")}>
                            <FontAwesomeIcon icon={faPen} className={cx("update-icon")} onClick={handleDetailsUser} />
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
            <Modal title="Sửa tài khoản người dùng" isOpen={isModalUpdateOpen} onClose={handleUpdateClose}>
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
                            label="Tên User"
                            name="name"
                            className={cx("custom-form-item")}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên người dùng!",
                                },
                            ]}
                        >
                            <InputForm
                                placeholder="Tên người dùng"
                                className={cx("input", "spacing")}
                                value={stateUserDetails.name}
                                onChange={handleOnChangeDetails}
                                name="name"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập Email!",
                                },
                            ]}
                            className={cx("custom-form-item")}
                        >
                            <InputForm
                                placeholder="example123@gmail.com"
                                className={cx("input", "spacing")}
                                value={stateUserDetails.email}
                                onChange={handleOnChangeDetails}
                                name="email"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số điện thoại!",
                                },
                            ]}
                            className={cx("custom-form-item")}
                        >
                            <InputForm
                                placeholder="+84"
                                type="number"
                                className={cx("input", "spacing")}
                                value={stateUserDetails.phone}
                                onChange={handleOnChangeDetails}
                                name="phone"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập địa chỉ!",
                                },
                            ]}
                            className={cx("custom-form-item")}
                        >
                            <InputForm
                                placeholder="123 Satte..."
                                className={cx("input", "spacing")}
                                value={stateUserDetails.address}
                                onChange={handleOnChangeDetails}
                                name="address"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ảnh đại diện"
                            name="avatar"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn ảnh đại diện!",
                                },
                            ]}
                            className={cx("custom-form-item")}
                        >
                            <div className={cx("custom-product-field")}>
                                <Upload onChange={handleAvatarDetails} maxCount={1}>
                                    <Button primary htmlType="submit">
                                        Tải ảnh lên
                                    </Button>
                                </Upload>
                                {stateUserDetails.avatar && (
                                    <img
                                        src={
                                            stateUserDetails.avatar ||
                                            "http://localhost:3000/static/media/bami-sot.9fdfa0bd114f70652ee6.png"
                                        }
                                        alt="User-Avatar"
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
                                <Loading isPending={isPendingUpdated}>Sửa tài khoản người dùng</Loading>
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </Modal>
            <Modal
                title="Xóa tài khoản người dùng"
                isOpen={isModalDeleteOpen}
                onClose={handleDeleteClose}
                onOk={handleDeleteUser}
                displayOk={true}
            >
                <Loading isPending={isPendingDeleted}>
                    <span>Bạn có muốn xóa tài khoản này không?</span>
                </Loading>
            </Modal>
            <Modal
                title="Xóa tài khoản người dùng"
                isOpen={isModalDeleteManyOpen}
                onClose={handleDeleteManyClose}
                onOk={handleDeleteManyUser}
                displayOk={true}
            >
                <Loading isPending={isPendingDeletedMany}>
                    <span>Bạn có muốn xóa tài khoản người dùng đã chọn không?</span>
                </Loading>
            </Modal>
        </div>
    );
}

export default AdminUser;
