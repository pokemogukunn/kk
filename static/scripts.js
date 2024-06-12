document.getElementById('search-button').addEventListener('click', function() {
    var query = document.getElementById('search-input').value;
    fetch('/search?q=' + query)
        .then(response => response.json())
        .then(data => {
            var results = document.getElementById('results');
            results.innerHTML = '';
            if (data.items) {
                data.items.forEach(item => {
                    var video = document.createElement('div');
                    video.innerHTML = `
                        <h3>${item.snippet.title}</h3>
                        <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
                            <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title}">
                        </a>
                    `;
                    results.appendChild(video);
                });
            } else {
                results.innerHTML = '<p class="error">検索に失敗しました</p>';
            }
        })
        .catch(error => {
            document.getElementById('results').innerHTML = '<p class="error">検索に失敗しました</p>';
        });
});
