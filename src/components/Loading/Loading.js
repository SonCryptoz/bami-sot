import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = ({ children, isPending, delay = 200, ...props }) => {
    const customSpinner = <LoadingOutlined style={{ fontSize: "2rem", color: "#603913", fontWeight: "800" }} spin />;
    return (
        <div>
            <Spin spinning={isPending} delay={delay} indicator={customSpinner} style={props.style}>
                {isPending ? null : children} {/* Hiển thị children chỉ khi không loading */}
            </Spin>
        </div>
    );
};

export default Loading;
