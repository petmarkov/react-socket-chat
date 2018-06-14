import React from "react";

import ChatBubble from "./ChatBubble";
import ChatMessageForm from "../containers/ChatMessageForm";

// this component needs to be a class since the div where the messages reside needs to be scrolled
class ChatFrame extends React.Component{
    componentDidUpdate(){
        // scroll message container div to the bottom
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }
    render(){
        return (
            <div className="card h-100">
                <div className="card-header text-center">
                    <h5 className="m-0 font-weight-bold" >{this.props.activeChat}</h5>
                </div>
                <div className="card-body scrollable w-100" ref={(node) => {this.messageContainer = node}} >
                    {
                        this.props.messageList.map((msg, i) =>
                            <ChatBubble {...msg} key={i.toString()} />)
                    }
                </div>
                <div className="card-footer">
                    <ChatMessageForm />
                </div>
            </div>
        )
    }
}

export default ChatFrame;