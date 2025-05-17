import styles from "./Header.module.css";

export default function Header() {
    return (
        <div className={styles.header_container}>
            <div className={styles.banner_container}>
                <picture>
                    <source media="(max-width: 768px)" srcSet="/banner-small.png" />
                    <img
                        src="/banner.png"
                        alt="banner"
                        width={151}
                        height={40}
                        className={styles.banner_image}
                    />
                </picture>
            </div>
        </div>
    );
}