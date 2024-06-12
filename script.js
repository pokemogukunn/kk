document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('search-query').value;
    fetch(`/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            data.items.forEach(item => {
                const videoDiv = document.createElement('div');
                videoDiv.innerHTML = `
                    <h2>${item.snippet.title}</h2>
                    <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title}">
                `;
                resultsDiv.appendChild(videoDiv);
            });
        })
        .catch(error => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = `<p class="error">検索に失敗しました: ${error.message}</p>`;
        });
});
