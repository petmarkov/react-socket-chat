import { connect } from "react-redux";

import App from "../components/App"

const mapStateToProps = (state) =>{
    return {
        registered: state.registered,
        noChats: state.chatHash.length === 0 ? true : false,
        activeSelected: state.active !== "" ? true : false
    }
}

const AppContainer = connect(
    mapStateToProps
)(App);

export default AppContainer;