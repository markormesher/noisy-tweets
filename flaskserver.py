from flask import Flask, render_template
from flask.ext.socketio import SocketIO


# app setup


app = Flask(__name__)
app.config['SECRET_KEY'] = ''
socketio = SocketIO(app)


@app.route('/noisytweets')
def index():
    return render_template('index.html')


# socket setup


@socketio.on('connect', namespace='/noisytweets')
def test_connect():
    socketio.emit('connect okay', {'data': 'Connected'}, namespace='/noisytweets')


@socketio.on('disconnect', namespace='/noisytweets')
def test_disconnect():
    print('Client disconnected')


# communication methods


def send_log_message(msg):
    socketio.emit('log message', {'msg': msg}, namespace='/noisytweets')


def send_emoji_event(which):
    socketio.emit('emoji event', {'which': which}, namespace='/noisytweets')


def send_tweet_event(tweet):
    socketio.emit('tweet event', tweet, namespace='/noisytweets')


# done


def start_server():
    socketio.run(app)