const express = require("express");
const ytdl = require("ytdl-core");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/convert", async (req, res) => {
    const videoId = req.query.videoId;
    if (!videoId) {
        return res.status(400).json({ success: false, message: "ビデオIDが指定されていません。" });
    }

    try {
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const info = await ytdl.getInfo(videoUrl);
        const format = ytdl.chooseFormat(info.formats, { quality: "18" }); // itag 18 is for MP4

        if (format && format.url) {
            // ダウンロードリンクを修正
            const downloadUrl = format.url.replace("https://www.googleapis.com/", "https://rr4---sn-npoe7ndl.googlevideo.com/");
            return res.json({ success: true, downloadUrl });
        } else {
            return res.status(500).json({ success: false, message: "適切なフォーマットが見つかりませんでした。" });
        }
    } catch (error) {
        console.error("エラーが発生しました:", error);
        return res.status(500).json({ success: false, message: "変換中にエラーが発生しました。" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
