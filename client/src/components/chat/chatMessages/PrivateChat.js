import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addPrivateMessage} from '../../../actions';

class PrivateChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageInput: "",
      messageReady: "",
      messages: this.props.thisRoom.messages
    }
  }

  componentDidMount() {
    console.log(this.props)
    // if (this.props.socket) {
    //   this.props.socket.on("privateMessage", data => {
    //     console.log(data);
    //     this.props.addPrivateMessage(data)
    //   })
    // }
  };



  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log('ComponentWIllRecieveProps   ', nextProps);
    // if (nextProps.socket !== this.props.socket) {
    //   nextProps.socket.on("privateMessage", data => {
    //     console.log(data)
    //     this.props.addPrivateMessage(data)
    //   })
    // }
  }




  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let sender = this.props.userData.OU;
    let receiver = this.props.roomData.users.filter(user => user.userData.OU !== this.props.userData.OU)[0].userData.OU;
    let receiverSocket = this.props.roomData.users.filter(user => user.userData.OU !== this.props.userData.OU)[0].socketId;
    console.log(`Sender ${sender}`)
    console.log(`Receiver ${receiver}`)
    this.props.socket.emit("privateMessage", {message: this.state.messageInput, receiver: receiver, sender: sender, room: this.props.roomData.roomId, receiverSocket: receiverSocket});
    this.props.addPrivateMessage({message: this.state.messageInput, receiver: receiver, sender: sender, room: this.props.roomData.roomId})

    this.setState({messageInput: ""});
  };




  render() {
    // console.log("From PrivateChat  ", this.state)
    console.log("From PrivateChat  ", this.props.roomData.messages)
    return (
      <React.Fragment>
        <div className="chat-messages" >
          {/* <h1 onClick={() => this.props.terminateRoom(this.props.num)}>X</h1> */}
          Wellcome to room: {this.props.roomData.roomId}
          <pre>Me: {this.props.userData.Ed}</pre>
          <br />
          <pre>Receiver: {this.props.roomData.users[1].userData.Ed}</pre>
          {/* {this.state.messages.map(message => <p>{message.message}</p>)} */}
          {this.props.thisRoom.messages.map(message => <p>{message.message}</p>)}
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

const mapStateToProps = (state, ownProps) => {
  return {
    thisRoom: state.privateRooms.filter(room => room.roomId === ownProps.roomData.roomId)[0]
  }
}

export default connect(mapStateToProps, {addPrivateMessage})(PrivateChat);