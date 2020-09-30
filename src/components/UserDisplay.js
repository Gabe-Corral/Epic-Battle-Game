import React, { Component } from "react";

class UserDisplay extends Component {
    render() {
        return (
            <div className= "user-display">
                <h1>Welcome to Epic Battle {this.props.user.username}!</h1>
            </div>
        )
    }
}

export default UserDisplay
