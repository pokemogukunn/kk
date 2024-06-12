from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/search")
def search():
    query = request.args.get("query")
    API_KEY = "AIzaSyA-EqIXnZuPjds-KHEaBOMVwGaKWL2vsms"
    url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q={query}&key={API_KEY}"
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
