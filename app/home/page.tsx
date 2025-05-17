"use client";
import styles from "./page.module.css";

export default function HomePage() {

  return (
    <div className={styles.home_container}>
      <div className={styles.search_box_container}>
        <input
          type="text"
          className={styles.search_box}
          placeholder="할 일을 입력해주세요"
        />
        <button className={styles.add_button}>추가하기</button>
      </div>
      <div className={styles.list_container}>
        <div className={styles.todo_list_container}></div>
        <div className={styles.done_list_container}></div>
      </div>
    </div>
  );
}