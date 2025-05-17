"use client";
import Image from "next/image";
import styles from "./List.module.css";

type TodoItem = {
    id: number;
    name: string;
    isCompleted: boolean;
};

interface ListProps {
    titleImage: string;
    listImage: string;
    emptyText: string;
    items: TodoItem[];
}

export default function List({ titleImage, listImage, emptyText, items }: ListProps) {
    return (
        <div className={styles.list_section}>
            <Image src={titleImage} alt="제목" width={101} height={36} className={styles.list_name} />

            {items.length === 0 ? (
                <div>
                    <Image src={listImage} alt="리스트 이미지" width={240} height={240} />
                    <p className={styles.empty_comment}>
                        {emptyText.split('\n').map((line, i) => (
                            <span key={i}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </p>
                </div>
            ) : (
                <ul className={styles.todo_list}>
                    {items.map((item) => (
                        <li key={item.id} className={`${styles.todo_item} ${item.isCompleted ? styles.completed : ""}`}
                        >
                            <img src={item.isCompleted ? "/check-box-done.png" : "/check-box-empty.png"}
                                className={styles.checkbox}
                                alt={item.isCompleted ? "완료됨" : "미완료"}
                            />{item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
