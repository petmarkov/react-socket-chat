import React from "react";

import ChatListContainer from "../containers/ChatListContainer";
import ChatFrameContainer from "../containers/ChatFrameContainer";
import ChatRegisterForm from "../containers/ChatRegisterForm";

const App = ({registered, noChats, activeSelected}) => {
    return(
        <div className={"border rounded p-1 h-90 w-90 centered " + (registered && noChats ? "mars" : "bg-light")}>
        {
            // if the user/socket is not registered show the register form
            !registered && <ChatRegisterForm />
        }
        {   
            registered && <div className="row w-100 h-100">
            {
                // if there are users online show the list of all users
                !noChats &&
                <div className="col-4 pr-1 pl-0 h-100">
                    <ChatListContainer />
                </div>
            }
            {
                // if no chat is selected/active don't load the message frame
                !noChats && activeSelected &&
                <div className="col-8 pl-0 pr-0">
                    <ChatFrameContainer />
                </div>
            }
            {
                // if nobody is online show a comforting message
                noChats && <h1 className="alone text-center text-white" >You're alone, but you can always&nbsp;
                <a href={window.location.href} target="_blank">talk to yourself</a></h1>
            }
            </div>
        }
            
        </div>
    )
}

export default App;