import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewPaste() {
    const { id } = useParams();
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/paste/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.message) setError(data.message);
                else setContent(data.content);
            });
    }, [id]);

    if (error) return <p>{error}</p>;
    return <pre>{content}</pre>;
}
