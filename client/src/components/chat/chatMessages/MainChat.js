import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addMainMessage} from '../../../actions/index';
// import {createMessage} from '../../../helperFunctions/helpers';


class MainChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageInput: "",
      messageReady: "",
      messages: []
    }
  }

  componentDidMount() {
    if (this.props.socket) {
      this.props.socket.on("mainMessage", data => {
        // console.log("From Mount", data);
        this.props.addMainMessage(data);
      })
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.messageReady !== this.state.messageReady) {
      this.props.socket.emit("mainMessage", {sender: this.props.userData, message: this.state.messageReady, room: this.props.num});
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.socket !== this.props.socket) {
      nextProps.socket.on("mainMessage", data => {
        // console.log("From the willRecieveProps  ", data);
        this.props.addMainMessage(data);
      })
    }
  }



  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      messageReady: this.state.messageInput,
      messageInput: ""
    });
  };



  render() {
    // console.log("From MainChat  ", this.state.messages.length)
    // console.log(this.props.userData)
    return (
      <React.Fragment>
        <div className="chat-messages" >
          {this.props.num}
          <h1>This is the main chat</h1>
          {this.props.mainMessages.map(({message, sender}) => {
            let date = `${new Date().getUTCHours()}:${new Date().getUTCMinutes()} h`
            let from = sender.OU === this.props.userData.OU ? "me" : "foreign";
            return (
              <div className={`message-${from}`}>
                <div className="message-sender">
                  <img src={sender.PK} alt={sender.qW} />
                </div>
                <div className="message-text">
                  <span className="text-paragraph">{message}</span>
                  <p class="date-paragraph">{date}</p>
                </div>
              </div>
            )
          })}
        </div >

        <div className="chat-input">
          <form id="form" onSubmit={(e) => this.handleSubmit(e)}>
            <input
              name="messageInput"
              value={this.state.messageInput}
              // value={this.props.num}
              onChange={(e) => this.handleInput(e)}
              id="input"
              autoComplete="off"
            />
            <button className="input-btn">Send</button>
          </form>
        </div>
      </React.Fragment>
    );
  }

}

const mapStateToProps = (state) => {
  console.log(state.mainMessages);
  return {
    mainMessages: state.mainMessages
  }
}

export default connect(mapStateToProps, {addMainMessage})(MainChat);