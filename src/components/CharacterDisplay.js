import React, { Component } from "react";

class CharacterDisplay extends Component {
    render() {
        return (
            <div className= "character-display">
                <div className= "character-card">
                    <h3>{this.props.character.name}</h3>
                    <img className= "character-img" src={this.props.character.img_url} alt=""></img>
                    <h3>Stats:</h3>
                    <div className= "character-stats" >
                        <p>Physical: {this.props.character.physical}</p>
                        <p>Magic: {this.props.character.magic} </p>
                        <p>Physical Defense: {this.props.character.physical_defense} </p>
                        <p>Magic Defense: {this.props.character.magic_defense} </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default CharacterDisplay