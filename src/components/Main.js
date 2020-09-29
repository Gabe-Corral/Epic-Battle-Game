import React, { Component } from "react";
import CharacterDisplay from "./CharacterDisplay";
import UserDisplay from "./UserDisplay";
import EnemyDisplay from "./EnemyDisplay";

const url = "http://localhost:3000"

class Main extends Component {

  state = {
    enemies: []
  }

  createCharacter = (e) => {
    e.preventDefault();
    fetch(`${url}/character`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        name: e.target.name.value,
        img_url: e.target.img_url.value,
        physical: e.target.physical.value,
        magic: e.target.magic.value,
        physical_defense: e.target.physical_defense.value,
        magic_defense: e.target.magic_defense.value,
        user_id: this.props.user.id
      })
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
            {this.state.enemies.map(c => <EnemyDisplay enemy={c} key={c.name}/>)}

            <CharacterDisplay user={this.props.user} createCharacter={this.createCharacter} showForm={this.props.showForm} showCharacter={this.props.showCharacter} />

            </div>
        )
    }
}

export default Main
