import React from "react";

const ChatListItem = ({ chat, onClick, active }) => {
    return (
        <a className={"list-group-item pl-3 " + (active ? "text-white bg-main " : "inactive")}
           onClick={onClick}>
           <div className="row">
           <div className="col-3">
           <img className="avatar rounded-circle" src="https://avatars2.githubusercontent.com/u/26172185?s=400&v=4" alt="bla"/>
           </div>
           <div className="col-9">
           <div className="d-flex justify-content-between">
                <h5 className="mb-2">{chat.name}</h5>
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
            <p className="mb-0 text-truncate">{chat.messages[chat.messages.length - 1].message}</p>
           </div>
           </div>
        </a>
    );
}

export default ChatListItem;