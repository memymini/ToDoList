"use client";
import useResponsive from "../hooks/useResponsive";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
    const device = useResponsive();

    const imageSrc =
        device === "mobile"
            ? "/banner-small.png"
            : "/banner.png";

    const imageSize =
        device === "mobile"
            ? { width: 71, height: 40 }
            : { width: 151, height: 40 };

    return (
        <div className={styles.header_container}>
            <div className={styles.banner_container}>
                <Image
                    src={imageSrc}
                    alt="banner"
                    width={imageSize.width}
                    height={imageSize.height}
                />
            </div>
        </div>
    );
}