import React, { Component } from "react";
import CharacterDisplay from "./CharacterDisplay";
import UserDisplay from "./UserDisplay";
import EnemyDisplay from "./EnemyDisplay";

class Main extends Component {

    render() {
        return (
            <div className= "main-page">
                <UserDisplay  />
                <CharacterDisplay  />
                <EnemyDisplay />
            </div>
        )
    }
}

export default Main