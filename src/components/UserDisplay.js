import React, { Component } from "react";

class UserDisplay extends Component {
    render() {
        return (
            <div className= "user-display">
                Welcome to Epic Battle {this.props.user.username}!
            </div>
        )
    }
}

export default UserDisplay
