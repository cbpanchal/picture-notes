import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Home extends React.PureComponent {
    render() {
        return (
            <div>
                <h1>Home Page</h1>
            </div>
        );
    }
}

export default connect()(Home);