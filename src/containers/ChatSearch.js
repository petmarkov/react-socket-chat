import React from "react";
import { connect } from "react-redux";

let ChatSearch = ({filterChats}) => {
    let search;
    return (
        <form className="form-group" onSubmit={e => e.preventDefault()} >
            <input ref={node => {search = node}} onChange={(e) => { e.preventDefault(); filterChats(search.value); } } className="form-control" type="search" placeholder="Search..." />
        </form>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        // typing in search field changes filter
        filterChats: (filter) => dispatch({type: "CHAT_FILTER", search: filter})
    }
}

ChatSearch = connect(
    undefined,
    mapDispatchToProps
)(ChatSearch);


export default ChatSearch;