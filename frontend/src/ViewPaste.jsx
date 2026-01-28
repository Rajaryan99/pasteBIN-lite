import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewPaste() {
    const { id } = useParams();
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`https://pastebin-lite-backend-tulb.onrender.com/paste/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.message) setError(data.message);
                else setContent(data.content);
            });
    }, [id]);

    if (error) return <p>{error}</p>;
    return <pre>{content}</pre>;
}
