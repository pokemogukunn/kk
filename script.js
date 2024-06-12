function search() {
    var query = document.getElementById("searchQuery").value;
    fetch("/search?query=" + query)
        .then(response => response.json())
        .then(data => {
            var resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";
            data.items.forEach(item => {
                var videoDiv = document.createElement("div");
                var title = document.createElement("h2");
                title.textContent = item.snippet.title;
                videoDiv.appendChild(title);
                var video = document.createElement("iframe");
                video.width = "560";
                video.height = "315";
                video.src = "https://www.youtube.com/embed/" + item.id.videoId;
                videoDiv.appendChild(video);
                resultsDiv.appendChild(videoDiv);
            });
        })
        .catch(error => console.error("Error:", error));
}
