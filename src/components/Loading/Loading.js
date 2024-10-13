import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = ({ children, isPending, delay = 200 }) => {
    const customSpinner = <LoadingOutlined style={{ fontSize: "2rem", color: "#603913", fontWeight: "800" }} spin />;
    return (
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Spin spinning={isPending} delay={delay} indicator={customSpinner}>
                {isPending ? null : children} {/* Hiển thị children chỉ khi không loading */}
            </Spin>
        </div>
    );
};

export default Loading;
