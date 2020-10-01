import React, { Component } from "react";

class EnemyDisplay extends Component {

  handleClick = (enemy) => {
    this.props.setOpponents(enemy)
  }

    render() {
        return (
            <div className="enemy-display" onClick={() => {
              this.handleClick(this.props.enemy)
            }}>
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
        )
    }
}

export default EnemyDisplay
