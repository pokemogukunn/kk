document.getElementById('submitBtn').addEventListener('click', async function (e) {
    e.preventDefault();

    const videoId = document.getElementById('videoId').value;
    const response = await fetch(`/api/video?videoId=${videoId}`);

    if (response.ok) {
        const data = await response.json();
        document.getElementById('videoTitle').textContent = data.title;
        document.getElementById('videoAuthor').textContent = `作者: ${data.author}`;
        document.getElementById('videoThumbnail').src = data.thumbnail;
        document.getElementById('videoDescription').textContent = data.description;
        document.getElementById('downloadAnchor').href = data.downloadUrl;

        document.getElementById('videoDetails').style.display = 'block';
        document.getElementById('downloadLink').style.display = 'block';
        document.getElementById('errorMessage').style.display = 'none';
    } else {
        const errorData = await response.json();
        document.getElementById('errorMessage').textContent = `エラー: ${errorData.error}`;
        document.getElementById('errorMessage').style.display = 'block'; // エラーメッセージを表示
        document.getElementById('videoDetails').style.display = 'none';
        document.getElementById('downloadLink').style.display = 'none';
    }
});
