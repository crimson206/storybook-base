from flask import Flask, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # CORS 설정 추가

@app.route('/example', methods=['GET'])
def example():
    print("clicked")
    
    return "hi"

@app.route('/simpleclick', methods=['POST'])
def simpleclck():
    data = request.json
    print(data)
    
    return data


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
