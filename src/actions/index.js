export const userRegister = (clientID) => ({
    type: "USER_REGISTER",
    clientID: clientID
});

export const newChat = (chatID, nickname) => ({
    type: "CHAT_ADD",
    chatID: chatID,
    nickname: nickname
});

export const newMessage = (chatID, clientOrigin, message) => ({
    type: "MESSAGE_ADD",
    chatID: chatID,
    message: {
        message: message,
        clientOrigin: clientOrigin
    }
});

export const switchChat = (chatID) => ({
    type: "CHAT_SWITCH",
    chatID: chatID
});

export const endChat = (chatID) => ({
    type: "CHAT_END",
    chatID: chatID
});