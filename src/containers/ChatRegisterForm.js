import React from "react";
import { connect } from "react-redux";

import { socket } from "../index";

let ChatRegisterForm = ({registered}) => {
    let input;
    return(
        <div className="text-center">
            <form className="form-signin"
                  onSubmit={e => {
                      e.preventDefault();
                      if(input.value.length !== 0){
                          socket.emit("USER_REGISTER", input.value);
                      }
                  }}>
                <h1 className="h3 mb-3 font-weight-normal">Welcome!</h1>
                <input className="form-control" 
                       placeholder="Enter your Nickname..." 
                       autoFocus
                       ref={node => {input = node}}/>
                <button className="btn btn-block mt-3 text-white bg-main" 
                        type="submit">Join Chat</button>
                <p className="mt-5"><a href="http://github.com/petmarkov" target="blank" >github/petmarkov</a></p>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        registered: state.registered
    }
}


ChatRegisterForm = connect(
    mapStateToProps
)(ChatRegisterForm);

export default ChatRegisterForm;