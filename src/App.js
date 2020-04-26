import React from 'react';
import './App.css';
import logo from './quiz.png';

const json = require('./quiz_db.json');


class InputField extends React.Component {
  constructor() {
    super()
    this.state = {value: ""}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    if(this.props.onChange) this.props.onChange(event.target.value)
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    if(this.props.onSubmit) this.props.onSubmit(this.state.value)
    this.setState({value: ""})
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>{this.props.label} </label>
        <input type="text" onChange={this.handleChange} value={this.state.value} autoFocus={this.props.autoFocus} />
      </form>)
  }
}

class LoginWindow extends React.Component {
  render() {
    return (
      <div>
        <img className="logo" src={logo} alt="quiz" />
          <div className="loginInput">
            <InputField label="Nom" onChange={this.props.onNameChange} onSubmit={this.props.onLogin} autoFocus />
            <button className="buttonJoin" onClick={this.props.onLogin}>Rejoindre</button>
          </div>
      </div>
    )
  }
}


class GameWindow extends React.Component {
  constructor(props) {
      super(props)
      this.state = {current: 'question', question: '', responses: [], id: 0, trueIs: '', score: 0, userWinLast: false}

      this.getQuestion = this.getQuestion.bind(this)
      this.getResponses = this.getResponses.bind(this)
      this.getTrueIs = this.getTrueIs.bind(this)
      this.getData = this.getData.bind(this)
      this.nextRound = this.nextRound.bind(this)
      this.onResponse = this.onResponse.bind(this)
    }

    getQuestion(questionDb) {
        this.setState((state, props) => ({
          question: questionDb
        }))
      }

    getResponses(responsesdB) {
      this.setState((state, props) => ({
        responses: responsesdB
      }))
    }

    getTrueIs(trueResponse) {
      this.setState((state, props) => ({
        trueIs: trueResponse
      }))
    }

    getData() {
      this.getQuestion(json.quizz[this.state.id].question);
      this.getResponses(json.quizz[this.state.id].propositions);
      this.getTrueIs(json.quizz[this.state.id].réponse);
    }

    nextRound() {
      this.getData()

      this.setState ((state, props) => ({
        current: "question"
      }))
      this.setState((state, props) => ({
        id: this.state.id+1
      }))
    }

    onResponse(response) {
      if (response === this.state.trueIs){
        this.setState((state, props) => ({
          score: this.state.score+1
        }))
      }
      this.setState((state, props) => ({
        userWinLast: response === this.state.trueIs
      }))
      this.setState ((state, props) => ({
        current: "waiting"
      }))
    }

  render() {
    if (this.state.question === '') this.nextRound()
    const responses = this.state.responses.map((m) =>
        <td> <button className="buttonAnswer" onClick={this.onResponse.bind(this, m)}>{m}</button> </td>)

      switch (this.state.current) {

        case "question": return(
        <div>
          <div className="question">
            <p className="text"> {this.state.question} </p>
            <tr>
                {responses}
                </tr>
          </div>
          <button onClick={this.props.onQuit}>Quitter</button>
        </div>
        )

        case "waiting": return(
          <div className="waiting">
            <p>Score: {this.state.score}</p>
            <p className="text"> C'est une {this.state.userWinLast ? "bonne" : "mauvaise"} réponse !</p>
            <p> {!this.state.userWinLast ? "La bonne réponse était: "+this.state.trueIs : ""} </p>
            <button className="buttonNext" onClick={this.nextRound}>Suivant</button>
          </div>
        )

        default:
      }
    }
  }

class App extends React.Component {

  constructor() {
    super()
    this.state = {name: "", current: "login"}

    this.closeGame = this.closeGame.bind(this)
    this.startGame = this.startGame.bind(this)
    this.setName = this.setName.bind(this)
  }

  closeGame() {
    this.setState({current: "login"})
  }

  startGame() {
    this.setState({current: "game"})
  }

  setName(name) {
    this.setState({name: name})
  }

  render() {
    switch (this.state.current) {
      case "login":
        return <LoginWindow onNameChange={this.setName} onLogin={this.startGame} />
      case "game":
        return <GameWindow name={this.state.name} onQuit={this.closeGame} />
      default:
        return <LoginWindow onNameChange={this.setName} onLogin={this.startGame} />
    }
  }
}

export default App;
