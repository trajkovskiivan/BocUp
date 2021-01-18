export const renderMessage = (data) => {
  console.log(data);
  let date = `${new Date().getUTCHours()}:${new Date().getUTCMinutes()} h`
  let from = data.sender.OU === this.props.userData.we.Ea ? "me" : "foreign";
  let msg = document.createElement("div");
  msg.classList.add(`message-${from}`);
  msg.innerHTML = `
    <div class="message-sender">
    <img src=${data.sender.PK} alt=${data.sender.qW} />

    </div>
    <div class="message-text">
      <span class="text-paragraph">${data.message}<span/>
      <p class="date-paragraph">${date}</p>
    </div>`;
  document.querySelector('.chat-messages').appendChild(msg)
};

export const createMessage = ({message, sender}) => {
  let date = `${new Date().getUTCHours()}:${new Date().getUTCMinutes()} h`;
  let from = sender.OU === this.props.userData.we.Ea ? "me" : "foreign";
  let msgDiv = document.createElement("div");
  msgDiv.classList.add(`message-${from}`);
  message.innerHTML = `
  <div class="message-sender">
  <img src=${sender.PK} alt=${sender.qW} />

  </div>
  <div class="message-text">
    <span class="text-paragraph">${message}<span/>
    <p class="date-paragraph">${date}</p>
  </div>`;
  return message;
};


