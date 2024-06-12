const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 静的ファイルの提供
app.use(express.static('public'));

// ダウンロードリンクを生成する関数（例）
const getDownloadLink = (videoId) => {
    // ここで実際にYouTubeのAPIなどを使ってダウンロードリンクを取得します
    // 仮のリンクを返します
    if (!videoId) {
        throw new Error('動画IDが無効です');
    }
    return `https://rr4---sn-ab5sznzs.googlevideo.com/videoplayback?expire=...&id=${videoId}`;
};

app.get('/api/download', (req, res) => {
    const videoId = req.query.videoId;
    try {
        const downloadUrl = getDownloadLink(videoId);
        res.json({ downloadUrl });
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
