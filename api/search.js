// /api/search.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { q } = req.query;

    if (!q) {
        res.status(400).json({ error: 'Query parameter is required' });
        return;
    }

    // YouTube Data APIを使用して検索を行う例
    const apiKey = process.env.YOUTUBE_API_KEY;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(q)}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.error) {
            res.status(500).json({ error: data.error.message });
            return;
        }

        res.status(200).json(data.items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from YouTube API' });
    }
};
