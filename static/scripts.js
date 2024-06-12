// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchBox = document.getElementById('search-box');
    const searchResults = document.getElementById('search-results');
    const errorMessage = document.getElementById('error-message');
    const videoPlayerContainer = document.getElementById('player-container');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        searchYouTube(searchBox.value);
    });

    function searchYouTube(query) {
        fetch(`/api/search?q=${query}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data.items);
            })
            .catch(error => {
                displayError('検索に失敗しました');
            });
    }

    function displayResults(items) {
        searchResults.innerHTML = '';
        items.forEach(item => {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'search-result';
            resultDiv.innerHTML = `
                <p>${item.snippet.title}</p>
                <a href="#" class="play-video" data-video-id="${item.id.videoId}">再生</a>
            `;
            searchResults.appendChild(resultDiv);
        });
        addPlayVideoEvent();
    }

    function addPlayVideoEvent() {
        const playVideoLinks = document.querySelectorAll('.play-video');
        playVideoLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const videoId = this.getAttribute('data-video-id');
                playVideo(videoId);
            });
        });
    }

    function playVideo(videoId) {
        videoPlayerContainer.innerHTML = `
            <video id="video-player" controls>
                <source src="https://www.youtube.com/embed/${videoId}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    }

    function displayError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
});
