import { useState } from "react";
import './CreatePaste.css'

export default function CreatePaste() {
    const [text, setText] = useState("");
    const [link, setLink] = useState("");

    const submit = async () => {
        const res = await fetch("https://pastebin-lite-backend-tulb.onrender.com/paste", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: text }),
        });
        const data = await res.json();
        setLink(data.url);
        setText("");
    };

    return (
        <div className="main">
          <h1>PasteBin</h1>
            <h2>Create Paste</h2>
            <textarea
                rows="10"
                cols="60"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <br />
            <button onClick={submit}>Create</button>

            {link && <p>Share: <a href={link}>{link}</a></p>}
        </div>
    );
}
