"use client";
import styles from "./ListItem.module.css";
import { useRouter } from "next/navigation";

interface Props {
    id: number;
    name: string;
    isCompleted: boolean;
}

export default function ListItem({ id, name, isCompleted }: Props) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/detail/${id}`);
    };

    return (
        <li
            onClick={handleClick}
            className={`${styles.todo_item} ${isCompleted ? styles.completed : ""}`}
        >
            <img
                src={isCompleted ? "/check-box-done.png" : "/check-box-empty.png"}
                className={styles.checkbox}
                alt={isCompleted ? "완료됨" : "미완료"}
            />
            {name}
        </li>
    );
}