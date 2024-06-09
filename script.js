document.getElementById('convert-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var videoUrl = document.getElementById('video-url').value;
    var videoId = getVideoId(videoUrl);
    if (videoId) {
        var apiUrl = '/api/convert?videoId=' + videoId;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('ネットワークの応答が正しくありません');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    var downloadLink = document.getElementById('download-link');
                    downloadLink.href = data.downloadUrl;
                    downloadLink.textContent = data.downloadUrl;
                    document.getElementById('result').style.display = 'block';
                } else {
                    alert('変換に失敗しました。再試行してください。');
                }
            })
            .catch(error => {
                console.error('エラーが発生しました:', error);
                alert('エラーが発生しました。再試行してください。');
            });
    } else {
        alert('有効なYouTube URLを入力してください。');
    }
});

function getVideoId(url) {
    var regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var match = url.match(regex);
    return match ? match[1] : null;
}
