"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ListItem.module.css";

interface Props {
    id: number;
    name: string;
    isCompleted: boolean;
}

export default function ListItem({ id, name, isCompleted }: Props) {
    const router = useRouter();
    const [completed, setCompleted] = useState(isCompleted);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const tenantId = "minhee";

    const handleClick = () => {
        router.push(`/detail/${id}`);
    };

    const handleCheckboxClick = async (e: React.MouseEvent) => {
        e.stopPropagation();

        try {
            const newState = !completed;

            const res = await fetch(`${baseUrl}/${tenantId}/items/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isCompleted: newState }),
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(`상태 변경 실패: ${msg}`);
            }

            setCompleted(newState);
        } catch (err) {
            alert((err as Error).message);
        }
    };

    return (
        <li
            onClick={handleClick}
            className={`${styles.todo_item} ${completed ? styles.completed : ""}`}
        >
            <img
                src={completed ? "/check-box-done.png" : "/check-box-empty.png"}
                className={styles.checkbox}
                alt={completed ? "완료됨" : "미완료"}
                onClick={handleCheckboxClick}
            />
            {name}
        </li>
    );
}
