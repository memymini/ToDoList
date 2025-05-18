"use client";
import Image from "next/image";
import styles from "./List.module.css";
import ListItem from "./ListItem";
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
                        <ListItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            isCompleted={item.isCompleted}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
