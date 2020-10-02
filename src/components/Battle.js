import React from 'react';
import HealthBar from './HealthBar'
import { Redirect } from 'react-router-dom';
import vsImage from './img/vs.png';
import fightImage from './img/fight.png';

class Battle extends React.Component {

  state = {
    health: 100,
    redirect: this.props.redirect,
    enemyHealth: 100,
    win: '',
    lose: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.persist();

    let yourHitPoints = 10;
    let stance = e.target.stance.value;
    let yourAttackPoints = 0;
    let attackSelection = e.target.attack.value.split(" ");
    let attackType = attackSelection[0].toLowerCase();

    if (stance === "Normal Stance") {
      yourAttackPoints = parseInt(this.props.character[attackType]);
    } else if (stance === "Attack Stance") {
      yourAttackPoints = parseInt(this.props.character[attackType]) + 2;
    } else if (stance === "Defense Stance") {
      yourAttackPoints = parseInt(this.props.character[attackType]) - 2;
    }
    let enemyDefensePoints = this.props.enemy[attackType + "_defense"];

    console.log(`${yourHitPoints + yourAttackPoints - enemyDefensePoints} damage to enemy health`)
    this.setState( previousState => {
      if (previousState.enemyHealth < (yourHitPoints + yourAttackPoints - enemyDefensePoints)) {
        return {
          enemyHealth: 0
        }
      } else {
        return {
          enemyHealth: this.state.enemyHealth - (yourHitPoints + yourAttackPoints - enemyDefensePoints)
        }
      }
    }, () => this.enemyStanceChoice());
  }

  enemyStanceChoice = () => {
    console.log(this.state.enemyHealth);
    let enemy_stance = ["Normal Stance", "Attack Stance", "Defense Stance"];
    let enemy_stance_choice = enemy_stance[Math.floor(Math.random()*enemy_stance.length)];

    this.enemyMove(enemy_stance_choice);
  }

  enemyMove = (stance) => {
    let hitPoints = 10;
    let enemyAttackPoints = 0;
    
    let enemy_attack = ["physical", "magic"];
    let enemy_attack_choice = enemy_attack[Math.floor(Math.random()*enemy_attack.length)];
    
    if (stance === "Normal Stance") {
      enemyAttackPoints = this.props.enemy[enemy_attack_choice];
    } else if (stance === "Attack Stance") {
      enemyAttackPoints = this.props.enemy[enemy_attack_choice] + 2;
    } else if (stance === "Defense Stance") {
      enemyAttackPoints = this.props.enemy[enemy_attack_choice] - 2;
    }

    let yourDefensePoints = this.props.character[enemy_attack_choice + "_defense"];
    console.log(`${hitPoints + enemyAttackPoints - yourDefensePoints} damage to your health`)
    this.setState( previousState => {
      if (previousState.health < (hitPoints + enemyAttackPoints - yourDefensePoints)) {
        return {
          health: 0
        }
      } else {
        return {
          health: this.state.health - (hitPoints + enemyAttackPoints - yourDefensePoints)
        }
      }
    }, () => this.logCharacterHealth());
  }

  logCharacterHealth = () => {
    console.log(this.state.health);
  }

  componentDidUpdate = () => {
    if (this.state.health === 0) {
      console.log("You Lost")
    } else if (this.state.enemyHealth === 0) {
      console.log("You Won")
    }
  }

  render() {
    if (this.props.character === null) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <div className="battle">
      <div className="your-health">
        <HealthBar damage={this.state.health}/>
      </div>
      <div className="enemy-health">
        <HealthBar damage={this.state.enemyHealth}/>
      </div>
      <div className= "fight-banner">
        <img className="fight" src={fightImage} alt="Fight"></img>
      </div>
      <div className="battle-container">
        <div className="character-battle">
          <h3>{this.props.character.name}</h3>
          <img className="character-img" src={this.props.character.img_url} alt=""></img>
          <h3>Stats:</h3>
          <div className="character-stats" >
              <p>Physical: {this.props.character.physical}</p>
              <p>Magic: {this.props.character.magic} </p>
              <p>Physical Defense: {this.props.character.physical_defense} </p>
              <p>Magic Defense: {this.props.character.magic_defense} </p>
          </div>
        </div>
        <div className="vs-banner">
          <img className="vs" src={vsImage} alt="VS"></img>
          {this.state.win ? (
                <span className="error">You Win!</span>
            ) : (
                ''
            )}
            {this.state.lose ? (
                <span className="error">You Lose!</span>
            ) : (
                ''
            )}
        </div>
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
      <div className="battle-form-container">
        <form className="battle-form" onSubmit={this.handleSubmit}>
          <select className="dropdown" type="dropdown" name= "attack">
          <option>Physical Attack</option>
          <option>Magic Attack</option>
          </select>
          <select className="dropdown" type="dropdown" name= "stance">
          <option value="Normal Stance">Normal Stance</option>
          <option value="Attack Stance">Attack Stance</option>
          <option value="Defense Stance">Defense Stance</option>
          </select>
          <div>
          <button className="attack-btn" type= "submit" >Confirm</button>
          </div>
          </form>
      </div>
    </div>
    )
  }
}

export default Battle;