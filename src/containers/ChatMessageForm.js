import React from "react";
import { connect } from "react-redux";

import { socket } from "../index";

let ChatMessageForm = ({active, online}) => {
    let input;
    return (
        <form onSubmit={(e) => {
                            e.preventDefault();
                            if(input.value.length !== 0){
                                socket.emit("MESSAGE_ADD", { chatID: active, body: input.value });
                                input.value = "";
                            }
                            }}>
        <div className="input-group">
            <input ref={node => {input = node}} 
                   type="text" 
                   className="form-control" 
                   placeholder="Type your message..."
                   disabled={!online} />
            <div className="input-group-append">
                <button className="btn text-white bg-main" type="submit" disabled={!online} >Send</button>
            </div>
        </div>
        </form>
    )
}


const mapStateToProps = (state) => {
    return {
        active: state.active,
        online: state.chats[state.active].online
    }
}

ChatMessageForm = connect(
    mapStateToProps
)(ChatMessageForm);

export default ChatMessageForm;