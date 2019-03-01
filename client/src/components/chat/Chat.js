import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import io from "socket.io-client";
const socket =
  io("http://localhost:5000") || io("https://damp-crag-57890.herokuapp.com");

class Chat extends Component {
  state = {
    message: "",
    messages: "",
    onlineUsers: [],
    userTyping: ""
  };
  // Private Route
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    socket.emit("online", {
      user: this.props.auth.user.name,
      userID: this.props.auth.user.id
    });

    socket.on("chat", data => {
      const strHtml = `<p>
          <strong>${data.user}: </strong>
          ${data.message}
        </p>`;
      this.setState({
        messages: this.state.messages.concat(strHtml)
      });
      this.setState({ message: "" });
    });
  }

  onChange = e => {
    socket.emit("typing", {
      user: this.props.auth.user.name
    });
    socket.on("typing", user => {
      this.setState({ userTyping: user.user });
    });
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { message } = this.state;
    if (message !== "") {
      socket.emit("chat", {
        message: message,
        user: this.props.auth.user.name
      });
    }
  };
  render() {
    // console.log(this.state.onlineUsers);

    // data is like this {user: 'Mina', userID: 'ID'}
    socket.on("online", data => {
      console.log(data);
      this.setState({ onlineUsers: [data, ...this.state.onlineUsers] });
    });

    socket.on("disconnectedUser", data => {
      // data is like this .. {user: '', userID: ''}
      this.setState({
        onlineUsers: this.state.onlineUsers.filter(
          user => user.userID != data.userID
        )
      });
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="online-clients ">
              <h3 id="onlineBloggers">Online Bloggers</h3>
              <ul id="online-bloggers">
                {this.state.onlineUsers.length > 0
                  ? this.state.onlineUsers.map((user, index) => (
                      <li key={index}>{user.user}</li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <div id="mario-chat">
              <div id="chat-window">
                <div
                  id="output"
                  dangerouslySetInnerHTML={{
                    __html: this.state.messages
                  }}
                />

                <div id="feedback">
                  {this.state.userTyping !== "" ? (
                    <p>
                      <strong>{this.state.userTyping} </strong>is now typing...
                    </p>
                  ) : null}
                </div>
              </div>
              <form onSubmit={this.onSubmit}>
                <input
                  type="text"
                  id="message"
                  name="message"
                  placeholder="Message"
                  value={this.state.message}
                  onChange={this.onChange}
                />
                <button type="submit" id="send">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  null
)(Chat);
