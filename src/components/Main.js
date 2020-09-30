import React, { Component } from "react";
import CharacterDisplay from "./CharacterDisplay";
import UserDisplay from "./UserDisplay";
import EnemyDisplay from "./EnemyDisplay";

const url = "http://localhost:3000"

class Main extends Component {

  state = {
    enemies: []
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
    .then(enemies => {
      const enemy = enemies.filter(c => c.user_id === 1)
      this.setState({ enemies: enemy })
    })
  }

    render() {
        return (
            <div className= "main-page">
            <UserDisplay user={this.props.user}/>

            <CharacterDisplay user={this.props.user} createCharacter={this.createCharacter} showForm={this.props.showForm} />
            <div className="enemy-container">
              {this.state.enemies.map(c => <EnemyDisplay enemy={c} key={c.name}/>)}
            </div>
            </div>
        )
    }
}

export default Main
