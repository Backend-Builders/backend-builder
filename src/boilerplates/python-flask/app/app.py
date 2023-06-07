from flask import Flask


app = Flask(__name__)


@app.route('/', methods=['GET'])
def get_data():
    # Your code here to process the GET request
    # You can return any data or a JSON response

    # Example response
    response = {
        'message': 'Hello, world!'
    }

    return response, 200
