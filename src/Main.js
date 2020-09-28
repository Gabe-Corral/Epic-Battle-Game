import React, { Component } from "react";
import CharacterDisplay from "./CharacterDisplay";
import UserDisplay from "./UserDisplay";
import EnemyDisplay from "./EnemyDisplay";

class Main extends Component {

    constructor() {
        super()
        this.state = {
            user: [],
            character: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    user: result[0],
                    character: result[0].character
                })
            }
        )
    }


    render() {
        return (
            <div className= "main-page">
                <UserDisplay user={this.state.user} />
                <CharacterDisplay character={this.state.character} />
                <EnemyDisplay />
            </div>
        )
    }
}

export default Main