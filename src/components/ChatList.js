import React from 'react';

import ChatListItem from "./ChatListItem";
import ChatSearch from "../containers/ChatSearch";

const ChatList = ({ chatList, active, onChatClick }) => {
    return(
        <div className="list-group h-100">
            <ChatSearch />
            <div className="p-1 rounded h-100 bg-white scrollable">
                    {
                        chatList.map((chat) =>
                        <ChatListItem key={chat.id} 
                                      chat={chat} 
                                      onClick={() => onChatClick(chat.id)}
                                      active={chat.id === active} />)
                    }
                
            </div>
        </div>
    );
}

export default ChatList;