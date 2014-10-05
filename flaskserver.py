from flask import Flask, render_template
from flask.ext.socketio import SocketIO


# mate


class Mate:
    def __init__(self):
        pass

    def set_keyword(self, k):
        self.keyword = k


mate = Mate()


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


@socketio.on('change keyword', namespace='/noisytweets')
def test_disconnect(data):
    print('Changing to: ' + data['new_keyword'])
    # TODO: figure out how to change the filter


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