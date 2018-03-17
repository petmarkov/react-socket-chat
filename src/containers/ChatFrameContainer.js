import { connect } from "react-redux";

import ChatFrame from "../components/ChatFrame";

const mapStateToProps = state => {
    return {
        messageList: state.chats[state.active].messages ? state.chats[state.active].messages : null,
        activeChat: state.chats[state.active].name ? state.chats[state.active].name: null
    }
}

const ChatFrameContainer = connect(
    mapStateToProps
)(ChatFrame);

export default ChatFrameContainer;