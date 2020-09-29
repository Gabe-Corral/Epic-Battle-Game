import React, { Component } from "react";

class CharacterDisplay extends Component {

    state = {
        showForm: true,
        points: 25,
    }



    handleChange = (event) => {
        event.persist();
        let direction = event.target.value > parseInt(event.target.dataset.prevValue) ? 'up' : 'down';
        event.target.dataset.prevValue = event.target.value;
        
        if (direction === 'up') {
            this.setState(previousState => {
                return {
                    points: previousState.points - 1
                }
            })
        } else if (direction === 'down') {
            this.setState(previousState => {
                return {
                    points: previousState.points + 1
                }
            })
        } 
    }





    render() {
        return (
            <div className= "character-display">
             

             {this.state.showForm ? (
                <div className="character-form-container">
                <form className= "character-form" >
                <div>
                    <h1>Character Creation</h1>
                </div>
                <div>
                <input type="text" placeholder="Enter Character Name" name="name"/>
                </div>
                <input type="text" placeholder="Enter Image URL" name="img_url"/>
                <div>
                <div>
                    <h2>Assign Attribute Points</h2>
                    <h3>Points Left: {this.state.points}</h3>
                </div>
                <div>
                <label> Physical:</label>  
                <input onInput={this.handleChange}
                    type="number" 
                    name="physical"
                    step="1"
                    min="0"
                    max="10"
                    placeholder="0"
                    data-prev-value="0"
                />
                </div>
                <div>
                <label> Magic:</label>   
                <input onInput={this.handleChange}
                    type="number" 
                    name="magic"
                    step="1"
                    min="0"
                    max="10"
                    placeholder="0"
                    data-prev-value="0"
                />
                </div>
                <div>
                <label> Physical Defense:</label>   
                <input onInput={this.handleChange}
                    type="number" 
                    name="physical_defense"
                    step="1"
                    min="0"
                    max="10"
                    placeholder="0"
                    data-prev-value="0"
                />
                </div>
                <div>
                <label> Magic Defense:</label>    
                <input onInput={this.handleChange}
                    type="number" 
                    name="magic_defense"
                    step="1"
                    min="0"
                    max="10"
                    placeholder="0"
                    data-prev-value="0"
                />
                </div>
                <button type="submit" >Submit</button>
                </div>
                </form>
                </div>
            ) : (
              ""
            )}
                
                
                
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