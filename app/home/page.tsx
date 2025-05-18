"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import List from "../../components/List";


const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type TodoItem = {
  id: number;
  name: string;
  isCompleted: boolean;
};

// 목록 GET 요청 함수
export default function HomePage() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const tenantId = "minhee";
      const res = await fetch(`${baseUrl}/${tenantId}/items`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data: TodoItem[] = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("todo 불러오기 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchTodos();
  }, []);


  // POST 요청 함수
  const addTodo = async () => {
    console.log("post requested");
    const trimmed = newTodo.trim();
    console.log("입력값:", trimmed);

    if (!trimmed) return;


    try {
      const tenantId = "minhee";
      const res = await fetch(`${baseUrl}/${tenantId}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: trimmed }),
      });
      console.log("요청 성공, 상태코드:", res.status);

      if (!res.ok) throw new Error("Failed to add todo");
      setNewTodo("");
      fetchTodos();
    } catch (err) {
      console.error("할 일 추가 실패:", err);
    }
  };

  const todoList = todos.filter((item) => !item.isCompleted);
  const doneList = todos.filter((item) => item.isCompleted);

  return (
    <div className={styles.home_container}>
      <div className={styles.search_box_container}>
        <input
          type="text"
          className={styles.search_box}
          placeholder="할 일을 입력해주세요"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className={styles.add_button} onClick={addTodo}></button>
      </div>
      <div className={styles.list_container}>
        <List
          titleImage="/todo.png"
          listImage="/todo-image.png"
          emptyText={`할 일이 없어요.\nTODO를 새롭게 추가해주세요!`}
          items={todoList}
        />

        <List
          titleImage="/done.png"
          listImage="/done-image.png"
          emptyText={`아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!`}
          items={doneList}
        />
      </div>
    </div>
  );
}