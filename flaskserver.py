from flask import Flask, render_template
from flask.ext.socketio import SocketIO, emit


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
    emit('connect okay', {'data': 'Connected'})


@socketio.on('disconnect', namespace='/noisytweets')
def test_disconnect():
    print('Client disconnected')


# communication methods


def send_log_message(msg):
    emit('log message', {'msg': msg})


def send_emoji_event(which):
    emit('emoji event', {'which': which})


def send_mood_event(mood):
    emit('mood event', {'mood': mood})


# done


def start_server():
    socketio.run(app)