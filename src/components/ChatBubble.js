import React from "react";

const ChatBubble = ({timestamp, clientOrigin, message}) => {
    return (
        <div className={"d-flex " + (clientOrigin ? "justify-content-end" : "justify-content-start" )}>
            <div className={"rounded mb-1 bubble " + (clientOrigin ? "bg-main" : "bg-supporting")}>
                <p className="m-0 pt-2 pr-2 pl-2 text-white">
                {message}</p>
                <small className="text-white d-flex justify-content-end pr-1 pb-1">
                {timestamp}</small>
            </div>
        </div>
    )
}

export default ChatBubble;