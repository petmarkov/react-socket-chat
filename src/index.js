import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import io from "socket.io-client";

import AppContainer from "./containers/AppContainer";
import reducer from "./reducers/reducer";
import { userRegister, newChat, newMessage, endChat } from "./actions/index";

// export to be exposed to components that register user and send messages
export const socket = io("http://localhost:3001");

const getFormatedCurrentTime = () => {
    let currentTime = new Date();
    // getHours and getMinutes return Number, if it is less than 10 hours or minutes add "0" so it is properly formated, e.g. 09:09
    let formatedTime = String(currentTime.getHours()).length === 1 ? "0" + currentTime.getHours() : String(currentTime.getHours());
    formatedTime += ":";
    formatedTime += String(currentTime.getMinutes()).length === 1 ? "0" + currentTime.getMinutes() : String(currentTime.getMinutes());
    return formatedTime;
}

const chatMiddleware = store => next => action => {
    const state = store.getState();
    
    switch(action.type){
        case "CHAT_ADD":
        // Just in case server responds with existing or client ID - temporary solution
            if(!state.chats[action.chatID] && action.chatID !== state.clientID){
                action.timestamp = getFormatedCurrentTime();
                next(action);
            }
            break;
        case "MESSAGE_ADD":
        // If the chat is not the current chat then increase the number of unread messages
            if(action.chatID === state.active){
                action.unread = 0;
            } else {
                action.unread = state.chats[action.chatID].unread + 1;
            }
        // get the string timestamp
            action.message.timestamp = getFormatedCurrentTime();
            next(action);
            break;
        default:
            next(action);
    }
}

const store = createStore(
    reducer,
    applyMiddleware(chatMiddleware)
);

// Register socket with all events

socket.on("USER_REGISTER", (clientID) => {
    store.dispatch(userRegister(clientID));
});

socket.on("CHAT_ADD", (chat) => {
    store.dispatch(newChat(chat.chatID, chat.nickname));
});

socket.on("MESSAGE_ADD", (msg) => {
    store.dispatch(newMessage(msg.chatID, msg.clientOrigin, msg.body));
});

socket.on("CHAT_END", (chatID) => {
    store.dispatch(endChat(chatID));
});

render(
    <Provider store = {store}>
        <AppContainer />
    </Provider>,
    document.getElementById("chat-app")
)


store.subscribe(() => {
    //console.log(store.getState());
})