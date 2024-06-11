const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/api/video', async (req, res) => {
    const videoId = req.query.videoId;

    if (!ytdl.validateID(videoId)) {
        return res.status(400).json({ error: 'Invalid video ID' });
    }

    try {
        const videoInfo = await ytdl.getInfo(videoId);
        const format = ytdl.chooseFormat(videoInfo.formats, { quality: 'highestvideo' });

        res.json({
            title: videoInfo.videoDetails.title,
            author: videoInfo.videoDetails.author.name,
            description: videoInfo.videoDetails.description,
            thumbnail: videoInfo.videoDetails.thumbnails[0].url,
            downloadUrl: format.url
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch video info' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
