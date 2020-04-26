import openSocket from 'socket.io-client';


const  socket = openSocket('http://localhost:3000');

class GameClient {

  constructor(username) {
    socket.emit('set-name', username)
  }

  getQuestion(cb) {
    socket.on('add-question', (question) => cb(question))
  }

  getResponse(cb) {
    socket.on('add-response', (response) => cb(response))
  }

  getTrueIs(cb) {
    socket.on('add-trueIs', (trueIs) => cb(trueIs))
  }

}

export { GameClient }
