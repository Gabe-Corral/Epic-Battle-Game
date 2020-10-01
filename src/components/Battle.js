import React from 'react';
import HealthBar from './HealthBar';
import { Redirect } from 'react-router-dom';

class Battle extends React.Component {

  state = {
    heath: "",
    enemyHeath: "",
    redirect: this.props.redirect,
    heath: 100,
    enemyHeath: 100,
  }

  handleClick = () => {
    console.log("yes")
  }

  render() {
    if (this.props.character === null) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <div className="battle">
      <h1>Fight!</h1>
      <div className="character-card">
          <h3>{this.props.character.name}</h3>
          <img className="character-img" src={this.props.character.img_url} alt=""></img>
          <h3>Stats:</h3>
          <div className="character-stats" >
              <p>Physical: {this.props.character.physical}</p>
              <p>Magic: {this.props.character.magic} </p>
              <p>Physical Defense: {this.props.character.physical_defense} </p>
              <p>Magic Defense: {this.props.character.magic_defense} </p>
          </div>
          <div>
          <select className="dropdown" type="dropdown">
          <option>Physical Attack</option>
          <option>Magic Attack</option>
          </select>
          <select className="dropdown" type="dropdown">
          <option>Physical Defense</option>
          <option>Magic Defense</option>
          </select>
          </div>
          <button className="attack-btn" onClick={this.handleClick}>Confirm</button>
        </div>

          <h2 className="vs">VS.</h2>

          <div className="enemy-battle">
          <h3>{this.props.enemy.name}</h3>
          <img className="character-img" src={this.props.enemy.img_url} alt=""></img>
          <h3>Stats:</h3>
          <div className="character-stats" >
              <p>Physical: {this.props.enemy.physical}</p>
              <p>Magic: {this.props.enemy.magic} </p>
              <p>Physical Defense: {this.props.enemy.physical_defense} </p>
              <p>Magic Defense: {this.props.enemy.magic_defense} </p>
          </div>
          </div>
      </div>
    )
  }
}

export default Battle;
