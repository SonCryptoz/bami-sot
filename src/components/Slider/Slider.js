import React from "react";
import { default as SlickSlider } from "react-slick";
import { Image } from "antd";
import classNames from "classnames/bind";

import images from "@/assets/images";
import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

const _images = [images.slider_1, images.slider_2];

function Slider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className={cx("slider-container")}>
            <SlickSlider {...settings}>
                {_images.map((image, index) => (
                    <div key={index}>
                        <Image
                            src={image}
                            alt="slider"
                            preview={false}
                            style={{
                                width: "100%",
                                height: "480px",
                                overflowClipMargin: "content-box",
                                overflow: "clip",
                            }}
                        />
                    </div>
                ))}
            </SlickSlider>
        </div>
    );
}

export default Slider;
