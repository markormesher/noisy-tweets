from flask import Flask, render_template
from flask.ext.socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = ''
socketio = SocketIO(app)


@app.route('/noisytweets')
def index():
    return render_template('index.html')


@socketio.on('connect', namespace='/noisytweets')
def test_connect():
    emit('connect okay', {'data': 'Connected'})


@socketio.on('disconnect', namespace='/noisytweets')
def test_disconnect():
    print('Client disconnected')


@socketio.on('test event', namespace='/noisytweets')
def send_log(msg):
    emit('log event', {'msg': msg})


def send_emoji_event(which):
    emit('emoji event', {'which': which})


def send_mood_event(mood):
    emit('mood event', {'mood': mood})

try:
    if __name__ == '__main__':
        socketio.run(app)
except KeyboardInterrupt:
    print 'Bye bye!'
    exit()