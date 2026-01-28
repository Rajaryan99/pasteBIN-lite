import express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";

const app = express();
app.use(cors());
app.use(express.json());

const pastes = {}; // in-memory storage (OK for assignment)


// Create Paste
app.post("/paste", (req, res) => {
    const { content, ttl, maxViews } = req.body;

    const id = uuid();
    pastes[id] = {
        content,
        createdAt: Date.now(),
        ttl: ttl ? ttl * 1000 : null,
        maxViews: maxViews || null,
        views: 0,
    };

    res.json({ url: `http://localhost:5173/paste/${id}` });
});


// Get Paste
app.get("/paste/:id", (req, res) => {
    const paste = pastes[req.params.id];
    if (!paste) return res.status(404).json({ message: "Not found" });

    // TTL check
    if (paste.ttl && Date.now() - paste.createdAt > paste.ttl) {
        delete pastes[req.params.id];
        return res.status(410).json({ message: "Paste expired" });
    }

    // View limit check
    if (paste.maxViews && paste.views >= paste.maxViews) {
        delete pastes[req.params.id];
        return res.status(410).json({ message: "View limit exceeded" });
    }

    paste.views++;
    res.json({ content: paste.content });
});

app.listen(5000, () => console.log("Server running on port 5000"));
