"use client";
import { useRef, useEffect, useState, use } from "react";
import styles from "./page.module.css";
import ListItem from "../../../components/ListItem";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const tenantId = "minhee";

interface TodoItem {
    id: number;
    name: string;
    memo: string;
    imageUrl: string;
    isCompleted: boolean;
}

export default function DetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [item, setItem] = useState<TodoItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [hasUploaded, setHasUploaded] = useState(false);
    const [memo, setMemo] = useState("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    const imageToShow = previewUrl || item?.imageUrl;

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`${baseUrl}/${tenantId}/items/${id}`);
                if (!res.ok) throw new Error("데이터 불러오기 실패");

                const data = await res.json();
                setItem(data);
                setMemo(data.memo || "");
                setPreviewUrl(data.imageUrl || null);
                setHasUploaded(!!data.imageUrl);
            } catch (err) {
                console.error("상세 아이템 에러:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleUpdate = async () => {
        try {
            let imageUrl = previewUrl ?? item?.imageUrl ?? "";

            if (uploadFile) {
                const formData = new FormData();
                formData.append("image", uploadFile);

                const uploadRes = await fetch(`${baseUrl}/${tenantId}/images/upload`, {
                    method: "POST",
                    body: formData,
                });

                const resultText = await uploadRes.text();
                if (!uploadRes.ok) throw new Error(`이미지 업로드 실패: ${resultText}`);

                const uploadData = JSON.parse(resultText);
                imageUrl = uploadData.url;
            }

            const patchRes = await fetch(`${baseUrl}/${tenantId}/items/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: item?.name ?? "",
                    memo,
                    imageUrl,
                    isCompleted: item?.isCompleted ?? false,
                }),
            });

            const patchText = await patchRes.text();
            if (!patchRes.ok) throw new Error(`수정 실패: ${patchText}`);

            alert("수정이 완료되었습니다.");
            router.push("/");
        } catch (err) {
            const error = err as Error;
            alert(`오류 발생: ${error.message}`);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`${baseUrl}/${tenantId}/items/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("삭제 실패");

            alert("삭제가 완료되었습니다.");
            router.push("/");
        } catch (err) {
            console.error("삭제 오류:", err);
            alert("삭제 중 오류 발생");
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);
            setUploadFile(file);
            setHasUploaded(true);
        }
    };

    if (loading || !item) return <p />;

    return (
        <div className={styles.container}>
            <div className={styles.detail_container}>
                <div className={styles.list_container}>
                    <ListItem
                        id={item.id}
                        name={item.name}
                        isCompleted={item.isCompleted}
                    />
                </div>
                <div className={styles.contents_container}>
                    <div className={styles.image_upload}>
                        {imageToShow ? (
                            <img
                                src={imageToShow}
                                alt="업로드된 이미지"
                                className={styles.preview_image}
                                onError={() => console.error("이미지 로딩 실패:", imageToShow)}
                            />
                        ) : (
                            <img
                                src="/img-icon.png"
                                alt="기본 아이콘"
                                className={styles.img_icon}
                            />
                        )}
                        <img
                            src={hasUploaded ? "/detail-edit-icon.png" : "/detail-plus-icon.png"}
                            alt="사진 업로드 버튼"
                            className={styles.upload_icon}
                            onClick={handleUploadClick}
                            role="button"
                            aria-label="사진 업로드"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                    </div>
                    <div className={styles.memo}>
                        <p className={styles.memo_title}>Memo</p>
                        <textarea
                            className={styles.memo_input}
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.button_container}>
                    <button onClick={handleUpdate} className={styles.edit_button} />
                    <button onClick={handleDelete} className={styles.delete_button} />
                </div>
            </div>
        </div>
    );
}
