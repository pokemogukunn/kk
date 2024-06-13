from flask import Flask, request, jsonify, render_template
import requests
import os

app = Flask(__name__)

YOUTUBE_API_KEY = os.getenv('AIzaSyDMRXXUj0XS9vRjTaV5A2WrNxmv3gr4yR0')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/search')
def search():
    query = request.args.get('q')
    if not query:
        return jsonify({'error': 'Missing query parameter'}), 400

    url = 'https://www.googleapis.com/youtube/v3/search'
    params = {
        'part': 'snippet',
        'q': query,
        'key': YOUTUBE_API_KEY,
        'type': 'video'
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Failed to fetch data from YouTube API', 'message': str(e)}), 500

    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
