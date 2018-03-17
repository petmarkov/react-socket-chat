const INIT_STATE = {
  registered: false,
  clientID: null,
  chatHash: [],
  active: "",
  filter: "",
  chats: {  }
};

// actions are named in NOUN_VERB format as is suggested by the redux best practices
const reducer = (state = INIT_STATE, action) => {
    switch(action.type){
      case "USER_REGISTER":
        return {
          ...state,
          registered: true,
          clientID: action.clientID
        }
      case "MESSAGE_ADD":
        return {
          ...state,
          // once new message is added to chat, move that chat to the top of the list
          chatHash: [
            action.chatID, 
            ...state.chatHash.slice(0, state.chatHash.indexOf(action.chatID)),
            ...state.chatHash.slice(state.chatHash.indexOf(action.chatID) + 1)
          ],
          chats: {
            ...state.chats,
            [action.chatID]: {
              ...state.chats[action.chatID],
              unread: action.unread,
              // add new message to the message array of the chat object
              messages: [
                ...state.chats[action.chatID].messages,
                action.message
              ]
            }
          }
        };

      case "CHAT_ADD":
        return {
          ...state,
          // add chatID to hash array
          chatHash: [...state.chatHash, action.chatID],
          chats: {
            ...state.chats,
            // create new chat object with chatID as key and a dummy "is here!" message
            [action.chatID]: {
              name: action.nickname,
              unread: 0,
              online: true,
              messages: [
                {
                  timestamp: action.timestamp,
                  clientOrigin: false,
                  message: action.nickname + " is here!"
                }
              ]
            }
          }
        };

      case "CHAT_SWITCH":
        return {
          ...state,
          // change the active chat to the switched one
          active: action.chatID,
          chatHash: [...state.chatHash],
          // once chat is switched set unread to 0 since all messages are read
          chats: {
            ...state.chats,
            [action.chatID]: {
              ...state.chats[action.chatID],
              unread: 0
            }
          }
        };
      case "CHAT_END":
        return {
          ...state,
          chatHash: [...state.chatHash],
          chats: {
            ...state.chats,
            [action.chatID]: {
              ...state.chats[action.chatID],
              // this will disable input for in the ChatMessageForm
              online: false
            }
          }          
        }
      case "CHAT_FILTER":
        return {
          ...state,
          // triggers filtering of chats in the ChatListContainer
          filter: action.search
        }
      default:
        return state;
    }
  }

  export default reducer;