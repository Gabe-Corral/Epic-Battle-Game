import React, { Component } from "react";
import CharacterDisplay from "./CharacterDisplay";
import UserDisplay from "./UserDisplay";
import EnemyDisplay from "./EnemyDisplay";
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Battle from './Battle'

const url = "http://localhost:3000"

class Main extends Component {

  state = {
    enemies: [],
    opponents: {},
    redirect: false,
    character: null,
    opponentName: "",
    opponentSelected: false
  }

  createCharacter = (e, character) => {
    e.preventDefault();
    fetch(`${url}/character`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(character)
    })
  }

  componentDidMount = () => {
    fetch(`${url}/character`)
    .then(res => res.json())
    .then(res => {
      const enemy = res.filter(c => c.user_id === 1)
      const character = res.find(c => c.user_id === this.props.user.id)
      this.setState({ enemies: enemy, character: character })
    })
  }

  setOpponents = (enemy) => {
    this.setState({ opponents: enemy, redirect: true, opponentSelected: true, opponentName: enemy.name })
    console.log(this.state.redirect)
    console.log(enemy.name)
  }

    render() {
        return (
            <div className= "main-page">
            <Router>
            <Switch>
            <Route exact path="/">
            <UserDisplay user={this.props.user}/>
            <h2>Your Character:</h2>

            <CharacterDisplay user={this.props.user} createCharacter={this.createCharacter} showForm={this.props.showForm} character={this.state.character}/>
            <div className="enemy-banner">
                <h1>Choose your Opponent</h1>
                {this.state.opponentSelected ? (
                  <h2 className="opponent">{this.state.opponentName}</h2>
                ) : ('')
                }
                <div className="battle-btn-container">
                  <Link to="/battle">
                    <button className="battle-btn">Battle</button>
                  </Link>
                </div>
            </div>
            <div className="enemy-container">
              {this.state.enemies.map(c => <EnemyDisplay enemy={c} key={c.name} setOpponents={this.setOpponents}/>)}
            </div>
            </Route>
            <Route path="/battle" >
              <Battle character={this.state.character} enemy={this.state.opponents} />
              </Route>
            </Switch>
            </Router>
            </div>
        )
    }
}

export default Main
