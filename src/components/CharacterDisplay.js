import React, { Component } from "react";

const url = "http://localhost:3000"

class CharacterDisplay extends Component {

    state = {
        showForm: this.props.showForm,
        showCharacter: this.props.showCharacter,
        points: 25,
        character: this.props.user.character
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

    handleSubmit = (e) => {
      e.preventDefault()
      this.props.createCharacter(e)
      setTimeout(() => {
        this.setCurrentCharacter()
        this.setState({ showCharacter: true })
      }, 1000);
    }

    setCurrentCharacter = () => {
      fetch(`${url}/character`)
      .then(res => res.json())
      .then((res) => {
        res.find(c => {
          if (this.props.user.id === c.user_id) {
            this.setState({ character: c })
          }
        })
      })
    }

    render() {    
        return (
            <div className= "character-display">

            {this.state.showForm ? (
             <div className="character-form-container">
                <form className= "character-form" onSubmit={this.handleSubmit}>
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
                    onKeyDown={(e) => e.preventDefault()}
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


              {this.state.showCharacter ? (
                <div className="character-card">
                    <h3>{this.state.character.name}</h3>
                    <img className="character-img" src={this.state.character.img_url} alt=""></img>
                    <h3>Stats:</h3>
                    <div className="character-stats" >
                        <p>Physical: {this.state.character.physical}</p>
                        <p>Magic: {this.state.character.magic} </p>
                        <p>Physical Defense: {this.state.character.physical_defense} </p>
                        <p>Magic Defense: {this.state.character.magic_defense} </p>
                    </div>
                </div>
              ) : (
                ""
              )}
            </div>
        )
    }
}



export default CharacterDisplay
