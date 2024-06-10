const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/convert', async (req, res) => {
    const videoId = req.query.videoId;
    if (!videoId) {
        return res.json({ success: false, message: 'Video ID is required' });
    }

    try {
        const info = await ytdl.getInfo(videoId);
        const format = ytdl.chooseFormat(info.formats, { quality: '18' });
        if (format && format.url) {
            return res.json({ success: true, downloadUrl: format.url });
        } else {
            return res.json({ success: false, message: 'No suitable format found' });
        }
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: 'Error processing video' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
