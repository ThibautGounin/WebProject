const io = require('socket.io')()

const json = require('./quiz_db.json');
const players = [{name: ""}];

io.on('connection', (client) => {

  client.on('set-name', (name) => {
    console.log('set-name ', name)
    client.username = name
    players.push(name)
  });

  client.on('get-question', (text) => {
    const question = json.quizz[this.state.id].question;
    console.log('get-question ', question);
    io.emit('add-question', question)
  });

  client.on('get-response', (text) => {
    const response = json.quizz[this.state.id].propositions;
    console.log('get-response ', response);
    io.emit('add-response', response)
  });

  client.on('get-trueIs', (text) => {
    const trueIs = json.quizz[this.state.id].réponse;
    console.log('get-trueIs ', trueIs);
    io.emit('add-trueIs', trueIs)
  });

});

const port = 3001
io.listen(port)
console.log('socket.io listening on port ', port)
