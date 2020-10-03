import argparse
from flask import Flask, Response
from flask import request, jsonify, send_from_directory
from flask_httpauth import HTTPTokenAuth
from os import environ
from os import path
from paste.translogger import TransLogger
from pathlib import Path
from waitress import serve
import sys
import time

from lm_web_api.connector import ModelApiConnector

AUTH_TOKEN = environ['AUTH_TOKEN'] if 'AUTH_TOKEN' in environ else '337b14a7-5865-4b24-a2f0-44d98133c860'

app = Flask(__name__, static_url_path='/gpt-2-ui/build/static')
auth = HTTPTokenAuth(scheme='Bearer')

@auth.verify_token
def verify_token(token):
    return token == AUTH_TOKEN

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if path == '/':
        path = 'index.html'
    return send_from_directory('gpt-2-ui/build', path)


@app.route('/gpt2', methods=['POST'])
@auth.login_required
def gpt2_api():
    try:
        obj = request.json
    except:
        return {'error': 'json request', 'type': 'JsonError', 'data': request.data}
    # try:
    text = obj['text'] if 'text' in obj else 'Ich mag veganes Hackfleisch vom Stader Huhn.'
    params = obj['params'] if 'params' in obj else {}

    t0 = time.time()
    obj['result'] = app.config['model'].responses_for_text(text, params)
    obj['time'] = format(time.time() - t0, '.3f')
    return obj
    # except KeyError as err:
    #     return {'error': err.args[0], 'type': 'KeyError'}
    # except:
    #     return {'error':  ("Error: %s" % sys.exc_info()[0]), 'type': 'OtherError'}

@app.errorhandler(500)
def internal_error(e):
    return jsonify(error=str(e)), 500

@app.errorhandler(400)
def internal_error(e):
    return jsonify(error=str(e)), 400

def main():
    parser = argparse.ArgumentParser()
    arg = parser.add_argument
    arg('model_root', type=Path)
    arg('--port', type=int, default=8000)
    arg('--host', default='localhost')
    args = parser.parse_args()

    app.config['model'] = ModelApiConnector(args.model_root)
    serve(TransLogger(app), host=args.host, port=args.port)

if __name__ == "__main__":
    main()
