import React from "react";

const ChatListItem = ({chat, onClick, active}) => {
    return (
        <a className={"list-group-item " + (active ? "text-white bg-main " : "inactive")}
           onClick={onClick}>
            <div className="d-flex justify-content-between">
                <h5 className="mb-1">{chat.name}</h5>
                {
                    // if there are no unread messages show last's message timestamp
                    chat.unread === 0 && 
                    <small className={"text-" + (active ? "white" : "muted")}>
                    {chat.messages[chat.messages.length - 1].timestamp}</small>
                }
                {
                    // if there are unread messages show unread count in a badge
                    chat.unread > 0 && !active &&
                    <div className="align-self-center"> 
                        <span className="badge badge-pill bg-main text-white">{chat.unread}</span>
                    </div>
                }
            </div>
            // show the truncated preview of the last message
            <p className="mb-1 text-truncate">{chat.messages[chat.messages.length - 1].message}</p>
        </a>
    );
}

export default ChatListItem;