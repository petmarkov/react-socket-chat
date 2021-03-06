import { connect } from "react-redux";

import ChatList from "../components/ChatList";
import { switchChat } from "../actions/index";

const getChats = (chatHash, chats, filter) => {
    let chatList = chatHash.map((id) => { return  {...chats[id], id: id} });
    if (filter){
        chatList = chatList.filter((chat) => { return chat.name.toLowerCase().includes(filter.toLowerCase()) });
    }
    return chatList;
}

const mapStateToProps = (state) => {
    return {
        chatList: getChats(state.chatHash, state.chats, state.filter),
        active: state.active
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChatClick: id => dispatch(switchChat(id))
    }
}

const ChatListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatList);

export default ChatListContainer;
