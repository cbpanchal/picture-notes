import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as action from "../../actions/loginAction";
import { bindActionCreators } from 'redux';

class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout () {
        const { logout } = this.props;
        logout();
    }

    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <button onClick={this.handleLogout}>Log out</button>
            </div>
        );
    }
}

Home.prototypes = {
    logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthUser: state.user.isAuthUser,
});

const mapDispatchToProps = dispatch => 
    bindActionCreators(
        {
            logout: action.logout
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Home);