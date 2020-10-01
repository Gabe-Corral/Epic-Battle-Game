import React from 'react';
import HealthBar from './HealthBar'

class Battle extends React.Component {

  state = {
    health: 100,
    enemyHeath: 100,
    attackPoints: null,
    defenseMethod: null,
    attackMethod: null,
    enemyDamage: 100,
  }

  handleClick = () => {
    let damage = this.state.attackPoints;
    let enemy_defense = ["magic_defense", "physical_defense"];
    let enemy_defense_choice = enemy_defense[Math.floor(Math.random()*enemy_defense.length)];
    if (this.props.enemy[enemy_defense_choice] > this.state.attackPoints) {
      damage = 0
    } else {
      damage = this.state.attackPoints - this.props.enemy[enemy_defense_choice]
    }
    if (this.state.enemyDamage <= 0) {
        this.setState({ enemyDamage: 0 })
    } else {
      this.setState({ enemyDamage: this.state.enemyDamage - damage })
      this.enemyMove()
    }
  }

  enemyMove = () => {
    let defense = this.state.defenseMethod;
    let damage = 0
    let enemy_attack = ["physical", "magic"];
    let enemy_attack_choice = enemy_attack[Math.floor(Math.random()*enemy_attack.length)];
    if (this.props.enemy[enemy_attack_choice] < defense) {
      damage = 0
    } else {
      damage = this.props.enemy[enemy_attack_choice] - defense;
    }
    this.setState({
      health: this.state.health - damage
     })
  }

  handleAttack = (e) => {
    this.setState({ attackPoints: this.props.character.physical, attackMethod: e.target.value })
  }

  handleDefense = (e) => {
    const method = e.target.value
    this.setState({ defenseMethod: this.props.character[method]})
  }

  componentDidUpdate = () => {
    if (this.state.enemyDamage <= 0) {
      console.log("You Won")
    }
  }

  render() {
    return (
      <div className="battle">
      <div className="your-health">
      <HealthBar damage={this.state.health}/>
      </div>
      <div className="enemy-health">
      <HealthBar damage={this.state.enemyDamage}/>
      </div>
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
          <select className="dropdown" type="dropdown" onChange={this.handleAttack}>
          <option>Physical Attack</option>
          <option>Magic Attack</option>
          </select>
          <select className="dropdown" type="dropdown" onChange={this.handleDefense}>
          <option value="physical_defense">Physical Defense</option>
          <option value="magic_defense">Magic Defense</option>
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
